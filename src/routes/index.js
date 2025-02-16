import LayouCandidate from "../layout/layoutCadidate";
import Home from "../pages/Candidate/Home";
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
                path: "/search/:keyword?/:city?",
                element:<Search/>
            },
        ]
    }
]