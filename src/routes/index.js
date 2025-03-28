import JobSeekerLayout from "../components/Candidate/JobSeekerLayout";
import PrivateRoute from "../components/Candidate/PrivateRoute";
import SlideCandidate from "../components/Candidate/SlideCandidate";
import LayouCandidate from "../layout/layoutCadidate";
import ApplicationJob from "../pages/Candidate/ApplicationJob";
import ChangePassword from "../pages/Candidate/ChangePassword";
import DetailCompany from "../pages/Candidate/DetailCompany";
import DetailJob from "../pages/Candidate/DetailJob";
import ForgetPassword from "../pages/Candidate/ForgetPassword/ForgetPassword";
import OtpPassword from "../pages/Candidate/ForgetPassword/OtpPassword";
import ResetPassword from "../pages/Candidate/ForgetPassword/ResetPassword";
import Home from "../pages/Candidate/Home";
import Login from "../pages/Candidate/Login";
import LogOut from "../pages/Candidate/LogOut";
import MyCandidate from "../pages/Candidate/MyCandidate";
import Register from "../pages/Candidate/Register";
import SaveJobs from "../pages/Candidate/SaveJobs";
import Search from "../pages/Candidate/Search";

export const routes = [
    {
        path: "/",
        element: <LayouCandidate />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/search", element: <Search /> },
            { path: "/search/list", element: <Search /> },
            { path: "/:slugCompany", element: <DetailCompany /> },
            { path: "/tim-viec-lam/:slugJob", element: <DetailJob /> },
            { path: "/nguoi-tim-viec/register", element: <Register /> },
            { path: "/nguoi-tim-viec/login", element: <Login /> },

            // Bọc các trang trong PrivateRoute
            {
                element: <PrivateRoute />,
                children: [
                    { path: "/nguoi-tim-viec/logout", element: <LogOut /> },

                    // Bọc các trang có menu riêng trong JobSeekerLayout
                    {
                        path: "/nguoi-tim-viec",
                        element: <JobSeekerLayout />,
                        children: [
                            { path: "cong-viec-luu", element: <SaveJobs /> },
                            { path: "viec-da-ung-tuyen", element: <ApplicationJob /> },
                            { path: "ho-so-ca-nhan", element: <SlideCandidate /> ,
                                children: [
                                    { path: "xem", element: <MyCandidate /> },
                                    { path: "thay-doi-mat-khau", element: <ChangePassword /> },
                                ] 
                            }

                        ]
                    }
                ]
            },

            { path: "/nguoi-tim-viec/reset/forgotPassword", element: <ForgetPassword /> },
            { path: "/nguoi-tim-viec/reset/otpPassword", element: <OtpPassword /> },
            { path: "/nguoi-tim-viec/reset/resetPassword", element: <ResetPassword /> },
        ]
    }
];
