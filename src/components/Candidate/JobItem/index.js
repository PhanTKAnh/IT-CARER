import { HeartOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
function JobItem(props) {
    const { dataJob } = props
    return (
        <>
            {dataJob.map(item => (
                <NavLink to={`/tim-viec-lam/${item.slug}`}>
                    <div key={item._id} className="inner-card">
                    <div className="inner-left">
                        <img src={item.avatar} />
                    </div>
                    <div className="inner-right">
                        <div className="job-name">
                            <span>HOT</span>
                            <h5>{item.Name}</h5>
                            <span><HeartOutlined /></span>
                        </div>
                        <div className='company-name'>
                            <p>{item.company.CompanyName}</p>
                        </div>
                        <div className='infomaition'>
                            <div className='position'>
                                <p>
                                    {item?.cities?.map(city => city.CityName).join(", ")}
                                </p>


                            </div>
                            <div className='salary'>
                                <p>{item.Salary}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </NavLink>
            ))}
        </>
    )
};
export default JobItem;