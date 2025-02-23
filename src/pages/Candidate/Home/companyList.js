import { useEffect, useState } from "react";
import CompanyItem from "../../../components/Candidate/CompanyItem";
import ButtonPagination from "../../../components/button";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getListCities } from "../../../sevices/city.sevices";
import { getListJob } from "../../../sevices/job.sevices";
import { getListCompany } from "../../../sevices/company.sevices";

function CompanyList() {
    const [dataCompany, setDataCompany] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        const fetchApi = async () => {
            const [companies, jobs, cities] = await Promise.all([
                getListCompany(),
                getListJob(),
                getListCities()
            ]);

            setDataCompany(companies.map(company => ({
                ...company,
                jobs: jobs.filter(job => job.IdCompany === company._id),
                cities: cities.filter(city =>
                    [...new Set(jobs.filter(job => job.IdCompany === company._id).flatMap(job => job.IdCity))].includes(city._id)
                )
            })));
        };
        fetchApi();
    }, []);

    const totalPages = getTotalPages(dataCompany.length, pageSize);
    const displayed = dataCompany.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container">
            <div className="inner-company">
                <div className="inner-text">Nhà tuyển dụng hàng đầu</div>
                <div className="list-company">
                    <ButtonPagination title={<LeftOutlined />} onClick={() => handlePrevPage(page, setPage)} disabled={page === 1} />
                    <CompanyItem dataCompany={displayed} />
                    <ButtonPagination title={<RightOutlined />} onClick={() => handleNextPage(page, totalPages, setPage)} disabled={page === totalPages} />
                </div>
            </div>
            <div className="pagination-buttons">
                <span>{page}/{totalPages}</span>
            </div>
        </div>
    );
}

export default CompanyList;
