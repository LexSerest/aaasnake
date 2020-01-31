import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'score_1000',
  text: 'Score +1000',
  show_msg: true,
  repeatability: 1, // 1/ 1
  timeout: 30,
  func: () => {
    Player.addScore(1000);
  }
}