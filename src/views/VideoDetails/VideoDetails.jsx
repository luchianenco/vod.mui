import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const styles = {
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class VideoDetails extends React.Component {
    state = {
        value: 0
    };

    render() {
        const videoId = this.props.match.params.id;

        return (
            <div>
                <Grid container>
                  <GridItem xs={12} sm={12} md={8}>
                    <Card style={styles.card}>
                      <CardHeader
                          title={this.props.video.title}
                      />
                      <CardMedia
                        component='iframe'
                        frameBorder='0'
                        height='350px'
                        src={'https://www.youtube.com/embed/' + videoId + '?showinfo=0'}
                      />
                      <CardContent>
                        {this.props.video.description}
                      </CardContent>
                      <CardActions>
                        {this.props.video.tags.map((tag, index) => {
                          return (
                              <Button key={index} variant="contained" size="small" style={{boxShadow: 'none'}}>
                                {tag}
                              </Button>
                          );
                        })}

                      </CardActions>
                    </Card>
                  </GridItem>
                </Grid>
            </div>
        );
    }
}

VideoDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(
    state => ({
      video: state.video.details
    })
)(withStyles(dashboardStyle)(VideoDetails));
