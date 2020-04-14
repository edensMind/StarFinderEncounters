import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import TabContent from './TabContent';
import EncounterSelect from './EncounterSelect';
import UnitCards from './UnitCards';

const styles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class ViewEncounter extends React.Component {
  state = {
    id: null
  }
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { id: null };
  }

  handleEncounterSelect = (encounterId) => {
    this.setState({id: encounterId});
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <TabContent 
          title = {<EncounterSelect callback={this.handleEncounterSelect}/>}
          content = {
            <div>
              <UnitCards encounterId={this.state.id}/>
            </div>
          }
        />
      </>
    )
  }
}

ViewEncounter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewEncounter);