import { useEffect, useState } from "react";
import CompanyItem from "../../../components/Candidate/CompanyItem";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getListCompany } from "../../../sevices/candidate/company.sevices";
import ButtonPagination from "../../../components/Candidate/button";

function CompanyList() {
    const [dataCompany, setDataCompany] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        const fetchApi = async () => {
            const companies = await getListCompany();
            setDataCompany(companies)
        };
        fetchApi();
    }, []);

    const totalPages = getTotalPages(dataCompany.length, pageSize);
    const displayed = dataCompany.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container">
            <h1>Nhà tuyển dụng hàng đầu</h1>
            <div className="inner-company">
                <ButtonPagination title={<LeftOutlined />} onClick={() => handlePrevPage(page, setPage)} disabled={page === 1} />
                <div className="list-company">
                    <CompanyItem dataCompany={displayed} />
                </div>
                <ButtonPagination title={<RightOutlined />} onClick={() => handleNextPage(page, totalPages, setPage)} disabled={page === totalPages} />
            </div>
            <div className="pagination-buttons">
                <span>{page}/{totalPages}</span>
            </div>
        </div>
    );
}

export default CompanyList;
