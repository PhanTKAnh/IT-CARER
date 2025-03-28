import React, { useEffect, useState } from "react";
import { HeartOutlined, HeartFilled, SendOutlined } from "@ant-design/icons";
import { getFavoriteJobs } from "../../../sevices/favorrite-jobs.sevice";
import { getCookie } from "../../../helpers/cookie";
import { deletedFavoriteId } from "../../../helpers/favoriteHelper";
import { useNavigate } from "react-router-dom";
import { getProfieCandidate } from "../../../sevices/candidate.sevices";
import { getDetailJob } from "../../../sevices/job.sevices";
import ApplyModal from "../../../components/Candidate/ApplyModal";

function SaveJobs() {
    const [favoriteJobs, setFavoriteJobs] = useState([]);  // Sửa `{}` thành `[]`
    const tokenCandidate = getCookie("tokenCandidate");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [candidateInfo, setCandidateInfo] = useState({});
    const [selectedJob, setSelectedJob] = useState({});


    useEffect(() => {
        fetchFavoriteJobs();
    }, [tokenCandidate]);
    
    useEffect(() => {
        if (favoriteJobs.length > 0) {
            fetchApi();
        }
    }, [favoriteJobs]);
    

    const fetchFavoriteJobs = async () => {
        const data = await getFavoriteJobs(tokenCandidate);
        setFavoriteJobs(data);
    };
     const fetchApi = async () => {
                try {
                    if (tokenCandidate) {
                        const userProfile = await getProfieCandidate(tokenCandidate);
                        setCandidateInfo(userProfile);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy chi tiết công việc:", error);
                }
            };

    const handleToggleFavorite = async (jobId) => {
        await deletedFavoriteId(jobId, tokenCandidate, navigate);
        fetchFavoriteJobs();
    };


    return (
        <div className="favorite-job">
          <div className="container">
            <div className="favorite-container">
              <h2>Công việc đã lưu ({favoriteJobs.reduce((acc, fav) => acc + fav.jobs.length, 0)})</h2>
      
              {favoriteJobs.length > 0 ? (
                favoriteJobs.map((fav) =>
                  fav.jobs.map((job) => (
                    <div key={job._id} className="job-card">
                      <button className="favorite-btn" onClick={() => handleToggleFavorite(job._id)}>
                        <HeartFilled className="red-icon" />
                      </button>
      
                      <div className="job-logo">
                        <img alt="Company Logo" loading="lazy" src={job.company.logo || ""} />
                      </div>
      
                      <div className="job-content">
                        <h6 className="job-title">
                          <a href="#">{job.Name}</a>
                        </h6>
                        <a href="#" className="job-company">
                          {job.company.CompanyName}
                        </a>
                        <div className="job-expired-time">
                          <span className="text-success">
                            Hết hạn: <span className="cl-datetime">8 ngày tới</span>
                          </span>
                        </div>
                      </div>
      
                      <div className="job-action">
                        <button className="apply-btn" onClick={() => {
                            setSelectedJob(job);
                            setShowModal(true);
                        }}>
                          <SendOutlined className="icon" />
                          <span>Nộp đơn</span>
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <p>Không có công việc nào được lưu</p>
              )}
      
              {/* Modal được đặt bên ngoài vòng lặp */}
              <ApplyModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                jobDetail={selectedJob} 
                candidateInfo={candidateInfo} 
                tokenCandidate={tokenCandidate} 
              />
            </div>
          </div>
        </div>
      );
      
}

export default SaveJobs;
