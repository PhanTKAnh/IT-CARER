import PrivateRoute from "../components/Candidate/PrivateRoute";
import LayouCandidate from "../layout/layoutCadidate";
import DetailCompany from "../pages/Candidate/DetailCompany";
import Home from "../pages/Candidate/Home";
import Login from "../pages/Candidate/Login";
import LogOut from "../pages/Candidate/LogOut";
import Register from "../pages/Candidate/Register";
import Search from "../pages/Candidate/Search";


export const routes = [
    {
        path: "/",
        element:<LayouCandidate/>,
        children: [
            {
                path: "/",
                element:<Home/>
            },
            {
                path: "/search",
                element:<Search/>,
                children: [   
                    {
                        path: "list",
                        element: <Search />
                    },
                ]
            },
            {
                path: "/:slugCompany",
                element:<DetailCompany/>
            },           
            {
                path: "/nguoi-tim-viec/register",
                element:<Register/>
            },
            {
                path: "/nguoi-tim-viec/login",
                element:<Login/>,
            }, 
            {
                element: <PrivateRoute/>,
                children:[
                    {
                    path: "/nguoi-tim-viec/logout",
                    element:<LogOut/>,
                }, 
            ]
            }
        ]
    }
]