import { NavLink, Outlet } from "react-router-dom"
import Header from "./header"
import "../../asset/css/employer.css";
import "../../asset/css/base.css";
import "../../asset/css/reset.css";
import Footer from "./footer"



function LayouEmployer() {


    return (
        <>
            <Header />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />

        </>
    )
}
export default LayouEmployer 