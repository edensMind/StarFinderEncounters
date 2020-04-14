import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TabContent from './TabContent';
import axios from 'axios';
import PropTypes from 'prop-types';

const styles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class CreateEncounter extends React.Component {
  state = {
    result: "",
  }
  
  componentDidMount() {

    // Define Encounter Object
    var encounterObj = { 
      _id: null,
      name: "Goblins", 
      isActive: true,
      units: [] 
    };

    // Define Unit Object
    var unit = {
      _id: null,
      memberOf: [],
      name: "Goblin",
      type: "Goblin",
      subType: "Cave",
      size: "S",
      challengeRating: 5,
      energyArmorClass: 15,
      kineticArmorClass: 15,
      initiative: 2,
      abilityScores: {
        str: 12,
        dex: 12,
        con: 12,
        int: 12,
        wis: 12,
        cha: 12,
      },
      savingThrows: {
        fortitude: 3,
        reflex: 3,
        will: 3
      },
      attackBonuses: {
        melee: 5,
        ranged: 5,
        thrown: 5,
      },
      weapons: [
        {
          _id: null,
          name: "Wood Short Bow",
          type: "Ranged",
          level: 3,
          attackBonus: 4,
          critical: 3,
          range: 40,
          damage: "1d8",
          ammoUsage: 30
        },
      ],
      spellUses: "4 3 2",
      spells: [
        {
          _id: null,
          name: "Mage Hand",
          level: 3,
          description: "Slap for 1d6"
        }
      ],
      isActive: true
    };

    encounterObj.units.push(unit);

    axios.post(`/api/createEncounter`, encounterObj)
      .then(res => {
        if(res.status == 200) {
          console.log("200", res.status);
          this.setState({result: res.status});
        }
        else if(res.status == 204){
          console.log("204", res.status);
        }
        else {
          console.log("else", res.status);
        }
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <>
          <TabContent 
            title = {"Create Encounter"}
            content = {this.state.result}
          />
      </>
    )
  }
}

CreateEncounter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateEncounter);