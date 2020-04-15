import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { useState, useEffect } from "react";
import '../../../public/css/styles.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  fontColor: {
    color: '#ccc',
  },
  bgColor: {
    color: '#666666',
  },
  label: {
    color: 'green',
    focused: {
      color: 'red',
    },
  },
  root: {
    color: "#ccc",
  },
  'root.focused' : {
    color: "red"
  },
}));



export default function EncounterSelect(props) {
  const classes = useStyles();
  const [encounter, setEncounter] = useState('');
  const [encounters, setEncounters] = useState([]);

  // Select Encounter Trigger
  const handleChange = (event) => {
    setEncounter(event.target.value);
    // send selected ID to callback function from properties
    props.callback(event.target.value);
  };

  useEffect(() => {
    axios.get(`/api/getAllEncounters`)
      .then(res => {
        if(res.status == 200) {
          console.log("getAllEncounters 200", res.status);
          const encounters = res.data;
          setEncounters(encounters);
        }
        else if(res.status == 204){
          console.log("getAllEncounters 204", res.status);
        }
        else {
          console.log("getAllEncounters OTHER_STATUS", res.status);
        }
      })
  }, []);

  return (
    <div>
      <FormControl className={`${classes.formControl} encounter-select`}>

          <InputLabel 
            className={`${classes.root} encounter-select-label`}
            id="encounter-select-label"
          >
            View an Encounter
          </InputLabel>

        <Select
          className={classes.fontColor}
          labelId="encounter-select-label"
          id="encounter-select"
          value={encounter}
          onChange={handleChange}
        >
        {encounters.map((row) => (
          <MenuItem className={`${classes.fontColor}`} value={row._id} key={row._id}>{row.name}</MenuItem>
        ))}
        </Select>
        {/* <FormHelperText className={`${classes.fontColor}`}>Select an Encounter</FormHelperText> */}
      </FormControl>
    </div>
  );
}