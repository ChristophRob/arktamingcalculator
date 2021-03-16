import React from 'react';
import health_logo from './icon/Health.png';
import stamina_logo from './icon/Stamina.png';
import oxygen_logo from './icon/Oxygen.png';
import food_logo from './icon/Food.png';
import weight_logo from './icon/Weight.png';
import dmg_logo from './icon/Melee_Damage.png';
import NumberFormat from 'react-number-format';
import multipliers from './data/multipliers.json'
import dino_data from './data/dino_stats.json'
import './App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import green from '@material-ui/core/colors/green';
import Slider from '@material-ui/core/Slider';

function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: green[500],
          },
          secondary: {
            main: green[900],
          },
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dino />
    </ThemeProvider>
  );
}

class Dino extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dino_te: 1,
      dino_ib: 0,
      species: "Argentavis",
      singleplayer: false,
      dinoLevel: 224,
      LwHealth: 32,
      LwStamina: 32,
      LwOxygen: 32,
      LwFood: 32,
      LwWeight: 32,
      LwMeleeDmg: 32,
      LwMovementSpeed: 31,
    };
    this.changeTamingEffectiveness = this.changeTamingEffectiveness.bind(this);
    this.changeImprintingBonus = this.changeImprintingBonus.bind(this);
    this.changeDino = this.changeDino.bind(this);
    this.changeSingleplayer = this.changeSingleplayer.bind(this);
    this.changeDinoLevel = this.changeDinoLevel.bind(this);
    this.changeWildLevel = this.changeWildLevel.bind(this);
    this.updateLwValues = this.updateLwValues.bind(this);
  }

  changeWildLevel(name, Lw) {
    this.setState({ [name]: Lw });
  }

  changeTamingEffectiveness(dino_te) {
    this.setState({ dino_te });
  }

  changeImprintingBonus(dino_ib) {
    this.setState({ dino_ib: dino_ib });
  }

  changeDino(species) {
    this.setState({ species: species });
  }

  changeSingleplayer(event) {
    this.setState({ singleplayer: event.target.checked });
  }

  updateLwValues(dinoLevel) {
    const calcLevel = dinoLevel
    const statsLw = ["LwHealth", "LwStamina", "LwOxygen", "LwFood", "LwWeight", "LwMeleeDmg", "LwMovementSpeed"];
    const rest = (calcLevel - 1) % 7;
    const levels = Math.floor((calcLevel - 1) / 7);
    const newLevels = {};
    for (var i = 0; i < statsLw.length; i++) {
      const extra_point = rest > i ? 1 : 0;
      newLevels[statsLw[i]] = levels + extra_point;
    }
    this.setState({ ...newLevels });
  }

  changeDinoLevel(dinoLevel) {
    this.setState({ dinoLevel });

    const timeOutId = setTimeout(() => this.updateLwValues(dinoLevel), 500);
    return () => clearTimeout(timeOutId);
  }

  render() {
    return (
      <>
        <DinoSettings {...this.state} changeDino={this.changeDino} changeDinoLevel={this.changeDinoLevel} changeTamingEffectiveness={this.changeTamingEffectiveness} changeImprintingBonus={this.changeImprintingBonus} changeSingleplayer={this.changeSingleplayer} />
        <StatForm {...this.state} changeWildLevel={this.changeWildLevel} />
      </>
    );
  }
}

class DinoSettings extends React.Component {
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DinoSelect value={this.props.species} changeDino={this.props.changeDino} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox checked={this.props.singleplayer} onChange={this.props.changeSingleplayer} />}
            label="Singleplayer Settings"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberInput label={"Taming Effectivenes in % "} value={this.props.dino_te} changeNumber={this.props.changeTamingEffectiveness} pm={0.01} max_value={100} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberInput label={"Imprinting Bonus in % "} value={this.props.dino_ib} changeNumber={this.props.changeImprintingBonus} pm={0.01} max_value={100} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DinoLevelSlider label={"Dino Level"} dinoLevel={this.props.dinoLevel} changeDinoLevel={this.props.changeDinoLevel} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberInput label={"Dino Level"} value={this.props.dinoLevel} changeNumber={this.props.changeDinoLevel} pm={1} max_value={999} />
        </Grid>
      </Grid >
    );
  }
}

class StatForm extends React.Component {
  render() {
    return (
      <>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={2} className="statLabel">
            Stat
        </Grid>
          <Grid item xs={3}>
            Wild Level
          </Grid>
          <Grid item xs={1}>
            Wild Value
          </Grid>
          <Grid item xs={3}>
            Domesticated Level
          </Grid>
          <Grid item xs={2}>
            Total Value
          </Grid>

          <SingleStat stat_key="HEALTH" nameLw="LwHealth" label="Health" {...this.props} pic={health_logo} />
          <SingleStat stat_key="STAMINA" nameLw="LwStamina" label="Stamina" {...this.props} pic={stamina_logo} />
          <SingleStat stat_key="OXYGEN" nameLw="LwOxygen" label="Oxygen" {...this.props} pic={oxygen_logo} />
          <SingleStat stat_key="FOOD" nameLw="LwFood" label="Food" {...this.props} pic={food_logo} />
          <SingleStat stat_key="WEIGHT" nameLw="LwWeight" label="Weight" {...this.props} pic={weight_logo} />
          <SingleStat stat_key="MELEE_DMG" nameLw="LwMeleeDmg" label="Melee Dmg" {...this.props} pic={dmg_logo} percent={true} />
        </Grid>
      </>
    );
  }
}

class SingleStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statLd: 0,
    };
    this.changeLw = this.changeLw.bind(this);
    this.changeLd = this.changeLd.bind(this);
    this.calcWildValue = this.calcWildValue.bind(this);
    this.calcTamedValue = this.calcTamedValue.bind(this);
    if (dino_data[props.species].hasOwnProperty(props.stat_key)) {
      this.dino_stats = dino_data[props.species][props.stat_key];
    } else {
      this.dino_stats = {};
    }
    this.pm = props.percent ? 0.01 : 1;
    this.max_value = props.percent ? 100 : 500;
  }

  changeLw(Lw) {
    this.props.changeWildLevel(this.props.nameLw, Lw)
  }

  changeLd(Ld) {
    this.setState({ statLd: Ld });
  }

  calcWildValue() {
    return this.dino_stats.B * (1 + this.props[this.props.nameLw] * this.dino_stats.Iw * this.multipliers.IwM);
  }
  calcTamedValue(wildValue, imprinting) {
    let imprint_multiplier = 1
    if (imprinting) {
      imprint_multiplier = 1 + this.props.dino_ib * 0.2 * this.multipliers.IBM
    }
    return (wildValue * 1 * imprint_multiplier + this.dino_stats.Ta * this.multipliers.TaM) * (1 + this.props.dino_te * this.dino_stats.Tm * this.multipliers.TmM);
  }
  calcTaFinalValue(postImprintValue) {
    return postImprintValue * (1 + this.state.statLd * this.dino_stats.Id * this.multipliers.IdM);
  }

  render() {
    const multiplier_key = this.props.singleplayer ? "singleplayer" : "official";
    if (multipliers[multiplier_key].hasOwnProperty(this.props.stat_key)) {
      this.multipliers = multipliers[multiplier_key][this.props.stat_key];
    } else {
      this.multipliers = multipliers.default;
    }
    this.dino_stats = dino_data[this.props.species][this.props.stat_key]
    const wildValue = this.calcWildValue();
    // const postTamedValue = this.calcTamedValue(wildValue, false);
    const postImprintValue = this.calcTamedValue(wildValue, true);
    const finalValue = this.calcTaFinalValue(postImprintValue);
    return (
      <>
        <Grid item xs={1}>
          <img src={this.props.pic} className="statIcon" alt="{this.state.label}_icon"></img>
        </Grid>
        <Grid item xs={2} className="statLabel">
          {this.props.label}
        </Grid>
        <Grid item xs={3}>
          <NumberInput value={this.props[this.props.nameLw]} changeNumber={this.changeLw} pm={1} max_value={500} />
        </Grid>
        <Grid item xs={1}>
          <NumberFormat value={wildValue / this.pm} displayType={'text'} thousandSeparator={true} decimalScale={1} />
        </Grid>
        <Grid item xs={3}>
          <NumberInput value={this.state.statLd} changeNumber={this.changeLd} pm={1} max_value={500} />
        </Grid>
        <Grid item xs={2}>
          <NumberFormat value={finalValue / this.pm} displayType={'text'} thousandSeparator={true} decimalScale={1} />
        </Grid>
      </>
    );
  }
}


class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.increaseValue = this.increaseValue.bind(this);
    this.decreaseValue = this.decreaseValue.bind(this);
  }

  handleChange(event) {
    this.props.changeNumber(event.target.value * this.props.pm);
  }

  increaseValue(event) {
    this.props.changeNumber((this.props.value / this.props.pm + 1) * this.props.pm);
  }

  decreaseValue(event) {
    this.props.changeNumber((this.props.value / this.props.pm - 1) * this.props.pm);
  }

  render() {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {this.props.label}
          <TextField className="statInput" label={this.props.label} name={this.props.name} type="number" variant="outlined" InputProps={{ inputProps: { max: this.props.max_value, min: 0 } }} value={this.props.value / this.props.pm} onChange={this.handleChange} />
        </Grid>
        <Grid item>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained primary button group"
            color="secondary"
            variant="contained"
            size="small"
          >
            <Button name="increase" onClick={this.increaseValue}><AddIcon /></Button>
            <Button name="decrease" onClick={this.decreaseValue}><RemoveIcon /></Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
}

class DinoSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.dino_list = Object.keys(dino_data);
  }

  handleChange(event, value) {
    if (this.dino_list.indexOf(value) > -1) {
      this.props.changeDino(value);
    }

  }

  render() {
    return (
      <Autocomplete
        id="combo-box-demo"
        value={this.props.value}
        options={this.dino_list}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        onChange={this.handleChange}
        renderInput={(params) => <TextField {...params} label="Species" variant="outlined" />}
      />
    );
  }
}

class DinoLevelSlider extends React.Component {
  constructor(props) {
    super(props);
    this.sliderDinoLevel = this.sliderDinoLevel.bind(this);
    this.marks = [
      { value: 50, label: 50 },
      { value: 100, label: 100 },
      { value: 150, label: 150 },
      { value: 200, label: 200 },
      { value: 250, label: 250 },
    ]
  }

  sliderDinoLevel(event, newValue) {
    this.props.changeDinoLevel(newValue);
  }

  render() {
    return (
      <Slider
        value={this.props.dinoLevel}
        onChange={this.sliderDinoLevel}
        max={300}
        min={1}
        marks={this.marks}
      />
    );
  }
}


export default App;


