import Snake from './libs/snake';
import Foods from './libs/snakeFood';
import GUI from './libs/gui';
import Keyboard from './libs/keyboard';
import Player from './libs/player';
import { Keys } from './helpers/enum';
import { $ } from './helpers/helpers';

setTimeout(e => {
  let rev = $('script').src.split('app.')[1].slice(0, -3);
  $('#rev').innerText = rev;
}, 1000)

window.Game = {
  start() {
    GUI.window_open('hide');
    Snake.start();
  },
  unpause(){ Snake.isPause && Snake.pause() },
  pauseToggle(){ Snake.pause() },
  setting(){ GUI.window_open('setting'); },
  main(){ GUI.window_open('start'); },
  swipeToggle(){ GUI.swipeToggle(); },
  button_up(){ Snake.keyboardEvent(Keys.Up) },
  button_left(){ Snake.keyboardEvent(Keys.Right) },
  button_down(){ Snake.keyboardEvent(Keys.Down) },
  button_right(){ Snake.keyboardEvent(Keys.Left) },
  clearScore(){ GUI.resetBest(); },
  Foods,
  GUI,
  Player
};

GUI.swipeToggle(+localStorage.getItem('swipemode') || 0)
Snake.init('#snake');

