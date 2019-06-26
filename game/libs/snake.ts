enum Direction { Up, Right, Down, Left }

namespace Snake {
  export let isStart = false;
  export let isPause = false;
  export let isLockKeyboard = false;

  export let onStart: Function = null;
  export let onEnd: Function = null;
  export let onEat: Function = null;
  export let onPause: Function = null;
  let _timer = null;
  let _lastKeysPress = [];

  function testDirection(e) {
    if ((Keyboard.Keys.Up == e && Player.direction == Direction.Down) ||
      (Keyboard.Keys.Down == e && Player.direction == Direction.Up) ||
      (Keyboard.Keys.Left == e && Player.direction == Direction.Right) ||
      (Keyboard.Keys.Right == e && Player.direction == Direction.Left) ||
      (Keyboard.Keys.Up == e && Player.direction == Direction.Up) ||
      (Keyboard.Keys.Down == e && Player.direction == Direction.Down) ||
      (Keyboard.Keys.Left == e && Player.direction == Direction.Right) ||
      (Keyboard.Keys.Right == e && Player.direction == Direction.Left)
    )
      return true
  }

  export function keyboardEvent(e) {
    if (Keyboard.Keys.Return == e) start()
    if (Keyboard.Keys.Space == e) pause()

    if (Keyboard.Keys.Up != e &&
      Keyboard.Keys.Down != e &&
      Keyboard.Keys.Left != e &&
      Keyboard.Keys.Right != e) return;

    if (!isStart || isPause) return;
    let last = _lastKeysPress[_lastKeysPress.length - 1] || Player.direction;
    if (last == e ||
      (Keyboard.Keys.Up == e && last == Direction.Down) ||
      (Keyboard.Keys.Down == e && last == Direction.Up) ||
      (Keyboard.Keys.Left == e && last == Direction.Right) ||
      (Keyboard.Keys.Right == e && last == Direction.Left) ||
      (Keyboard.Keys.Up == e && last == Direction.Up) ||
      (Keyboard.Keys.Down == e && last == Direction.Down) ||
      (Keyboard.Keys.Left == e && last == Direction.Left) ||
      (Keyboard.Keys.Right == e && last == Direction.Right)
    ) return;

    if (_lastKeysPress.length < 3) _lastKeysPress.push(e);
  }

  export function init(canvas_selector: string) {
    Canvas.init(canvas_selector);
    GUI.bestShow();
    Keyboard.bind_keydown($('body'), e => keyboardEvent(e))
  }

  export function changeDirection(e) {
    if (testDirection(e)) return;
    Player.direction = Direction[Keyboard.Keys[e]];
  }



  export function run() {
    clearTimeout(_timer);
    _timer = setTimeout(() => {
      let e = _lastKeysPress.shift();
      if (e) {
        changeDirection(e);
      }
      if (isStart) {
        Snake.move();
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

    if (onPause) onPause(isPause, isStart);
  }

  export function snake() {
    Canvas.first()
    Player.draw();
    SnakeFoods.draw();
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
    SnakeFoods.addFood('eat');

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

    if (!isStart || !Player.collision()) return end();
    SnakeFoods.eat_event();
    if (!isStart) Player.pos = Player.tail.shift();
    snake();
  }

}