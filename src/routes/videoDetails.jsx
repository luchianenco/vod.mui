import Dashboard from '@material-ui/icons/Dashboard';
import VideoDetailsPage from 'views/VideoDetails/VideoDetails.jsx';

const videosRoutes = [
  {
    path: "/video",
    sidebarName: "Video",
    navbarName: "Video",
    icon: Dashboard,
    component: VideoDetailsPage
  }
];

export default videosRoutes;
