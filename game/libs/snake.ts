enum Direction { Up, Right, Down, Left }

namespace Snake {
  export let isStart = true;
  export let isPause = false;
  export let isLockKeyboard = false;

  export let onStart: Function = null;
  export let onEnd: Function = null;
  export let onEat: Function = null;
  export let onPause: Function = null;
  let _timer = null;
  let _lastKeysPress = [];

  export function init(canvas_selector: string) {
    Canvas.init(canvas_selector);
    GUI.bestShow();
    Keyboard.bind_keydown($('body'), e => {
      if (Keyboard.Keys.Return == e) start()
      if (Keyboard.Keys.Space == e) pause()

      if(Keyboard.Keys.Up != e &&
        Keyboard.Keys.Down != e &&
        Keyboard.Keys.Left != e &&
        Keyboard.Keys.Right != e) return;

      let last = _lastKeysPress[_lastKeysPress.length - 1];
      if(last == e || 
        (Keyboard.Keys.Up == e && last == Direction.Down) ||
        (Keyboard.Keys.Down == e && last == Direction.Up) ||
        (Keyboard.Keys.Left == e && last == Direction.Right) ||
        (Keyboard.Keys.Right == e && last == Direction.Left)
      ) return;

      _lastKeysPress.splice(3);
      _lastKeysPress.push(e)

    })
  }

  export function changeDirection(e){
    if (
      (Keyboard.Keys.Up == e && Player.direction == Direction.Down) ||
      (Keyboard.Keys.Down == e && Player.direction == Direction.Up) ||
      (Keyboard.Keys.Left == e && Player.direction == Direction.Right) ||
      (Keyboard.Keys.Right == e && Player.direction == Direction.Left)
    ) return;
    Player.direction = Direction[Keyboard.Keys[e]];
  }



  export function run() {
    clearTimeout(_timer);
    _timer = setTimeout(() => {
      let e = _lastKeysPress.shift();
      if(e) changeDirection(e);
      Snake.move();
      if (isStart) run();
    }, 300 - Player.speed * 5)
  }

  export function addScore(score) {
    Player.score += score;
    GUI.updateScore();
  }

  export function pause() {
    if (!isStart) return;
    GUI.window_open('hide')
    if (isPause)
      run();
    else
      clearTimeout(_timer);

    isPause = !isPause;

    if (onPause) onPause(isPause, isStart);
  }

  export function draw() {
    isLockKeyboard = false;
    Player.draw()
    SnakeFoods.foods.forEach(e => Canvas.drawBox(e.x, e.y, SnakeFoods.get_color(e.name)))
  }

  export function end() {
    isStart = false;
    if (onEnd) onEnd();
    GUI.updateBest();
  }

  export function start() {
    if (onPause && isPause) {
      isPause = false;
      onPause(false);
    }
    
    Vars.set_default();
    Player.set_default();
    SnakeFoods.foods_init(SnakeFoodsTypes.foods);
    Canvas.first();

    isStart = true;
    SnakeFoods.clear();
    SnakeFoods.rndFood('eat');

    run();
    GUI.window_open('hide')

    if (onStart) onStart();
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
    if(!Player.collision()) return end();
    SnakeFoods.eat_event(Player.pos, onEat);
    draw();
  }

}