import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import HomePage from "./feature/HomePage";
import List from "./feature/admin";
import Add from "./feature/admin/Add";
import Edit from "./feature/admin/Edit";



const router = createBrowserRouter([
    {path:'', element:<LayoutWebsite/>,children:[
        {path:'/' , element:<HomePage/>}
    ]},
    {path:'/admin' , element:<LayoutAdmin/>, children:[
        {path:'/admin', element:<List/>},
        {path:'/admin/add', element:<Add/>},
        {path:'/admin/:id', element:<Edit/>}
    ]}
])

export default router