import { useEffect, useState } from "react";
import { getListJob } from "../../../sevices/candidate/job.sevices";
import JobItem from "../../../components/Candidate/JobItem";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getTotalPages, handleNextPage, handlePrevPage } from "../../../helpers/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getCookie } from "../../../helpers/cookie";
import ButtonPagination from "../../../components/Candidate/button";

function JobList() {
    const [dataJob, setDataJob] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const tokenCandidate = getCookie("tokenCandidate");
    const pageSize = 15;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const jobs = await getListJob(tokenCandidate);
                setDataJob(jobs);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    const totalPages = getTotalPages(dataJob.length, pageSize);
    const displayedJobs = dataJob.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container">
            <h2>Việc làm hấp dẫn</h2>
            <div className="inner-job">
                <ButtonPagination
                    title={<LeftOutlined />}
                    onClick={() => handlePrevPage(page, setPage)}
                    disabled={page === 1}
                />
                
                <div className="job-list">
                    {loading ? (
                        Array.from({ length: pageSize }).map((_, index) => (
                            <div key={index} className="inner-card">
                                <Skeleton height={80} width={80} className="skeleton-avatar" />
                                <div className="skeleton-content">
                                    <Skeleton height={20} width={"80%"} />
                                    <Skeleton height={15} width={"60%"} />
                                    <Skeleton height={15} width={"50%"} />
                                </div>
                            </div>
                        ))
                    ) : displayedJobs.length ? (
                        <JobItem dataJob={displayedJobs} />
                    ) : (
                        <p>Không có dữ liệu</p>
                    )}
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

export default JobList;
