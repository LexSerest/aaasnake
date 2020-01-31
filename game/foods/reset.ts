import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'reset',
  text: 'Reset',
  repeatability: 0.5,
  show_msg: true,
  timeout: 30,
  func: () => {
    SnakeFoods.rndColorReset();
    SnakeFoods.foods_init();
    Object.keys(GUI._timers).forEach( e => GUI._timers[e].func())
    GUI._timers = {};
    GUI.clearTimer();
    SnakeFoods.foods = SnakeFoods.foods.filter(e => e.name == "feces" )
    SnakeFoods.addFood('eat');
    setTimeout(e => GUI.legengReset(), 100);
  }
}