import PrivateRouteAdmin from "../components/Admin/PrivateRoute";
import JobSeekerLayout from "../components/Candidate/JobSeekerLayout";
import PrivateRoute from "../components/Candidate/PrivateRoute";
import SlideCandidate from "../components/Candidate/SlideCandidate";
import PrivateEmployerRoute from "../components/Employer/PrivateEmployerRoute";
import LayoutAdmin from "../layout/layoutAdmin";
import LayouCandidate from "../layout/layoutCadidate";
import EmployerAuthLayout from "../layout/layoutEmployer";
import ListAccount from "../pages/Admin/Account";
import CreateAccount from "../pages/Admin/Account/create";
import EditAccount from "../pages/Admin/Account/edit";
import AdminCompanyDetail from "../pages/Admin/AdminCompanyDetail";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import GeneralSettings from "../pages/Admin/GeneralSettings";
import LoginAdmin from "../pages/Admin/LoginAdmin";
import LogoutAdmin from "../pages/Admin/LogoutAdmin";
import ManagerAdmin from "../pages/Admin/ManagerAdmin";
import ManagerCandidates from "../pages/Admin/ManagerCandidate";
import ManagerCity from "../pages/Admin/ManagerCity";
import ManagerTag from "../pages/Admin/MangerTag";
import TagCreate from "../pages/Admin/MangerTag/create";
import TagEdit from "../pages/Admin/MangerTag/edit";
import ListPermission from "../pages/Admin/Roles";
import CreatePermission from "../pages/Admin/Roles/create";
import EditPermission from "../pages/Admin/Roles/edit";
import AssignPermission from "../pages/Admin/Roles/permission";
import ApplicationJob from "../pages/Candidate/ApplicationJob";
import ChangePassword from "../pages/Candidate/ChangePassword";
import CompanyPage from "../pages/Candidate/Companypage";
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
import Dashboard from "../pages/Employers/Dashboard";
import ForgetAminPassword from "../pages/Employers/ForgetPassword/ForgetAminPassword";
import OtpAdminPassword from "../pages/Employers/ForgetPassword/OtpAdminPassword";
import ResetAdminPassword from "../pages/Employers/ForgetPassword/ResetPassword";
import InfoCompany from "../pages/Employers/InfoCompany";
import EditCompany from "../pages/Employers/InfoCompany/editCompany";
import LogEmployerOut from "../pages/Employers/LogEmployerOut";
import LoginEmployer from "../pages/Employers/LoginEmployers";
import ManagerAppointment from "../pages/Employers/ManagerApointment";
import ApplicationList from "../pages/Employers/ManagerApplication";
import ApplicationDetails from "../pages/Employers/ManagerApplication/applicationDetails";
import ManagerJob from "../pages/Employers/ManagerJob";
import CreateJob from "../pages/Employers/ManagerJob/CreateJob";
import EditJob from "../pages/Employers/ManagerJob/EditJob";
import JobDetailPage from "../pages/Employers/ManagerJob/JobDetail";
import ManagePotentialCandidates from "../pages/Employers/ManagerPotentialCandidate";
import EmployerRegistration from "../pages/Employers/RegisterEmployer";
import SettingAcountCompany from "../pages/Employers/SettingAccountCompany";

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
            { path: "/nha-tuyen-dung-hang-dau", element: <CompanyPage /> },

            {
                element: <PrivateRoute />,
                children: [
                    { path: "/nguoi-tim-viec/logout", element: <LogOut /> },
                    {
                        path: "/nguoi-tim-viec",
                        element: <JobSeekerLayout />,
                        children: [
                            { path: "cong-viec-luu", element: <SaveJobs /> },
                            { path: "viec-da-ung-tuyen", element: <ApplicationJob /> },
                            {
                                path: "ho-so-ca-nhan", element: <SlideCandidate />,
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
    },
    {
        path: "/nha-tuyen-dung/",
        children: [
            {
                path: "",
                element: <EmployerAuthLayout />,
                children: [
                    { path: "login", element: <LoginEmployer /> },
                    { path: "register", element: <EmployerRegistration /> },
                    { path: "reset/forgotPassword", element: <ForgetAminPassword /> },
                    { path: "reset/otpPassword", element: <OtpAdminPassword /> },
                    { path: "reset/resetPassword", element: <ResetAdminPassword /> },
                    {
                        element: <PrivateEmployerRoute />,
                        children: [
                            { path: "logout", element: <LogEmployerOut /> },

                            { path: "dashboard", element: <Dashboard /> },
                            { path: "thong-tin-cong-ty", element: <InfoCompany /> },
                            { path: "thong-tin-cong-ty/sua-thong-tin", element: <EditCompany /> },
                            { path: "cong-viec", element: <ManagerJob /> },
                            { path: "cong-viec/chi-tiet-cong-viec/:slug", element: <JobDetailPage /> },
                            { path: "cong-viec/them-cong-viec", element: <CreateJob /> },
                            { path: "cong-viec/sua-cong-viec/:slug", element: <EditJob /> },
                            { path: "don-ung-tuyen", element: <ApplicationList /> },
                            { path: "don-ung-tuyen/:slugJob", element: <ApplicationDetails /> },
                            { path: "ung-vien-tim-nang", element: < ManagePotentialCandidates /> },
                            { path: "quan-ly-lich-hen", element: < ManagerAppointment /> },

                            { path: "settings", element: <SettingAcountCompany /> },
                        ],
                    },
                ],
            },

        ],
    },
    {
        path: "/admin",
        children: [
          {
            path: "login", 
            element: <LoginAdmin /> 
          },
          {
            element: <PrivateRouteAdmin />, 
            children: [
              {
                element: <LayoutAdmin />,
                children: [
                  {
                    path: "logout", 
                    element: <LogoutAdmin />
                  },
                  {
                    path: "dashboard", 
                    element: <DashboardAdmin />
                  },
                  {
                    path: "employer",
                    element: <ManagerAdmin />
                  },
                  {
                    path: "employer/company/:slug",
                    element: <AdminCompanyDetail />
                  },
                  {
                    path: "city",
                    element: <ManagerCity />
                  },
                  {
                    path: "tag",
                    element: <ManagerTag />
                  },
                  {
                    path: "tag/create",
                    element: <TagCreate />
                  },
                  {
                    path: "tag/edit/:slug",
                    element: <TagEdit />
                  },
                  {
                    path: "candidate",
                    element: <ManagerCandidates />
                  },
                  {
                    path: "accounts",
                    element: <ListAccount />
                  },
                  {
                    path: "accounts/create",
                    element: <CreateAccount />
                  },
                  {
                    path: "accounts/edit/:slug",
                    element: <EditAccount />
                  },
                  {
                    path: "roles",
                    element: <ListPermission />
                  },
                  {
                    path: "roles/create",
                    element: <CreatePermission />
                  },
                  {
                    path: "roles/edit/:slug",
                    element: <EditPermission />
                  },
                  {
                    path: "permissions",
                    element: <AssignPermission />
                  },
                  {
                    path: "settings",
                    element: <GeneralSettings />
                  }
                ]
              }
            ]
          }
        ]
      }
      
];
