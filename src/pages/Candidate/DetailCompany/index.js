import { DribbbleOutlined, EnvironmentOutlined, UngroupOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyDetail } from '../../../sevices/company.sevices';
import { getCompanyJobs } from '../../../sevices/job.sevices';
import { getListCities } from '../../../sevices/city.sevices';
import JobsList from '../../../components/Candidate/JobsList';

function DetailCompany() {
    const { slugCompany } = useParams();
    const [companyDetail, setCompanyDetail] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyData = await getCompanyDetail(slugCompany);
                const jobsData = await getCompanyJobs(companyData._id);
                const cities = await getListCities();

                setCompanyDetail(formatData(companyData, jobsData, cities));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [slugCompany]);

    const formatData = (companyData, jobsData, cities) => {
        const dataCity = cities.reduce((acc, city) => ({
            ...acc,
            [city._id]: city.CityName
        }), {});
        return {
            company: companyData,
            jobs: jobsData.map(({ IdCity, ...job }) => ({
                ...job,
                cities: IdCity?.map(cityId => ({
                    id: cityId,
                    name: dataCity[cityId] || "N/A"
                })) || [],
            })),
        };
    };
    console.log(companyDetail)

    return (
        <div className="container">
            <div className='detail-company'>
                {companyDetail.company && (
                    <div key={companyDetail.company._id}>
                        <div className="inner-head">
                            <div className="inner-image">
                                <img src={companyDetail.company.avatar} alt={companyDetail.company.CompanyName} />
                            </div>
                            <div className='inner-logo'>
                                <img src={companyDetail.company.logo} alt="Company Logo" />
                            </div>
                            <div className="inner-text">
                                <div className="inner-title">
                                    {companyDetail.company.CompanyName}
                                </div>
                                <div className="inner-info">
                                    <span><EnvironmentOutlined /> {companyDetail.company.Address}</span>
                                    <span><UngroupOutlined /> {companyDetail.company.QuantityPeople} nhân viên</span>
                                    <span>{companyDetail.company.Detail}</span>
                                </div>
                            </div>
                        </div>
                        <div className='inner-content'>
                            <div className='inner-left'>
                                <h5>Về công ty</h5>
                                <div className='inner-desc'>
                                    {companyDetail.company.Description}
                                </div>
                            </div>
                            <div className='inner-right'>
                                <div className='inner-text'>
                                    Website
                                    <p><DribbbleOutlined /> <a href={companyDetail.company.Website}> {companyDetail.company.Website} </a></p>
                                    <p>Thời gian làm việc: {companyDetail.company.WorkingTime}</p>
                                </div>
                            </div>
                        </div>
                        <div className='inner-list'>
                            <h3>Việc đang tuyển</h3>
                            <JobsList jobsList={companyDetail.jobs} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default DetailCompany;