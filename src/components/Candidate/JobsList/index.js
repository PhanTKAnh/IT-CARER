import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { toggleFavoriteJobId } from '../../../helpers/favoriteHelper';
import { getCookie } from '../../../helpers/cookie';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function SearchList(props) {
    const { jobsList,tokenCandidate } = props;
    const [favoriteJobs, setFavoriteJobs] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (jobsList.length > 0) {
            const favoriteStatus = jobsList.reduce((acc, job) => {
                acc[job._id] = job.isFavoriteJob;
                return acc;
            }, {});
            setFavoriteJobs(favoriteStatus);
        }
    }, [jobsList]);
    
    const handleToggleFavorite = (jobId) => {
        if (!tokenCandidate) {
            navigate("/nguoi-tim-viec/login");
            return;
        }

        toggleFavoriteJobId(jobId, favoriteJobs, setFavoriteJobs, tokenCandidate, navigate);
    };

    return (
        <>
            {
    jobsList?.map(data => (
        <div key={data._id} className="search-card">
            <div className="inner-left">
                <div className="inner-image">
                    <img src={data?.company.logo} alt="Company logo" />
                </div>
            </div>

            {/* Chỉ bọc phần nội dung trong NavLink */}
            <NavLink to={`/tim-viec-lam/${data.slug}`} className="inner-right">
                <div className="inner-title">{data.Name}</div>
                <div className="inner-text">{data?.company?.CompanyName}</div>
                <div className="inner-postion">
                    <span>
                        {data.cities?.map(city => city.CityName).join(", ")}
                    </span>
                   
                </div>
                <div className="inner-info">
                    <span>
                        {data.SalaryMin && data.SalaryMax
                            ? `${data.SalaryMin} - ${data.SalaryMax} ${data.Currency || "VND"}`
                            : "Thoả thuận"}
                        {" | "}
                        {data.Level}
                    </span>
                </div>
            </NavLink>
           
          {/* Để nút bấm yêu thích bên ngoài NavLink */}
          <button className="job-card__favorite-btn" onClick={() => handleToggleFavorite(data._id)}>
                {favoriteJobs[data._id] ? <HeartFilled className="job-card__favorite-icon active" /> : <HeartOutlined className="job-card__favorite-icon" />}
            </button>
        </div>
    ))
}


        </>
    )
};
export default SearchList;