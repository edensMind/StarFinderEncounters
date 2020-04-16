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
                <Grid item xs={2}>
                    <div>
                        Type: {`${unit.subType} ${unit.type}`}<br/>
                        Challenge Rating: {unit.challengeRating}<br/>
                        Size: {unit.size}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div>
                        Energy AC: {unit.energyArmorClass}<br/>
                        Kinetic AC: {unit.kineticArmorClass}<br/>
                        Fortitude: {unit.savingThrows.fortitude}<br/>
                        Reflex: {unit.savingThrows.reflex}<br/>
                        Will: {unit.savingThrows.will}<br/>
                    </div>
                </Grid>
                <Grid item xs>
                    <div>
                        {/* str: {unit.abilityScores.str}<br/>
                        dex: {unit.abilityScores.dex}<br/>
                        con: {unit.abilityScores.con}<br/>
                        int: {unit.abilityScores.int}<br/>
                        wis: {unit.abilityScores.wis}<br/>
                        cha: {unit.abilityScores.cha} */}
                        <table>
                            <tr>
                                <th>ABI</th>
                                <th>SCR</th>
                                <th>MOD</th>
                            </tr>
                            <tr>
                                <th>STR</th>
                                <td>{unit.abilityScores.str}</td>
                                <td>+{getAbilityScoreModifier(unit.abilityScores.str)}</td>
                            </tr>
                            <tr>
                                <th>DEX</th>
                                <td>{unit.abilityScores.dex}</td>
                                <td>+{getAbilityScoreModifier(unit.abilityScores.dex)}</td>
                            </tr>
                            <tr>
                                <th>CON</th>
                                <td>{unit.abilityScores.con}</td>
                                <td>+{getAbilityScoreModifier(unit.abilityScores.con)}</td>
                            </tr>
                            <tr>
                                <th>INT</th>
                                <td>{unit.abilityScores.int}</td>
                                <td>+{getAbilityScoreModifier(unit.abilityScores.int)}</td>
                            </tr>
                            <tr>
                                <th>WIS</th>
                                <td>{unit.abilityScores.wis}</td>
                                <td>+{getAbilityScoreModifier(unit.abilityScores.wis)}</td>
                            </tr>
                            <tr>
                                <th>CHA</th>
                                <td>{unit.abilityScores.cha}</td>
                                <td>+{getAbilityScoreModifier(unit.abilityScores.cha)}</td>
                            </tr>
                        </table>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div>
                        {unit.weapons.map((weapon) => (
                        <div>
                            {weapon.name}<br/>
                            <span>{weapon.damage} {weapon.type} damage</span><br/>
                            <span>Bonus: +{weapon.attackBonus} Range: {weapon.range} Critical: {weapon.critical}x</span>
                        </div>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div>
                        Spell Uses {unit.spellUses}
                        {unit.spells.map((spell) => (
                        <div>
                            <span>{spell.name} lvl {spell.level}</span><br/>
                            <span>{spell.description}</span>
                        </div>
                        ))}
                    </div>
                </Grid>

            </Grid>

        </CardContent>
    </Card>
    );
}

const getAbilityScoreModifier = (score) => {
    var mod = Math.floor(( score - 10 ) / 2 )
    return mod;
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
            hasError: false,
            encounterId: props.encounterId,
            units: [] 
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, errorInfo);
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
                console.log("getEncounter 204", res.status);
            }
        })
        .catch(error => {
            console.log("!getEncounter: ", error);
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.encounterId !== this.props.encounterId) {
            this.fetchEncounter();
        }
    }

    render() {
        if (this.state.hasError) {
            <div>Error Rendering Cards</div>
        }
        else {
            return (
                <>
                    {this.state.units.map((unit) => (
                        <UnitCard unit={unit} key={unit._id}/>
                    ))}
                </>
            );
        }
    }
}
