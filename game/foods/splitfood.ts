import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'splitfood',
  text: 'Split food',
  show_msg: true,
  repeatability: 1, // 1
  timeout: 30,
  func: () => {
    SnakeFoods.addFood('eat');
  }
}