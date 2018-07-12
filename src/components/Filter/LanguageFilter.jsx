import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import querySearch from 'query-string';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
//core components
import Typography from '@material-ui/core/Typography';
import * as actions from 'actions/video';
import {warningColor} from 'assets/jss/material-dashboard-react';
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";

class LanguageFilter extends React.Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    const queryParams = querySearch.parse(this.props.history.location.search);
    if (!queryParams.language) {
      queryParams.language ='';
    }
    this.state = {
      checked: queryParams.language.split(',')
    };
  }

  componentDidUpdate(prev) {
    const search = this.props.history.location.search;
    const queryParams = querySearch.parse(search);
    const id = this.props.match.params.id;
    this.props.updateFilter(id, queryParams);
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });

    const queryParams = querySearch.parse(this.props.history.location.search);
    queryParams.language = newChecked.join(',');
    const queryString = querySearch.stringify(queryParams);
    this.props.history.push({
      search: queryString
    });
  };

  render() {
    const { classes } = this.props;
    return (
        <div className="filter-language">
          <Typography variant="title" color="secondary" style={{'marginLeft':'17px'}}>Languages</Typography>
          {this.props.entries.map(entry => {
            return (
                <Typography key={entry._id} >

                  <Checkbox
                      onClick={this.handleToggle(entry._id)}
                      checkedIcon={<Check className={classes.checkedIcon}/>}
                      icon={<Check className={classes.uncheckedIcon}/>}
                      classes={{checked: classes.checked}}
                      checked={this.state.checked.indexOf(entry._id) > -1}
                  />
                  <span style={{color:warningColor}}>{entry._id} ({entry.count})</span>
                </Typography>
            );
          })}
        </div>
    );
  }
}

LanguageFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
    state => ({}),
    dispatch => ({
      updateFilter: (id, queryParams) => dispatch(actions.getVideos(id, queryParams))
    })
)(withRouter(withStyles([checkboxAdnRadioStyle])(LanguageFilter)));