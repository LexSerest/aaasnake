import { Vars } from '../vars';
import Canvas from './canvas';
import GUI from './gui';
import { Direction }   from '../helpers/enum'


namespace Player {

  export let size = 4;
  export let pos: Pos = { x: 1, y: 3 };
  export let tail: Pos[] = [];
  export let speed: number = 0;
  export let direction: Direction = Direction.Down;
  export let isWall: boolean = true;
  export let score: number = 0;
  export let color_snake: string = Vars.color_snake;
  export let color_snake_head: string = Vars.color_snake_head;


  export function set_default() {
    size = 3;
    pos = { x: 1, y: 3 };
    tail = [];
    speed = 0;
    direction = Direction.Down;
    isWall = true;
    score = 0;
  }

  export function inc() {
    speed++;
    size++;
  }

  export function setDirection(new_direction: Direction) {
    direction = new_direction;
  }

  export function setPos(new_pos: Pos) {
    pos = new_pos;
  }

  export function draw() {
    for (let i = 0; i < tail.length; i++) {
      let e = tail[i];
      Canvas.drawBox(e.x, e.y, Vars.color_snake)
    }
    if (tail.length > size) {
      let { x, y } = tail.pop();
      Canvas.drawBox(x, y, Vars.color_background)
    }
    Canvas.drawBox(pos.x, pos.y, Vars.color_snake_head);
  }

  export function collision() {
    let is_success = true;
    for (let i = 0; i < tail.length; i++) {
      let e = tail[i];
      if (i && i != tail.length - 1 && e.x == pos.x && e.y == pos.y)
        is_success = false;
    }

    if (isWall) {
      if (
        pos.y < 0 ||
        pos.x < 0 ||
        pos.y > Vars.defaultSizeMap - 1 ||
        pos.x > Vars.defaultSizeMap - 1
      ) is_success = false;
    }

    return is_success;
  }

  export function getScore() {
    return score;
  }

  export function addScore(set_score = 0) {
    if (!set_score) set_score = (size + speed) / 2 >> 0;
    score += set_score;
    GUI.updateScore();
  }

}

export default Player;