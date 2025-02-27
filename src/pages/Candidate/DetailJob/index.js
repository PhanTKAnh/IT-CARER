import { DollarOutlined, EnvironmentOutlined, FilePdfOutlined, HeartOutlined, InboxOutlined, ScheduleOutlined, TableOutlined } from "@ant-design/icons"
function DetailJob() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if(element){
            element.scrollIntoView({behavior:"smooth"});
        }
    }
    return (
        <>
            <div className="container">
                <div className="detail-job">
                    <div className="job-left">
                        <div className="job-image">
                            <img src="https://blob-careerlinkvn.careerlink.vn/company_banners/af0b3285aaf569a5750ea7d3a3a83724.png" />
                        </div>
                        <div className="job-logo">
                            <img src="https://blob-careerlinkvn.careerlink.vn/company_logos/b713b45803ca11ae2fb38cf181f09ed5.png" />
                        </div>
                        <div className="job-text">
                            <div className="job-name">
                                NHÂN VIÊN HỒ SƠ THẦU
                            </div>
                            <div className="company-name">
                                CÔNG TY CỔ PHẦN DƯỢC PHẨM THIẾT BỊ Y TẾ PHÚC AN
                            </div>
                        </div>
                        <div className="info-job">
                            <div className="job-position">
                                <EnvironmentOutlined />
                                Quận 11, Hồ Chí Minh
                            </div>
                            <div className="job-salary">
                                <DollarOutlined />
                                Thương lượng
                            </div>
                            <div className="job-experiece">
                                <FilePdfOutlined />
                                1 - 2 năm kinh nghiệm
                            </div>
                            <div className="job-date">
                                <ScheduleOutlined /> Ngày đăng tuyển 25-02-2025|Hết hạn trong: 13 Ngày tới
                            </div>
                        </div>
                        <div className="info-button">
                            <button>Nộp đơn ngay</button>
                            <button><HeartOutlined /> Lưu</button>
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
                                <p>* Mô tả công việc

                                    - Thực hiện các công việc thiết kế, triển khai kiến trúc các dự án được phân công thiết kế.

                                    - Các công việc liên quan đến thiết kế kiến trúc và triển khai.

                                    - Cập nhật các quy định, quy chuẩn, văn bản trong lĩnh vực xây dựng và kiến trúc.

                                    - Hỗ trợ các cá nhân, bộ phận trong các công việc có liên quan đến kiến trúc, phối hợp với các bộ môn kỹ thuật khác như M&E, kết cấu, nội thất,…liên quan đến công việc mình được giao và đảm nhiệm.

                                    - Quản lý, kiểm soát hồ sơ thiết kế kiến trúc.

                                    - Thực hiện các công việc khác theo sự phân công của Lãnh đạo.

                                    * Quyền lợi:

                                    - Mức lương: Thỏa thuận

                                    - Lương tháng 13

                                    - Phép năm

                                    - Chế độ BHXN theo quy định

                                    * Thời gian làm việc: 7h30 - 16h30 từ thứ 2 đến thứ 7

                                    * Địa điểm làm việc: Ấp Trà Cổ, xã Bình Minh, Huyện Trảng Bom, Đồng Nai</p>
                            </div>
                            <div className="experiece-desc" id="ky-nang">
                                <p>- Tốt nghiệm Cao đẳng / Đại học ngành thiết kế, kiến trúc

                                    - Ưu tiên có kinh nghiệm làm trong ngành xây dựng</p>
                            </div>
                            <div className="info-desc" id="chi-tiet">
                                <div className="info-left">
                                    <div className="type-job">
                                        <p><span><InboxOutlined /></span> <span>Loại công việc</span></p>
                                        <p>Nhân viên toàn thời gian</p>
                                    </div>
                                    <div className="level-job">
                                        <p><span><InboxOutlined /></span> <span>Cấp bậc</span></p>
                                        <p>Kỹ thuật viên / Kỹ sư</p>
                                    </div>
                                    <div className="education-job">
                                        <p><span><InboxOutlined /></span> <span>Học vấn</span></p>
                                        <p>Cao đẳng</p>
                                    </div>
                                </div>
                                <div className="info-right" >
                                    <div className="experiece-job">
                                        <p><span><InboxOutlined /></span> <span>Kinh nghiệm</span></p>
                                        <p>1 - 2 năm kinh nghiệm</p>
                                    </div>
                                    <div className="education-job">
                                        <p><span><TableOutlined /></span> <span>Ngôn ngữ</span></p>
                                        <p>Js</p>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-company" id="lien-he">
                                    <h1>Thông tin liên hệ </h1>
                                    <div className="inner-contact">
                                        <p>Tên liên hệ: Ms. Thúy Anh</p>
                                        <p>0937683002</p>
                                        <p>Đường ĐT 767, Thôn Tây Lạc, Ấp Bùi Chu, Xã Bắc Sơn , Huyện Trảng Bom , Đồng Nai , Viet Nam</p>
                                        <p>- Các ứng viên quan tâm vui lòng gửi hồ sơ trực tuyến qua ItCareer, gửi kèm file hoặc trực tiếp đến tại công ty</p>
                                    </div>
                                    <p>Nhận hồ sơ bằng ngôn ngữ: Tiếng Việt</p>
                                </div>
                                <div className="about " id="ve-cong-ty">
                                    <h1>Về công ty</h1>
                                    <div className="company-name">
                                        HỆ THỐNG TRUNG TÂM TIẾNG ANH MAYSCHOOL
                                    </div>
                                    <p> <span>http://mayschool.edu.vn/</span> <span> 100 - 499 nhân viên </span> <span> Liên hệ: Ms. May </span></p>
                                </div>
                        </div>
                    </div>
                    <div className="job-right">
                       
                    </div>
                </div>
            </div>
        </>
    )
}
export default DetailJob;