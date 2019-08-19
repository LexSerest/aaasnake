import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'lessen',
  text: 'Score /2',
  show_msg: true,
  repeatability: 0.8,
  timeout: 30,
  color: "#000",
  //rndColor: true,
  //add_func: () => Player.getScore() > 1000 && SnakeFoods.iteration % 3 == 0,
  func: () => {
    Player.addScore(-Player.getScore()/2 >> 0);
    Player.inc();
  }
}