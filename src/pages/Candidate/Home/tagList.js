import { useState, useEffect } from "react";
import TagItem from "../../../components/Candidate/TagItem";
import { getTagList } from "../../../sevices/tag.sevices";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ButtonPagination from "../../../components/button";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TagList() {
    const [dataTag, setDataTag] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const pageSize = 6;

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
            <h2>Chọn ngôn ngữ bạn quan tâm</h2>
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
