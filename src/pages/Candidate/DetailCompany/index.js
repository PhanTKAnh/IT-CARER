import { DribbbleOutlined, EnvironmentOutlined, UngroupOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getCompanyDetail } from '../../../sevices/candidate/company.sevices';

function DetailCompany() {
    const { slugCompany } = useParams();
    const [companyDetail, setCompanyDetail] = useState({});

    useEffect(() => {
        const fetchData = async () => {
           const company = await getCompanyDetail(slugCompany);
           setCompanyDetail(company);
        };
        fetchData();
    }, [slugCompany]);
    
    return (
        <div className="detail-company">
            {companyDetail.company && (
                <div className="container" key={companyDetail.company._id}>
                    <div className="detail-company__header">
                        <div className="detail-company__cover">
                            <img src={companyDetail.company.avatar} alt={companyDetail.company.CompanyName} />
                        </div>
                        <div className="detail-company__logo">
                            <img src={companyDetail.company.logo || ''} alt="Company Logo" />
                        </div>
                        <div className="detail-company__info">
                            <h1 className="detail-company__name">{companyDetail.company.CompanyName}</h1>
                            <div className="detail-company__meta">
                                <span><EnvironmentOutlined /> {companyDetail.company.Address}</span>
                                <span><UngroupOutlined /> {companyDetail.company.QuantityPeople} nhân viên</span>
                                <span>{companyDetail.company.Detail}</span>
                            </div>
                        </div>
                    </div>
                    <div className="detail-company__content">
                        <div className="detail-company__left">
                            <h5>Về công ty</h5>
                            <p className="detail-company__description">{companyDetail.company.Description}</p>
                            <div className="detail-company__jobs">
                                <h3>Việc đang tuyển</h3>
                                <div className="jobs-list">
                                    {companyDetail.jobs && companyDetail.jobs.length > 0 ? (
                                        companyDetail.jobs.map(job => (
                                         <NavLink to={`/tim-viec-lam/${job.slug}`}>
                                               <div key={job._id} className="job-card">
                                                <div className="job-card__logo">
                                                    <img src={companyDetail.company.logo || "/default-logo.png"} alt="Company logo" />
                                                </div>
                                                <div className="job-card__details">
                                                    <h4 className="job-card__title">{job.Name}</h4>
                                                    <p className="job-card__company">{job?.company?.CompanyName}</p>
                                                    <div className="job-card__location">
                                                        <span>{job.cities?.map(city => city.CityName).join(", ")}</span>
                                                    </div>
                                                    <div className="job-card__info">
                                                        <span>
                                                            {job.SalaryMin && job.SalaryMax
                                                                ? `${job.SalaryMin} - ${job.SalaryMax} ${job.Currency || "VND"}`
                                                                : "Thoả thuận"}
                                                            {" | "}
                                                            {job.Level}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                         </NavLink>
                                        ))
                                    ) : (
                                        <p>Hiện tại chưa có công việc nào.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="detail-company__right">
                            <p>Website: <DribbbleOutlined /> <a href={companyDetail.company.Website}>{companyDetail.company.Website}</a></p>
                            <p>Thời gian làm việc: {companyDetail.company.WorkingTime}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default DetailCompany;