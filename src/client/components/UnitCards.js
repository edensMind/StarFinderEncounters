import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Card Styles
const useStyles = makeStyles({
    root: {
        minWidth: 275,
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
  });

// Encounter Unit Card
function UnitCard(props) {
    const classes = useStyles();


    return(
        <Card className={classes.title} variant="outlined">
        <CardContent>
          <Typography classes={{ root: 'my-class-name' }} color="textSecondary" gutterBottom>
          {props.unit.name}
          </Typography>
          <Typography variant="h5" component="h2">

          </Typography>
          <Typography classes={{ root: 'my-class-name' }} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
}

// Class component with update / fetch functions
export default class UnitCards extends React.Component {
    state = {
        encounterId: null,
        units: null
    }
    constructor(props) {
        super(props);

        this.state = { 
            encounterId: props.encounterId,
            units: [] 
        };
    }

    fetchEncounter() {
        var thisComp = this;
        axios.get(`/api/getEncounter/${thisComp.props.encounterId}`)
        .then(res => {
            if(res.status == 200) {
                console.log("getEncounter 200", res.status);
                const units = res.data;
                this.setState({units: units, encounterId: thisComp.props.encounterId});
            }
            else if(res.status == 204){
                console.log("getAllEncounters 204", res.status);
            }
            else {
                console.log("getAllEncounters OTHER_STATUS", res.status);
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.encounterId !== this.props.encounterId) {
            this.fetchEncounter();
        }
    }

    render() {
        return (
            <>
                {this.state.units.map((unit) => (
                    <UnitCard unit={unit} key={unit._id}/>
                ))}
            </>
        );
    }
}
