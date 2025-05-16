import { DribbbleOutlined, EnvironmentOutlined, UngroupOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
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
                            <img
                                src={companyDetail.company.avatar}
                                alt={companyDetail.company.CompanyName}
                            />
                            <div className="detail-company__logo">
                                <img
                                    src={companyDetail.company.logo || ''}
                                    alt="Company Logo"
                                />
                            </div>
                        </div>

                        <div className="detail-company__info">
                            <h1 className="detail-company__name">
                                {companyDetail.company.CompanyName}
                            </h1>
                            <div className="detail-company__meta">
                                <span>
                                    <EnvironmentOutlined /> {companyDetail.company.Address}
                                </span>
                                <span>
                                    <UngroupOutlined /> {companyDetail.company.QuantityPeople} nhân viên
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="detail-company__content">
                        <div className="detail-company__left">
                            <h3>Về công ty: </h3>
                            <div
                                className="detail-company__description"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        companyDetail.company.Description ||
                                        '<p>Chưa có mô tả công ty.</p>',
                                }}
                            ></div>

                            <div className="detail-company__jobs">
                                <h3>Việc đang tuyển: </h3>
                                <div className="jobs-list">
                                    {companyDetail.jobs && companyDetail.jobs.length > 0 ? (
                                        companyDetail.jobs.map((job) => (
                                            <NavLink to={`/tim-viec-lam/${job.slug}`} key={job._id}>
                                                <div className="job-card">
                                                    <div className="job-card__logo">
                                                        <img
                                                            src={
                                                                companyDetail.company.logo ||
                                                                '/default-logo.png'
                                                            }
                                                            alt="Company logo"
                                                        />
                                                    </div>
                                                    <div className="job-card__details">
                                                        <h4 className="job-card__title">{job.Name}</h4>
                                                        <p className="job-card__company">
                                                            {companyDetail.company.CompanyName}
                                                        </p>
                                                        <div className="job-card__location">
                                                            <span>
                                                                {job.cities
                                                                    ?.map((city) => city.CityName)
                                                                    .join(', ')}
                                                            </span>
                                                        </div>
                                                        <div className="job-card__info">
                                                            <span>
                                                                {job.SalaryMin && job.SalaryMax
                                                                    ? `${job.SalaryMin} - ${job.SalaryMax} ${job.Currency || 'VND'}`
                                                                    : 'Thoả thuận'}
                                                                {' | '}
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
                            <p>
                                Website: <DribbbleOutlined />{' '}
                                <a href={companyDetail.company.Website} target="_blank" rel="noreferrer">
                                    {companyDetail.company.Website}
                                </a>
                            </p>
                            <p>Thời gian làm việc: {companyDetail.company.WorkingTime}</p>
                            <p>
                                <PhoneOutlined />{' '}
                                {companyDetail.company.Phone || 'Chưa có thông tin'}
                            </p>
                            <p>
                                <MailOutlined />{' '}
                                {companyDetail.company.Email || 'Chưa có email liên hệ'}
                            </p>
                            <p>
                                <strong>Người liên hệ: </strong>{' '}
                                {companyDetail.company.ContactPerson || 'Chưa có thông tin người liên hệ'}
                            </p>
                            <h3>Mô tả ngắn về công ty: </h3>
                            <div
                                className="detail-company__detail"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        companyDetail.company.Detail || '<p>Chưa có thông tin chi tiết.</p>',
                                }}
                            ></div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailCompany;
