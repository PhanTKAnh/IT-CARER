import JobItem from "./JobItem";

function JobList(){
    return(
        <>
        <div className="container">
            <div className="inner-job">
                <div className="inner-text">
                    Việc làm hấp dẫn  
                </div>
                <div className="job-list">
                <JobItem/>
                </div>
            </div>
        </div>
        </>
    );
};
export default JobList;