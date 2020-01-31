import { $, $$ } from '../helpers/helpers';

import Keyboard from './keyboard';
import Player from './player'
import { Vars } from '../vars';

import Canvas from './canvas';
import GUI from './gui';
import SnakeFoods from './snakeFood';

import { Direction, Keys } from '../helpers/enum'

namespace Snake {

  export let isStart = false;
  export let isPause = false;
  export let isLockKeyboard = false;

  export let onStart: Function = null;
  export let onEnd: Function = null;
  export let onEat: Function = null;
  export let onPause: Function = null;
  export let _timer = null;
  export let _lastKeysPress = [];

  export function testDirection(e) {
    if ((Keys.Up == e && Player.direction == Direction.Down) ||
      (Keys.Down == e && Player.direction == Direction.Up) ||
      (Keys.Left == e && Player.direction == Direction.Right) ||
      (Keys.Right == e && Player.direction == Direction.Left) ||
      (Keys.Up == e && Player.direction == Direction.Up) ||
      (Keys.Down == e && Player.direction == Direction.Down) ||
      (Keys.Left == e && Player.direction == Direction.Right) ||
      (Keys.Right == e && Player.direction == Direction.Left)
    )
      return true
  }

  export function keyboardEvent(e) {
    if (Keys.Return == e) start()
    if (Keys.Space == e) pause()

    if (Keys.Up != e &&
      Keys.Down != e &&
      Keys.Left != e &&
      Keys.Right != e) return;

    if (!isStart || isPause) return;
    let last = _lastKeysPress[_lastKeysPress.length - 1] || Player.direction;
    if (last == e ||
      (Keys.Up == e && last == Direction.Down) ||
      (Keys.Down == e && last == Direction.Up) ||
      (Keys.Left == e && last == Direction.Right) ||
      (Keys.Right == e && last == Direction.Left) ||
      (Keys.Up == e && last == Direction.Up) ||
      (Keys.Down == e && last == Direction.Down) ||
      (Keys.Left == e && last == Direction.Left) ||
      (Keys.Right == e && last == Direction.Right)
    ) return;

    if (_lastKeysPress.length < 3) _lastKeysPress.push(e);
  }

  export function init(canvas_selector: string) {
    Canvas.init(canvas_selector);
    GUI.bestShow();
    GUI.legendInit();
    Keyboard.init_keyboard($('body'), e => keyboardEvent(e))
    Keyboard.init_doubletap($('canvas'), e => keyboardEvent(e))
  }

  export function changeDirection(e) {
    if (testDirection(e)) return;
    Player.direction = Direction[Keys[e]]
  }



  export function run() {
    clearTimeout(_timer);
    _timer = setTimeout(() => {
      let e = _lastKeysPress.shift();
      if (e) {
        changeDirection(e);
      }
      if (isStart) {
        move();
        run();
      }
    }, 300 - Player.speed * 3)
  }

  export function pause() {
    if (!isStart) return;
    GUI.window_open('hide')
    if (isPause)
      run();
    else
      clearTimeout(_timer);

    isPause = !isPause;

    if (!isStart) return;
    if (isPause) GUI.window_open('pause');
    else GUI.window_open('hide');
    SnakeFoods.draw()
  }

  export function snake() {
    Canvas.first()
    Player.draw();
    SnakeFoods.draw();
  }

  export function end() {
    isStart = false;
    if (onEnd) onEnd();
    GUI.updateTime();
    GUI.window_open('endgame');
    GUI.clearTimer();
    GUI.updateBest();
  }

  export function start() {
    if (onPause && isPause) {
      isPause = false;
      onPause(false);
    }

    Vars.set_default();
    Player.set_default();
    GUI.init();
    SnakeFoods.init();
    Canvas.first();

    isStart = true;
    SnakeFoods.clear();
    SnakeFoods.addFood('eat');

    run();
    GUI.window_open('hide')

    GUI.updateScore();
    GUI.legengReset();
    GUI.clearTimer();
  }

  export function move() {

    Player.tail.unshift({ x: Player.pos.x, y: Player.pos.y })
    switch (Player.direction) {
      case Direction.Up: Player.pos.y--; break;
      case Direction.Right: Player.pos.x--; break;
      case Direction.Down: Player.pos.y++; break;
      case Direction.Left: Player.pos.x++; break;
    }
    if (!Player.isWall) {
      if (Player.pos.y < 0) Player.pos.y = Vars.defaultSizeMap - 1;
      if (Player.pos.x < 0) Player.pos.x = Vars.defaultSizeMap - 1;
      if (Player.pos.y > Vars.defaultSizeMap - 1) Player.pos.y = 0;
      if (Player.pos.x > Vars.defaultSizeMap - 1) Player.pos.x = 0;
    }

    if (!isStart || !Player.collision()) return end();
    SnakeFoods.eat_event();
    if (!isStart) Player.pos = Player.tail.shift();
    snake();
  }

}

export default Snake;