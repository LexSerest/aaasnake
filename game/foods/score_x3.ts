import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'score_x3',
  text: 'Score x3',
  show_msg: true,
  repeatability: 0.8,
  timeout: 30,
  pseudo: ['speed_add', 'size_add', 'score_1000', 
  'score_x2', 'size_reduce', 'speed_reduce', 'border_off', 'splitfood'],
  add_func: () => Player.getScore() > 1000 && SnakeFoods.iteration % 3 == 0,
  func: () => Player.addScore(Player.getScore() * 2)
}