import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { toggleFavoriteJobId } from "../../../helpers/favoriteHelper";

function JobItem({ dataJob = [] }) {
    const tokenCandidate = getCookie("tokenCandidate");
    const navigate = useNavigate();

    const [favoriteJobs, setFavoriteJobs] = useState({});

    useEffect(() => {
        if (dataJob.length > 0) {
            const favoriteStatus = dataJob.reduce((acc, job) => {
                acc[job._id] = job.isFavoriteJob || false;
                return acc;
            }, {});
            setFavoriteJobs(favoriteStatus);
        }
    }, [dataJob]);


    const handleToggleFavorite = (jobId) => {
        if (!tokenCandidate) {
            navigate("/nguoi-tim-viec/login");
            return;
        }
    
        toggleFavoriteJobId(jobId, favoriteJobs, setFavoriteJobs, tokenCandidate, navigate);
    };
    
    return (
        <>
            {dataJob.length === 0 ? (
                <p>Không có công việc nào hiển thị.</p>
            ) : (
                dataJob.map((item) => (
                    <div key={item._id} className="inner-card">
                        <div className="inner-left">
                            <img src={item.company.logo} alt="Company Logo" />
                        </div>
                        <NavLink to={`/tim-viec-lam/${item.slug}`}>
                            <div className="inner-right">
                                <div className="job-name">
                                    <span>HOT</span>
                                    <h5>{item.Name}</h5>
                                </div>
                                <div className="company-name">
                                    <p>{item.company.CompanyName}</p>
                                </div>
                                <div className="infomaition">
                                    <div className="position">
                                        <p>
                                            {item?.cities?.map((city) => city.CityName).join(", ")}
                                        </p>
                                    </div>
                                    <div className="salary">
                                        <span>
                                            {item?.SalaryMin && item?.SalaryMax
                                                ? `${item?.SalaryMin} - ${item?.SalaryMax} ${item?.Currency || "VND"}`
                                                : "Thoả thuận"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                        <button
                            onClick={() => handleToggleFavorite(item._id)}
                        >
                            {favoriteJobs[item._id]  ? <HeartFilled className="red-icon" /> : <HeartOutlined />}
                        </button>
                    </div>
                ))
            )}
        </>
    );
}

export default JobItem;
