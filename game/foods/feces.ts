import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'feces',
  text: 'Feces',
  isNotEat: true,
  color: Vars.color_border,
  repeatability: 0.9,
  func: () => Snake.end()
}
