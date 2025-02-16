import { useEffect, useState } from "react";
import { getListJob } from "../../../sevices/job.sevices";
import { getListCities } from "../../../sevices/city.sevices";
import { getListCompany } from "../../../sevices/company.sevices";
import JobItem from "../../../components/Candidate/JobItem";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ButtonPagination from "../../../components/button";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";


function JobList() {
    const [dataJob, setDataJob] = useState([]);
    const [dataCity, setDataCity] = useState({});
    const [dataCompany, setDataCompany] = useState({});
    const [page, setPage] = useState(1);
    const pageSize = 3;
    useEffect(() => {
        const fetchApi = async () => {
            const jobs = await getListJob();
            const cities = await getListCities();
            const companies = await getListCompany();

            const dataCity = cities.reduce((acc, city) => {
                acc[city._id] = city.CityName;
                return acc;
            }, {});
            

            const dataCompany = companies.reduce((acc, company) => {
                acc[company._id] = company.CompanyName;
                return acc;
            }, {});

            setDataCity(dataCity);
            setDataCompany(dataCompany);
            // Cập nhật danh sách công việc với tên công ty & thành phố
            const updatedJobs = jobs.map(({ IdCompany, IdCity, ...job }) => ({
                ...job,
                company: {
                    id: IdCompany,
                    name: dataCompany[IdCompany]
                },
                cities: IdCity?.map(cityId => ({
                    id: cityId,
                    name: dataCity[cityId]
                }))
            }));

            setDataJob(updatedJobs);
        };
        fetchApi();
    }, []);
    const totalPages = getTotalPages(dataJob.length, pageSize);
    const displayedJobs = dataJob.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <div className="container">
                <div className="inner-text">
                    Việc làm hấp dẫn
                </div>
                <div className="inner-job">
                <ButtonPagination title={<LeftOutlined />}  onClick={() => handlePrevPage(page, setPage)} disabled={page === 1} />
                    <div className="job-list">
                        <JobItem dataJob={displayedJobs} />
                    </div>
                    <ButtonPagination title={<RightOutlined />}  onClick={() => handleNextPage(page, totalPages, setPage)}  disabled={page === totalPages}  />

                </div>
                <div className="pagination-buttons">
                <span>{page}/{totalPages}</span>
                </div>
            </div>
        </>
    );
};
export default JobList;