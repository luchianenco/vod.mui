import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardMedia from '@material-ui/core/CardMedia';
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class VideoList extends React.Component {
    state = {
        value: 0
    };

    renderVideos() {
      if (!this.props.videos || this.props.videos.length === 0) {
        return;
      }
      const { classes } = this.props;
      return this.props.videos.docs.map((video) =>
        <GridItem xs={12} sm={12} md={4} key={video._id}>
          <Card style={styles.card}>
              <CardMedia
                  style={styles.media}
                  image={video.thumbnails.high.url}
                  alt={video.title}
              />
            <CardBody>
              <h4 className={classes.cardTitle}>
                <Link to={'/video/' + video._id}>{video.title}</Link>
              </h4>
              <p className={classes.cardCategory}>
                {video.description}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {video.publishedAt}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      );
    }

    renderPagination() {
      if (!this.props.videos || this.props.videos.pages < 2) {
        return;
      }

      const buttons = [];
      const { classes } = this.props;
      const queryString = this.props.history.location.search;

      for (let i = 1; i <= this.props.videos.pages; i++) {
        let color = i === parseInt(this.props.videos.page, 10)
            ? 'info'
            : undefined
        ;
        buttons.push(
            <Button
                className={classes.button}
                component={Link}
                size="sm"
                color={color}
                to={'/page/' + i + queryString}
                key={i}
            >
              {i}
            </Button>
        );
      }

      return buttons;
    }

    render() {
        return (
            <div>
                <Grid container>
                  {this.renderVideos()}
                </Grid>
              {this.renderPagination()}
            </div>
        );
    }
}

VideoList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(
    state => ({
      videos: state.video.list
    })
)(withRouter(withStyles(dashboardStyle)(VideoList)));
