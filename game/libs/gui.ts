import { $, $$ } from "../helpers/helpers";
import Keyboard from './keyboard';
import Player from './player';
import Snake from './snake';
import SnakeFoods from '../foods/index';
import SnakeFood from './snakeFood';


namespace GUI {
  export let timers: Element = $('#timers');
  export let _timers = {};
  export let ingame = 0;

  export function init(){
    _timers = {};
  }

  setInterval(e => {
    if (!Snake.isPause && Snake.isStart) ingame++
  }, 1000);

  export function addTimer(color: string, duration: number, func: Function) {
    if (_timers[color]) {
      _timers[color].element.remove()
    }

    let element = document.createElement('div');
    element.setAttribute('class', 'timer');
    element.style.background = color;
    element.style.width = '100%';

    timers.append(element);

    _timers[color] = { element, duration, func, keep: duration }
  }
  export function reduceTimer(color){
    let t = _timers[color];
    
    let percent = ( --t.keep / t.duration * 100 ) >> 0;  
    t.element.style.width = (percent).toString() + '%';

    if(t.keep <= 0) {
      t.element.remove();
      t.func();
      delete _timers[color];
    }
  }

  export function reduceTimerAll(){
    Object.keys(_timers).forEach(e => reduceTimer(e));
  }

  export function clearTimer() {
    timers.innerHTML = '';
  }

  export function legendInit() {
    $('.legends').innerHTML = '';



    SnakeFoods.forEach(food => {
      if(food.notLegend) return;

      let div = document.createElement('div');
      let eat = document.createElement('div');
      let span = document.createElement('span');
      eat.classList.add('eat');

      if (food.pseudo) {
        eat.classList.add('pseudo')
      } else {
        if (food.color) {
          eat.style.background = food.color
        } else {
          eat.classList.value = "eat notopens notopen";
          eat.setAttribute('data-name', food.name);
        }
      }

      span.innerText = food.text;

      div.append(eat);
      div.append(span);

      $('.legends').append(div);

    })
  }

  export function legendOpen(name, color) {
    let el: HTMLElement = $('.notopen.notopens[data-name="' + name + '"]');
    if (!el) return;

    if(SnakeFood.foods_type[name].rndColor) return;
    el.classList.remove('notopen');
    el.style.background = color;
  }

  export function legengReset() {
    $$('.notopens').forEach(e => {
      e.classList.add('notopen');
      e.style.background = 'transparent';
    })
  }

  export function window_open(name) {
    $('#windows').setAttribute('data-show', name);
  }

  export function updateScore() {
    $$('.score span').forEach(e => e.innerHTML = Player.getScore());
  }

  export function updateTime() {
    let m = (ingame / 60) % 60 >> 0;
    let h = ingame / 60 / 60 >> 0;
    let s = ingame % 60;
    let info = (h ? h + 'h' : '') + (m ? m + 'm' : '') + s + 's';
    $$('.ingame span').forEach(e => e.innerHTML = info)
  }

  export function bestShow() {
    $$('.best span').forEach(e => e.innerHTML = (+localStorage.getItem("best") || 0));
  }

  export function updateBest() {
    if ((+localStorage.getItem("best") || 0) < Player.getScore()) {
      localStorage.setItem("best", Player.getScore().toString());
      $$('.best span').forEach(e => e.innerHTML = Player.getScore())
    }
  }

  export function resetBest() {
    localStorage.setItem('best', '0');
    $$('.best span').forEach(e => e.innerHTML = '0')
  }

  export function swipeToggle(setState = undefined) {
    let isset = typeof setState == 'undefined';
    if (isset) {
      setState = $('#mobile').getAttribute('data-type') == 'swipe';
    }

    Keyboard.setSwipe(!setState);
    if (isset) localStorage.setItem('swipemode', (+setState).toString())
    $('#mobile').setAttribute('data-type', setState ? 'buttons' : 'swipe');
  }


  export function addMessage(text: string, color = '#fff') {
    let element = document.createElement('div');
    element.classList.add('message');
    element.classList.add('show');
    element.innerText = text;
    element.style.color = color;

    $('.messages').append(element)
    setTimeout(e => element.remove(), 3000)
  }

}


export default GUI;