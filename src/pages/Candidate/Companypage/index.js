import { useEffect, useState } from "react";
import { getListCompany } from "../../../sevices/candidate/company.sevices";
import CompanyItem from "../../../components/Candidate/CompanyItem";

function CompanyPage(){
    const [dataCompany, setDataCompany] = useState([]);

   
       useEffect(() => {
           const fetchApi = async () => {
               const companies = await getListCompany();
               setDataCompany(companies)
           };
           fetchApi();
       }, []);
   

       return (
           <div className="container">
               <div className="container-company">
               <h2 className="section-heading ">Nhà tuyển dụng hàng đầu</h2>
               <div className="inner-company">
               
                   <div className="list-company">

                       <CompanyItem dataCompany={dataCompany} />
                   </div>
               </div>
               </div>
        
           </div>
       );
}
export default CompanyPage;