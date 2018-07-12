import VideoList from 'layouts/VideoList/VideoList.jsx';
import Dashboard from 'layouts/Dashboard/Dashboard';
import VideoDetails from 'layouts/VideoDetails/VideoDetails';

const indexRoutes = [
  { path: "/page/:id", component: VideoList },
  { path: "/video/:id", component: VideoDetails },
  { path: "/dashboard", component: Dashboard},
  { path: "/", component: VideoList }
];

export default indexRoutes;
