/// <reference path="libs/libs.ts"/>
/// <reference path="vars.ts"/>
/// <reference path="libs/canvas.ts"/>
/// <reference path="libs/snake.ts"/>
/// <reference path="libs/player.ts"/>
/// <reference path="libs/gui.ts"/>
/// <reference path="libs/keyboard.ts"/>
/// <reference path="libs/snakeFood.ts"/>
/// <reference path="eats_types.ts"/>


Snake.onStart = function(){
  GUI.updateScore();
  GUI.legengReset();
  GUI.clearTimer();
}

Snake.onEnd = function(){
  GUI.window_open('endgame');
  GUI.clearTimer();
}

Snake.onEat = function(food: FoodType){
  if(food.disable_time) GUI.addTimer(food.color, food.disable_time);
  GUI.legendOpen(food.name, food.color);
}

Snake.onPause = function(isPause, isStart) {
  if(!isStart) return;
  if(isPause) GUI.window_open('pause');
  else GUI.window_open('hide');
}

function start(){
  GUI.window_open('hide');
  Snake.start();
}

function unpause(){
  Snake.isPause &&  Snake.pause()
}

Snake.init('#snake');