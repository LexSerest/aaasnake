namespace Swipe {
  enum Direction { Up = 38, Right = 37, Left = 39, Down = 40 }

  export function swipebind(element, f) {
    let xDown = null;
    let yDown = null;

    element.addEventListener('touchstart', evt => {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }, false);

    element.addEventListener('touchmove', evt => {
      if (!xDown || !yDown) return;

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
  
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        f(xDiff > 0 ? Direction.Right :  Direction.Left)
      } else {
        f(yDiff > 0 ? Direction.Up : Direction.Down)
      }
      
      xDown = null;
      yDown = null;
    }, false);
  }
}

namespace Keyboard {
  export enum Keys {
    Up = 38,
    Right = 37,
    Left = 39,
    Down = 40,
    Space = 32,
    Return = 13
  }

  export function bind_keydown(selector: HTMLElement, f: Function){
    selector.addEventListener('keydown', e => f(e.keyCode))
    Swipe.swipebind(selector, e => f(e))
  }  
}