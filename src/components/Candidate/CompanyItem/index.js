function CompanyItem(props) {
    const {dataCompany} = props;
    return (
        <>
        {
            dataCompany.map(item =>(
                <div key={item._id} className="inner-card">
                <div className="inner-image">
                    <img src="https://blob-careerlinkvn.careerlink.vn/company_banners/70a70c3686c448aab0f8315fbdde93a9" />
                </div>
                <div className="inner-logo">
                    <img src="https://static.careerlink.vn/image/cd95139a4118d9309ef97fbe8f98b823" />
                </div>
                <div className="inner-content">
                    <div className="inner-title">
                       {item.CompanyName}
                    </div>
                    <div className="inner-text">
                        Đang tuyển : 
                        {item.jobs.map(job =>(
                            <span> {job.Name}, </span>
                        ))}
                    </div>
                </div>
                <div className="footer-cart">
                    <div className="inner-text">
                    {item.jobs.length} đang tuyển 
                    </div>
                    <div className="inner-position">
                        {item.cities.map(city =>(
                            <span> {city.CityName}, </span>)
                        )}
                    </div>
                </div>
            </div>
            ))
        }
          
            
        </>
    )
}
export default CompanyItem;