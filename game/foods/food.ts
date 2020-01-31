import SnakeFoods from '../libs/snakeFood';
import { Vars, DefaultVars } from '../vars';
import Snake from '../libs/snake';
import GUI from '../libs/gui'
import Player from '../libs/player';

export default {
  name: 'eat',
  text: 'Food',
  color: Vars.color_food,
  repeatability: 1,
  func: () => {
    Player.inc();
    Player.addScore();
    SnakeFoods.addFood('eat');
    setTimeout(e => {
      let rnd = Math.random() * 100;
      if (rnd < 5) SnakeFoods.addFood('score_x3', Player.pos)
      if (rnd >= 30) SnakeFoods.addFood('feces', Player.pos)
    }, 100)

    SnakeFoods.addFoodSmart([
      'border_off',
      'speed_reduce',
      'size_reduce',
      'speed_add',
      'size_add',
      'score_x2',
      'score_1000',
      'splitfood',
      'clean'
    ])
  }
}