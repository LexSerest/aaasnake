import { Keys } from '../helpers/enum';


namespace Keyboard {
  export let swipeEnabled = true;

  export function swipebind(element: HTMLElement, f: Function) {
    let xDown = null;
    let yDown = null;

    // swipe
    element.addEventListener('touchstart', evt => {
      if (!swipeEnabled) return;
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
        f(xDiff > 0 ? Keys.Right : Keys.Left)
      } else {
        f(yDiff > 0 ? Keys.Up : Keys.Down)
      }

      xDown = null;
      yDown = null;
    }, false);
  }

  export function doubletap(element: HTMLElement, f: Function) {
    var lastTap = 0;

    element.addEventListener('touchend', function (event) {
      var currentTime = new Date().getTime();
      var tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        event.preventDefault()
        f(Keys.Space);
      }
      lastTap = currentTime;
    });
  }

  export function setSwipe(status = true) {
    swipeEnabled = status
  }

  export function init_keyboard(element: HTMLElement, f: Function) {
    element.addEventListener('keydown', e => f(e.keyCode))
    swipebind(element, e => f(e))
  }

  export function init_doubletap(element: HTMLElement, f: Function) {
    doubletap(element, e => f(e))
  }


}

export default Keyboard;