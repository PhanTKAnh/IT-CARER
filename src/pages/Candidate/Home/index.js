import FormSearch from "../../../components/Candidate/FormSearch";
import CompanyList from "./companyList";
import JobList from "./jobList";
import Slide from "./slide";
import TagList from "./tagList";

function Home(){
    return(
        <>
        <div className="search-section">
        <FormSearch/>
        <Slide/>
        <JobList/>
        <TagList/>
        <CompanyList/>
        </div>
        </>
    )
};
export default Home;