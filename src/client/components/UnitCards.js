import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import '../../../public/css/styles.css';

// Card Styles
const useStyles = makeStyles({
    rootGrid: {
        flexGrow: 1,
    },
    rootCard: {
        border: "1px solid rgba(0, 0, 0, 0.65)",
    },
    fontColor: {
        color: '#ccc',
    },
    cardContent: {
        backgroundColor: "#555",
    },
  });

// Encounter Unit Card
function UnitCard(props) {
    const classes = useStyles();
    
    const unit = props.unit;

    return(
    <Card variant="outlined" className={`${classes.rootCard}`}>
        <CardContent className={`${classes.cardContent} ${classes.fontColor}`}>
            <Typography className={`${classes.unitName}`} variant="h5">
                {unit.name}
            </Typography >
            <Grid container className={classes.rootGrid} spacing={5}>
                <Grid item xs>
                    <div>
                        <p>Type: {`${unit.subType} ${unit.type}`}</p>
                        <p>Challenge Rating: {unit.challengeRating}</p>
                        <p>Size: {unit.size}</p>
                    </div>
                </Grid>
                <Grid item xs>
                    <div>
                        <p>Energy AC: {unit.energyArmorClass}</p>
                        <p>Kinetic AC: {unit.kineticArmorClass}</p>
                    </div>
                </Grid>
                <Grid item xs>
                    <div>
                    str: {unit.abilityScores.str}<br/>
                    dex: {unit.abilityScores.dex}<br/>
                    con: {unit.abilityScores.con}<br/>
                    int: {unit.abilityScores.int}<br/>
                    wis: {unit.abilityScores.wis}<br/>
                    cha: {unit.abilityScores.cha}
                    </div>
                </Grid>
                <Grid item xs>
                    <div>
                        <p>Energy AC: {unit.energyArmorClass}</p>
                        <p>Kinetic AC: {unit.kineticArmorClass}</p>
                    </div>
                </Grid>
                <Grid item xs>
                    <div>
                        <p>Type: {`${unit.subType} ${unit.type}`}</p>
                        <p>Challenge Rating: {unit.challengeRating}</p>
                        <p>Size: {unit.size}</p>
                    </div>
                </Grid>
                <Grid item xs>
                    <div>
                        <p>Type: {`${unit.subType} ${unit.type}`}</p>
                        <p>Challenge Rating: {unit.challengeRating}</p>
                        <p>Size: {unit.size}</p>
                    </div>
                </Grid>

            </Grid>

        </CardContent>
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
