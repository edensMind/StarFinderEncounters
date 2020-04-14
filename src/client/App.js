import React from 'react';
import TabNavigation from './components/TabNavigation';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import logo from '../../public/img/logo.png'

const styles = theme => ({
  banner: {
    height: 80,
    textAlign: "center"
  },
  logo: {
    marginTop: 10,
  },
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <div>
            <div className={classes.banner}>
              <img src={logo} className={classes.logo}/>
            </div>
            <TabNavigation/>
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);


