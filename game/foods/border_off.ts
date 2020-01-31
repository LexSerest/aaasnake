import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'border_off',
  text: 'Border off',
  show_msg: true,
  repeatability: 1, // 1
  timeout: 30,
  disable_time: 180,
  disabled: () => {
    Player.isWall = true;
    Vars.color_border = DefaultVars.color_border;
  },
  func: () => {
    Player.isWall = false;
    Vars.color_border = '#C0C5CE';
  }
}

