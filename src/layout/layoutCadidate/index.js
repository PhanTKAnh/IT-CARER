import { NavLink, Outlet } from "react-router-dom"
import Header from "./header"
import Footer from "./footer"
import "../../asset/css/candidate.css";



function LayouCandidate() {

    return (
        <>
            <Header/>
            <div className="main-content">
            <Outlet />
            </div>
           <Footer/>
        </>
    )
}
export default LayouCandidate