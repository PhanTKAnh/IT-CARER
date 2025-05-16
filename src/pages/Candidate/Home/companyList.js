import { useEffect, useState } from "react";
import CompanyItem from "../../../components/Candidate/CompanyItem";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getListCompany } from "../../../sevices/candidate/company.sevices";
import ButtonPagination from "../../../components/Candidate/button";

function CompanyList() {
  const [dataCompany, setDataCompany] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); 

  // Tự động thay đổi pageSize dựa vào kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 992) {
        setPageSize(1); // Mobile
      } else if (width < 1350) {
        setPageSize(2); // Tablet
      } else {
        setPageSize(3); // Desktop
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lấy dữ liệu
  useEffect(() => {
    const fetchApi = async () => {
      const companies = await getListCompany();
      setDataCompany(companies);
    };
    fetchApi();
  }, []);

  const totalPages = getTotalPages(dataCompany.length, pageSize);
  const displayed = dataCompany.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container">
      <h2 className="section-heading">Nhà tuyển dụng hàng đầu</h2>
      <div className="inner-company">
        <ButtonPagination
          title={<LeftOutlined />}
          onClick={() => handlePrevPage(page, setPage)}
          disabled={page === 1}
        />
        <div className="list-company">
          <CompanyItem dataCompany={displayed} />
        </div>
        <ButtonPagination
          title={<RightOutlined />}
          onClick={() => handleNextPage(page, totalPages, setPage)}
          disabled={page === totalPages}
        />
      </div>
      <div className="pagination-buttons">
        <span>{page}/{totalPages}</span>
      </div>
    </div>
  );
}

export default CompanyList;
