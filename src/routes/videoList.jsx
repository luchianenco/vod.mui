// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views
import VideoListPage from "views/VideoList/VideoList.jsx";

const videosRoutes = [
  {
    path: "/page",
    sidebarName: "Videos",
    navbarName: "Videos",
    icon: Dashboard,
    component: VideoListPage
  },
  { redirect: true, path: "/", to: "/page/1", navbarName: "Redirect" }
];

export default videosRoutes;
