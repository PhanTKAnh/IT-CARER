import { HeartOutlined } from '@ant-design/icons';
function SearchList(props) {
    const { jobsList } = props;
    return (
        <>
            {
                jobsList.map(data => (
                    <div key={data._id} className="search-card">
                        <div className="inner-left">
                            <div className="inner-image">
                            <img src={data?.company?.avatar || "https://via.placeholder.com/150"} alt="Company Avatar" />
                            </div>
                        </div>
                        <div className="inner-right">
                            <div className="inner-title">{data.Name}</div>
                            <div className="inner-text">{data?.company?.CompanyName}</div>
                            <div className="inner-postion">
                            <span>
                                {data.cities.map(city => (
                                  <>  {city.name} ,</>
                                ))}
                            </span>
                                <span>cap nhap 2 nay truoc</span>
                            </div>
                            <div className="inner-info">
                                <span>{data.Salary} | {data.Level}</span>
                                <span><HeartOutlined /> Lưu </span>
                            </div>
                        </div>
                    </div>

                ))
            }
        </>
    )
};
export default SearchList;