/* eslint-disable */
import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import SidebarFilter from "components/SidebarFilter/SidebarFilter.jsx";
import * as actions from 'actions/video';
import videoListRoutes from "routes/videoList.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

const switchRoutes = (
    <Switch>
        {videoListRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
    </Switch>
);

class App extends React.Component {
    state = {
        mobileOpen: false
    };
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        const queryParams = qs.parse(this.props.history.location.search);
        const id = this.props.match.params.id || 1;
        this.props.fetchVideos(id, queryParams);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if(this.state.mobileOpen){
                this.setState({mobileOpen: false});
            }
        }

        if (e.match.params.id !== this.props.match.params.id) {
          const id = this.props.match.params.id || 1;
          const queryParams = qs.parse(this.props.history.location.search);
          this.props.fetchVideos(id, queryParams);
        }
    }
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div className={classes.wrapper}>
                <SidebarFilter
                    routes={videoListRoutes}
                    logoText={"Developer Video"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                        routes={videoListRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(
    state => ({
        videos: state.video.list
    }),
    dispatch => ({
        fetchVideos: (id, queryParams) => dispatch(actions.getVideos(id, queryParams))
    })
)(withRouter(withStyles(dashboardStyle)(App)));
