import React from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import CategoryFilter from 'components/Filter/CategoryFilter';
import LanguageFilter from 'components/Filter/LanguageFilter';
import * as actions from 'actions/filter';

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

class SidebarFilter extends React.Component {
  constructor(props) {
    super(props);
    const {classes, logo, logoText} = props;

    this.brand = (
        <div className={classes.logo}>
          <a href="/" className={classes.logoLink}>
            <div className={classes.logoImage}>
              <img src={logo} alt="logo" className={classes.img}/>
            </div>
            {logoText}
          </a>
        </div>
    );
  }

  componentDidMount() {
    this.props.getFilters();
  }

  renderFilters() {
    const filters = [];
    if (!Object.keys(this.props.filters).length) {
      return filters;
    }
    if (this.props.filters.categories.length > 0) {
      filters.push(
          <CategoryFilter key="cat" entries={this.props.filters.categories}/>
      );
    }
    if (this.props.filters.languages.length > 0) {
      filters.push(
          <LanguageFilter key="lang" entries={this.props.filters.languages}/>
      );
    }
    return filters;
  }

  render () {
    const {classes, image} = this.props;

    return (
        <div>
          <Hidden mdUp>
            <Drawer
                variant="temporary"
                anchor="right"
                open={this.props.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.props.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
            >
              {this.brand}
              <div className={classes.sidebarWrapper}>
                {this.renderFilters()}
              </div>
              {image !== undefined ? (
                  <div
                      className={classes.background}
                      style={{backgroundImage: "url(" + image + ")"}}
                  />
              ) : null}
            </Drawer>
          </Hidden>
          <Hidden smDown>
            <Drawer
                anchor="left"
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper
                }}
            >
              {this.brand}
              <div className={classes.sidebarWrapper}>{this.renderFilters()}</div>
              {image !== undefined ? (
                  <div
                      className={classes.background}
                      style={{backgroundImage: "url(" + image + ")"}}
                  />
              ) : null}
            </Drawer>
          </Hidden>
        </div>
    );
  }
};

SidebarFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    filters: state.filter.facet
  }),
  dispatch => ({
    getFilters: () => dispatch(actions.getFilters())
  })
)(withStyles(sidebarStyle)(SidebarFilter));
