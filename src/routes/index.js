import LayouCandidate from "../layout/layoutCadidate";
import Home from "../pages/Candidate/Home";


export const routes = [
    {
        path: "/",
        element:<LayouCandidate/>,
        children: [
            {
                path: "/",
                element:<Home/>
            },
        ]
    }
]