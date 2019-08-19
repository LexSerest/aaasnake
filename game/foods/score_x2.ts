import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'score_x2',
  text: 'Score x2',
  repeatability: 0.8, // 1
  show_msg: true,
  timeout: 30,
  color: "#000",
  //rndColor: true,
  //add_func: () => Player.getScore() > 1000 && SnakeFoods.iteration % 3 == 0,
  func: () => {
    Player.inc();
    Player.addScore(Player.getScore());
  }
}