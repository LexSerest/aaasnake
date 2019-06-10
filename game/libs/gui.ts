namespace GUI {
  let timers: Element = $('#timers');
  let _timers = {};

  export function addTimer(color: string, duration: number){
    if(_timers[color]){
      clearTimeout(_timers[color]._timer);
      _timers[color].element.remove()
    } 

    let element = document.createElement('div');
    element.setAttribute('class', 'timer');
    element.style.background = color;
    element.style.animationDuration = duration + 's';

    timers.append(element);

    let _timer = setTimeout(() => {
      element.remove();
      delete _timers[color];
    }, duration * 1000)

    _timers[color] = { _timer, element }
  }

  export function clearTimer(){
    timers.innerHTML = '';
  }

  export function legendOpen(name, color){
    let el: HTMLElement = $('.notopen.notopens[data-name="'+ name +'"]');
    if(!el) return;
    el.classList.remove('notopen');
    el.style.background = color;
  }

  export function legengReset(){
    $$('.notopens').forEach(e => {
      e.classList.add('notopen');
      e.style.background = 'transparent';
    })
  }

  export function window_open(name){
    $('#windows').setAttribute('data-show', name);
  }

  export function updateScore(){
    $$('.score span').forEach(e => e.innerHTML = Player.score);
  }

  export function bestShow(){
    $$('.best span').forEach(e => e.innerHTML = (localStorage.getItem("best") || 0));
  }

  export function updateBest(){
    if(+localStorage.getItem("best") < Player.score){
      localStorage.setItem("best", Player.score.toString());
      $$('.best span').forEach(e => e.innerHTML = Player.score)
    }
  }
}
