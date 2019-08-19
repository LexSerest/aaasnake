import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'size_add',
  text: 'Add size',
  show_msg: true,
  repeatability: 1, // 1
  timeout: 30,
  func: () => {
    Player.size += 5;
  }
}