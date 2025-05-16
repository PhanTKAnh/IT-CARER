import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { toggleFavoriteJobId } from '../../../helpers/favoriteHelper';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SimilarJobsList(props) {
    const { jobsList, tokenCandidate } = props;
    const [favoriteJobs, setFavoriteJobs] = useState({});
    const navigate = useNavigate();

    // Handle favorite status when jobs list changes
    useEffect(() => {
        if (jobsList.length > 0) {
            const favoriteStatus = jobsList.reduce((acc, job) => {
                acc[job._id] = job.isFavoriteJob;
                return acc;
            }, {});
            setFavoriteJobs(favoriteStatus);
        }
    }, [jobsList]);

    // Handle toggle favorite job functionality
    const handleToggleFavorite = (jobId) => {
        if (!tokenCandidate) {
            navigate("/nguoi-tim-viec/login");
            return;
        }
        toggleFavoriteJobId(jobId, favoriteJobs, setFavoriteJobs, tokenCandidate, navigate);
    };

    return (
        <>
            {jobsList?.map((job) => (
                <div key={job._id} className="job-card-container">
                    <div className="job-card__image-container">
                        <div className="job-card__image">
                            <img src={job?.company.logo} alt="Company logo" />
                        </div>
                    </div> 
                    <NavLink to={`/tim-viec-lam/${job.slug}`} className="job-card__info-container">
                        <div className="job-card__title">{job.Name}</div>
                        <div className="job-card__company-name">{job?.company?.CompanyName}</div>
                        <div className="job-card__location">
                            <span>{job.cities?.map((city) => city.CityName).join(", ")}</span>
                        </div>
                        <div className="job-card__salary-level">
                            <span>
                                {job.SalaryMin && job.SalaryMax
                                    ? `${job.SalaryMin} - ${job.SalaryMax} ${job.Currency || "VND"}`
                                    : "Thoả thuận"}{" "}
                                | {job.Level}
                            </span>
                        </div>
                    </NavLink>
                    <button className="job-card__favorite-btn" onClick={() => handleToggleFavorite(job._id)}>
                        {favoriteJobs[job._id] ? (
                            <HeartFilled className="job-card__favorite-icon active" />
                        ) : (
                            <HeartOutlined className="job-card__favorite-icon" />
                        )}
                    </button>
                </div>
            ))}
        </>
    );
}

export default SimilarJobsList;
