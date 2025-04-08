import {
    DollarOutlined, EnvironmentOutlined, FilePdfOutlined,
    HeartOutlined, InboxOutlined, ScheduleOutlined, TableOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getDetailJob, getSimilarJob } from "../../../sevices/candidate/job.sevices";
import { useNavigate, useParams } from "react-router-dom";
import SearchList from "../../../components/Candidate/JobsList";
import { getCookie } from "../../../helpers/cookie";
import { toggleFavoriteJob } from "../../../helpers/favoriteHelper";
import ApplyModal from "../../../components/Candidate/ApplyModal";
import { getProfieCandidate } from "../../../sevices/candidate/candidate.sevices";

function DetailJob() {
    const { slugJob } = useParams();
    const tokenCandidate = getCookie("tokenCandidate");
    const navigate = useNavigate();

    const [dataDetailJob, setDataDetailJob] = useState({});
    const [dataSimilar, setDataSimilar] = useState([]);
    const [favoriteJobs, setFavoriteJobs] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [candidateInfo, setCandidateInfo] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getDetailJob(slugJob, tokenCandidate);
                setDataDetailJob(response);
                setFavoriteJobs(response.isFavoriteJob);
                const similarJob = await getSimilarJob(slugJob);
                setDataSimilar(similarJob);
                if (tokenCandidate) {
                    const userProfile = await getProfieCandidate(tokenCandidate);
                    setCandidateInfo(userProfile);
                }
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết công việc:", error);
            }
        };
        fetchApi();
    }, [slugJob]);

    const handleToggleFavorite = () => {
        toggleFavoriteJob(dataDetailJob._id, favoriteJobs, setFavoriteJobs, tokenCandidate, navigate);
    };
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
    return (
        <div className="container">
            <div className="detail-job">
                <div className="job-left">
                    <div className="job-image">
                        <img src={dataDetailJob?.company?.avatar} alt={dataDetailJob?.company?.CompanyName} />
                    </div>
                    <div className="job-logo">
                        <img src={dataDetailJob?.company?.logo} alt={dataDetailJob?.company?.CompanyName} />
                    </div>
                    <div className="job-text">
                        <div className="job-name">{dataDetailJob.Name}</div>
                        <div className="company-name">{dataDetailJob?.company?.CompanyName}</div>
                    </div>
                    <div className="info-job">
                        <div className="job-position">
                            <EnvironmentOutlined />
                            {dataDetailJob?.cities?.map(city => city.CityName).join(", ")}
                        </div>
                        <div className="job-salary">
                            <DollarOutlined />
                            <span>
                                {dataDetailJob.SalaryMin && dataDetailJob.SalaryMax
                                    ? `${dataDetailJob.SalaryMin} - ${dataDetailJob.SalaryMax} ${dataDetailJob.Currency || "VND"}`
                                    : "Thoả thuận"}
                            </span>
                        </div>
                        <div className="job-experience">
                            <FilePdfOutlined />
                            {dataDetailJob.Experience
                                ? `${Math.floor(dataDetailJob.Experience / 12)} năm ${dataDetailJob.Experience % 12 ? dataDetailJob.Experience % 12 + " tháng" : ""}`
                                : "Không yêu cầu kinh nghiệm"}
                        </div>
                        <div className="job-date">
                            <ScheduleOutlined /> Ngày đăng tuyển 25-02-2025 | Hết hạn trong: 13 Ngày tới
                        </div>
                    </div>
                    <div className="info-button">
                        <button onClick={() => setShowModal(true)}>Nộp đơn ngay</button>
                        <ApplyModal show={showModal} handleClose={() => setShowModal(false)} jobDetail={dataDetailJob} candidateInfo={candidateInfo} tokenCandidate={tokenCandidate}  />
                        <button className={favoriteJobs ? "active" : ""} onClick={handleToggleFavorite}>
                            <HeartOutlined /> {favoriteJobs ? "Đã lưu" : "Lưu"}
                        </button>
                    </div>
                    <div className="job-content">
                        <ul>
                            <li onClick={() => scrollToSection("mo-ta")}>Mô tả</li>
                            <li onClick={() => scrollToSection("ky-nang")}>Kỹ năng yêu cầu</li>
                            <li onClick={() => scrollToSection("chi-tiet")}>Chi tiết công việc</li>
                            <li onClick={() => scrollToSection("lien-he")}>Liên hệ</li>
                            <li onClick={() => scrollToSection("ve-cong-ty")}>Về công ty</li>
                        </ul>
                        <div className="job-desc" id="mo-ta">
                            <h1>Mô tả công việc</h1>
                            <p>{dataDetailJob?.Description}</p>
                        </div>
                        <div className="experiece-desc" id="ky-nang">
                            <p>- Tốt nghiệm Cao đẳng / Đại học ngành thiết kế, kiến trúc

                                - Ưu tiên có kinh nghiệm làm trong ngành xây dựng</p>
                        </div>
                        <div className="info-desc" id="chi-tiet">
                            <div className="info-left">
                                <div className="type-job">
                                    <p><span><InboxOutlined /></span> <span>Loại công việc</span></p>
                                    <p>{dataDetailJob?.WorkTime}</p>
                                </div>
                                <div className="level-job">
                                    <p><span><InboxOutlined /></span> <span>Cấp bậc</span></p>
                                    <p>{dataDetailJob?.Level}</p>
                                </div>
                                <div className="education-job">
                                    <p><span><InboxOutlined /></span> <span>Học vấn</span></p>
                                    <p>{dataDetailJob?.Education}</p>
                                </div>
                            </div>
                            <div className="info-right" >
                                <div className="experiece-job">
                                    <p><span><InboxOutlined /></span> <span>Kinh nghiệm</span></p>
                                    <p>
                                        {dataDetailJob.Experience
                                            ? `${Math.floor(dataDetailJob.Experience / 12)} năm ${dataDetailJob.Experience % 12 ? dataDetailJob.Experience % 12 + " tháng" : ""
                                            }`
                                            : "Không yêu cầu kinh nghiệm"}
                                    </p>

                                </div>
                                <div className="education-job">
                                    <p><span><TableOutlined /></span> <span>Ngôn ngữ</span></p>
                                    <p>{dataDetailJob?.tags?.map(tag => tag.TagsName).join(", ")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-company" id="lien-he">
                            <h1>Thông tin liên hệ </h1>
                            <div className="inner-contact">
                                <p>Tên liên hệ: Ms. Thúy Anh</p>
                                <p>0937683002</p>
                                <p>{dataDetailJob?.company?.Address}</p>
                                <p>- Các ứng viên quan tâm vui lòng gửi hồ sơ trực tuyến qua ItCareer, gửi kèm file hoặc trực tiếp đến tại công ty</p>
                            </div>
                            <p>Nhận hồ sơ bằng ngôn ngữ: Tiếng Việt</p>
                        </div>
                        <div className="about " id="ve-cong-ty">
                            <h1>Về công ty</h1>
                            <div className="company-name">
                                {dataDetailJob?.company?.CompanyName}
                            </div>
                            <p> <a href={dataDetailJob?.company?.Website} target="_blank" rel="noopener noreferrer"> {dataDetailJob?.company?.Website}</a> <span> {dataDetailJob?.company?.QuantityPeople} nhân viên </span> <span> Liên hệ: Ms. May </span></p>
                        </div>
                    </div>
                </div>
                <div className="job-right">
                    <h3>Việc tương tự</h3>
                    <div className="search-left">
                        <SearchList jobsList={dataSimilar} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailJob;
