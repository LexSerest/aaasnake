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

  export function inc(){
    speed++;
    size++;
  }

  export function draw() {
    Player.tail.forEach(e => Canvas.drawBox(e.x, e.y, Vars.color_snake))
    if (tail.length > size) {
      let {x, y} = tail.pop();
      Canvas.drawBox(x, y, Vars.color_background)
    }
    Canvas.drawBox(pos.x, pos.y, Vars.color_snake_head);
  }

  export function collision() {
    let is_success = true;
    Player.tail.forEach((e, i) => {
      if (i && i != Player.tail.length - 1 && e.x == Player.pos.x && e.y == Player.pos.y) is_success = false;
    })

    if (Player.isWall) {
      if (
        Player.pos.y < 0 ||
        Player.pos.x < 0 ||
        Player.pos.y > Vars.defaultSizeMap - 1 ||
        Player.pos.x > Vars.defaultSizeMap - 1
      ) is_success = false;
    }

    return is_success;
  }

  export function addScore(score=0) {
    if(!score) score = (Player.size + Player.speed) / 2 >> 0;
    Player.score += score;
    GUI.updateScore();
  }
}