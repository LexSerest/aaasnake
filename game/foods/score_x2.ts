import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';
import SnakeFood from '../libs/snakeFood';

export default {
  name: 'score_x2',
  text: 'Score x2',
  repeatability: 1, // add_func = 100%
  show_msg: false,
  timeout: 30,
  color: "#fff",
  add_func: () => {
    if (Math.random() * 100 < 80) { // 80%
      SnakeFoods.addFood('score_x2', null, true);
      return true
    }
  },
  func: () => {
    let rnd = Math.random() * 2 >> 0;
    Player.addScore(rnd ? Player.getScore() : -Player.getScore() / 2 >> 0);
    GUI.addMessage(rnd ? 'Score x2' : 'Score /2')
    SnakeFoods.remove_food('score_x2')
  }
}