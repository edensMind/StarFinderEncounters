import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ViewEncounter from './ViewEncounter';
import CreateEncounter from './CreateEncounter';
import EditEncounter from './EditEncounter';

function TabNavigation(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabNavigation.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Color values
const gray = `112`;
const transp = `0.8`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: `rgba(${gray}, ${gray}, ${gray}, ${transp})`,
  },
  bar: {
    backgroundColor: "#093e72",
  },
  indicator: {
    backgroundColor: '#ff7719',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"
         classes={{
          indicator: classes.indicator
          }}>
        >
          <Tab label="View Encounter" {...a11yProps(0)} />
          <Tab label="Create Encounter" {...a11yProps(1)} />
          <Tab label="Edit Encounter" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabNavigation value={value} index={0}>
        <ViewEncounter/>
      </TabNavigation>
      <TabNavigation value={value} index={1}>
        <CreateEncounter/>
      </TabNavigation>
      <TabNavigation value={value} index={2}>
        <EditEncounter/>
      </TabNavigation>
    </div>
  );
}