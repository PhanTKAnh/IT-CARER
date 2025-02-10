import JobList from "../../../components/Candidate/JobList";
import SearchInput from "../../../components/Candidate/SearcchInput";
import Slide from "../../../components/Candidate/Slide";

function Home(){
    return(
        <>
        <div className="search-section">
        <SearchInput/>
        <Slide/>
        <JobList/>
        </div>
        </>
    )
};
export default Home;