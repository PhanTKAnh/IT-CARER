import { useState, useEffect } from "react";
import TagItem from "../../../components/Candidate/TagItem";
import { getTagList } from "../../../sevices/tag.sevices";
import { getListJob } from "../../../sevices/job.sevices";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ButtonPagination from "../../../components/button";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";

function TagList() {
    const [dataTag, setDataTag] = useState([]);
    const [countJobs, setCountJobs] = useState({});
    const [page, setPage] = useState(1);
    const pageSize = 6; 

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const tags = await getTagList();
                const jobs = await getListJob();

                setDataTag(tags);

                const countJob = {};
                jobs.forEach((job) => {
                    job.IdTags.forEach(tagId => {
                        countJob[tagId] = (countJob[tagId] || 0) + 1;
                    });
                });

                setCountJobs(countJob);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchApi();
    }, []);

      const totalPages = getTotalPages(dataTag.length, pageSize);
      const displayed = dataTag.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div className="container">
            <div className="inner-tag">
                <div className="inner-text">Chọn ngôn ngữ bạn quan tâm</div>

                <div className="tag-list">
                    <div className="pagination-buttons">
                        <ButtonPagination title={<LeftOutlined />} onClick={() => handlePrevPage(page, setPage)} disabled={page === 1} />
                    </div>

                    <TagItem dataTag={displayed} countJobs={countJobs} />

                    <div className="pagination-buttons">
                        <ButtonPagination title={<RightOutlined />}  onClick={() => handleNextPage(page, totalPages, setPage)} disabled={page === totalPages} />
                    </div>
                </div>

                <div className="pagination-buttons">
                    <span>{page} / {totalPages}</span>
                </div>
            </div>
        </div>
    );
}

export default TagList;
