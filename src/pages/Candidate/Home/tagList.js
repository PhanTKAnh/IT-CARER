import { useState, useEffect } from "react";
import TagItem from "../../../components/Candidate/TagItem";
import { getTagList } from "../../../sevices/candidate/tag.sevices";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ButtonPagination from "../../../components/Candidate/button";

function TagList() {
    const [dataTag, setDataTag] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(6); 

    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          let newPageSize;
      
          if (width < 767) {
            newPageSize = 1;
          } else if (width < 999) {
            newPageSize = 3;
          } else if (width < 1350) {
            newPageSize = 4;
          } else {
            newPageSize = 6;
          }
      
          setPageSize((prev) => {
            return prev !== newPageSize ? newPageSize : prev;
          });
        };
      
        handleResize(); // Gọi ngay khi load
      
        window.addEventListener("resize", handleResize);
      
        return () => window.removeEventListener("resize", handleResize);
      }, []);
      

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const tags = await getTagList();
                setDataTag(tags);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, []);

    const totalPages = getTotalPages(dataTag.length, pageSize);
    const displayed = dataTag.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container">
            <h2 className="section-heading">Chọn ngôn ngữ bạn quan tâm</h2>
            <div className="inner-tag">
                <ButtonPagination title={<LeftOutlined />} onClick={() => handlePrevPage(page, setPage)} disabled={page === 1} />
                <div className="tag-list">
                    {loading ? (
                        Array.from({ length: pageSize }).map((_, index) => (
                            <div key={index} className="inner-card">
                                <div className="inner-image">
                                    <Skeleton width={50} height={50} circle={true} />
                                </div>
                                <div className="inner-content">
                                    <Skeleton width={`80%`} height={20} style={{ marginBottom: 10 }} />
                                    <Skeleton width={`60%`} height={15} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <TagItem dataTag={displayed} />
                    )}

                </div>
                <ButtonPagination title={<RightOutlined />} onClick={() => handleNextPage(page, totalPages, setPage)} disabled={page === totalPages} />
            </div>
            <div className="pagination-buttons">
                <span>{page} / {totalPages}</span>
            </div>
        </div>
    );
}

export default TagList;
