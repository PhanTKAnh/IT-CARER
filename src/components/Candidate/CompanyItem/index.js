import { NavLink } from "react-router-dom";
import{EnvironmentOutlined } from "@ant-design/icons"
function CompanyItem(props) {
    const { dataCompany } = props;
    return (
        <>
            {
                dataCompany?.map(item => (
                    <div key={item._id} className="inner-card">
                        <NavLink to={`/${item.slug}`}>
                            <div className="inner-image">
                                <img src={item.avatar} />
                            </div>
                            <div className="inner-logo">
                                <img src={item.logo} />
                            </div>
                        </NavLink>
                        <div className="inner-content">
                            <NavLink to={`/${item.slug}`}>
                                <div className="inner-title">
                                    {item.CompanyName}
                                </div>
                            </NavLink>
                            <div className="inner-text">
                                Đang tuyển :
                                {item.jobs?.map(job =>  job.Name).join(", ")}
                            </div>
                        </div>
                        <div className="footer-cart">
                            <div className="inner-text">
                                {item.jobCount} đang tuyển
                            </div>
                            <div className="inner-position">
                            <EnvironmentOutlined />
                            {item.jobs?.map(job =>  job.cities?.map(city => city.CityName)).join(", ")}
                            </div>
                        </div>
                    </div>
                ))
            }


        </>
    )
}
export default CompanyItem;