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
               <h1>Nhà tuyển dụng hàng đầu</h1>
               <div className="inner-company">
                   <div className="list-company">
                       <CompanyItem dataCompany={dataCompany} />
                   </div>
               </div>
        
           </div>
       );
}
export default CompanyPage;