import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'score_x3',
  text: 'Score x3 (Hidden bonus)!',
  show_msg: true,
  repeatability: 1, 
  notLegend: true,
  color: Vars.color_border,
  func: () => Player.addScore(Player.getScore() * 2)
}