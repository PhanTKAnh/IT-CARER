import { useEffect, useState } from "react";
import CompanyItem from "../../../components/Candidate/CompanyItem";
import { getListCompany } from "../../../sevices/company.sevices";
import { getListJob } from "../../../sevices/job.sevices";
import { getListCities } from "../../../sevices/city.sevices";
import ButtonPagination from "../../../components/button";
import {  getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


function CompanyList() {
    const [dataCompany,setDataCompany] = useState([]);
    const [page,setPage] = useState(1);
    const pageSize = 3;
    useEffect(()=>{
        const fetchApi=async () =>{
            const companies = await getListCompany();
            const jobs = await getListJob();
            const cities = await getListCities();

            const companiesWithJobs = companies.map(company =>{
                //Lọc ra danh sách công việc công ty
              const companyJobs = jobs.filter(job => job.IdCompany == company._id);
            //   Lấy danh sách 'IdCity' từ các job của công ty, Loại bỏ trùng lặp 
            const cityIds = [...new Set(companyJobs.flatMap(job => job.IdCity))];

            // Lấy thông tin thành phố từ danh sách "cities"
            const companyCities = cities.filter(city => cityIds.includes(city._id));

            return {
                ...company,
                jobs: companyJobs,
                cities: companyCities 
            };
            });
            setDataCompany(companiesWithJobs);

        }
        fetchApi();
    },[]);

    const totalPages = getTotalPages(dataCompany.length, pageSize);
    const displayed = dataCompany.slice((page - 1) * pageSize, page * pageSize);
    return (
        <>
            <div className="container">
            <div className="inner-company">
            <div className="inner-text">Nhà tuyển dụng hàng đầu </div>
                <div className="list-company">
                    <ButtonPagination title={<LeftOutlined />}  onClick={() => handlePrevPage(page, setPage)} disabled={page === 1} />
                    <CompanyItem dataCompany={displayed} />
                    <ButtonPagination title={<RightOutlined />}  onClick={() => handleNextPage(page, totalPages, setPage)} disabled={page === totalPages}  />
                </div>
            </div>
            <div className="pagination-buttons">
            <span>{page}/{totalPages}</span>
                </div>
            </div>
        </>
    )
};
export default CompanyList;