import { patchfavoriteJobs } from "../sevices/candidate/job.sevices";

export const toggleFavoriteJob = async (jobId, favoriteJobs, setFavoriteJobs, tokenCandidate) => {

    const newFavoriteState = !favoriteJobs 
    const typefavorite = newFavoriteState ? "favorite" : "unfavorite";
    setFavoriteJobs(prev => ({
        ...prev,
        [jobId]: newFavoriteState, 
    }));

    try {
        await patchfavoriteJobs(typefavorite, jobId, tokenCandidate);
    } catch (error) {
        console.error("Lỗi khi cập nhật yêu thích:", error);
        setFavoriteJobs(prev => ({
            ...prev,
            [jobId]: !newFavoriteState, 
        }));
    }
};
export const toggleFavoriteJobId = async (jobId, favoriteJobs, setFavoriteJobs, tokenCandidate, navigate) => {

    const newFavoriteState = !favoriteJobs[jobId] 
    console.log(newFavoriteState)
    const typefavorite = newFavoriteState ? "favorite" : "unfavorite";

    setFavoriteJobs(prev => ({
        ...prev,
        [jobId]: newFavoriteState, 
    }));

    try {
        await patchfavoriteJobs(typefavorite, jobId, tokenCandidate);
    } catch (error) {
        console.error("Lỗi khi cập nhật yêu thích:", error);
        setFavoriteJobs(prev => ({
            ...prev,
            [jobId]: !newFavoriteState, 
        }));
    }
};
export const deletedFavoriteId = async (jobId,tokenCandidate, navigate) => {
    const typefavorite = "unfavorite";

    try {
        await patchfavoriteJobs(typefavorite, jobId, tokenCandidate);
    } catch (error) {
        console.error("Lỗi khi cập nhật yêu thích:", error);
    }
};
