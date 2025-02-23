import { useEffect, useState } from "react";
import { getListJob } from "../../../sevices/job.sevices";
import { getListCities } from "../../../sevices/city.sevices";
import { getListCompany } from "../../../sevices/company.sevices";
import JobItem from "../../../components/Candidate/JobItem";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import ButtonPagination from "../../../components/button";

function JobList() {
    const [dataJob, setDataJob] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 15; // 5 hàng x 3 cột = 15 job mỗi trang

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobs, cities, companies] = await Promise.all([
                    getListJob(),
                    getListCities(),
                    getListCompany(),
                ]);
                setDataJob(formatData(jobs, cities, companies));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    const formatData = (jobs, cities, companies) => {
        const dataCity = cities.reduce((acc, city) => ({ ...acc, [city._id]: city.CityName }), {});
        const dataCompany = companies.reduce((acc, company) => ({ ...acc, [company._id]: company.CompanyName }), {});

        return jobs.map(({ IdCompany, IdCity, ...job }) => ({
            ...job,
            company: { id: IdCompany, name: dataCompany[IdCompany] || "N/A" },
            cities: IdCity?.map(cityId => ({ id: cityId, name: dataCity[cityId] || "N/A" })) || [],
        }));
    };

    const totalPages = getTotalPages(dataJob.length, pageSize);
    const displayedJobs = dataJob.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container">
            <div className="inner-job">
                <ButtonPagination title={<LeftOutlined />} onClick={() => handlePrevPage(page, setPage)} disabled={page === 1} />
                <div className="job-list">{displayedJobs.length ? <JobItem dataJob={displayedJobs} /> : <p>Không có dữ liệu</p>}</div>
                <ButtonPagination title={<RightOutlined />} onClick={() => handleNextPage(page, totalPages, setPage)} disabled={page === totalPages} />
            </div>
            <div className="pagination-buttons">
                <span>{page}/{totalPages}</span>
            </div>
        </div>
    );
}

export default JobList;
