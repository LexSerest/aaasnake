/// <reference path="vars.ts"/>

namespace SnakeFoodsTypes {
  export let foods = [
    {
      name: 'eat',
      color: Vars.color_food,
      repeatability: 1,
      func: () => {
        Player.size++;
        Player.speed++;
        Snake.addScore((Player.size + Player.speed) / 2 >> 0)

        SnakeFoods.rndFood('eat');
        SnakeFoods.rndFood('wall')

        SnakeFoods.rndFood('border_off')
        SnakeFoods.rndFood('teleport')
        SnakeFoods.rndFood('speed_reduce')
        SnakeFoods.rndFood('size_reduce')
        SnakeFoods.rndFood('speed_add')
        SnakeFoods.rndFood('size_add')
        SnakeFoods.rndFood('speed_reduce')
        SnakeFoods.rndFood('bonus')
        SnakeFoods.rndFood('manyfood')
        SnakeFoods.rndFood('clearwall')
      }
    },
    {
      name: 'teleport_elem',
      color: '#000',
      isNotEat: true,
      func: (info) => {
        SnakeFoods.foods.forEach(e => {
          if ((e.x == info.x && e.y == info.y) || e.name != 'teleport_elem') return;
          if (Player.direction == Direction.Down || Player.direction == Direction.Up) {
            Player.pos.y = e.y + (Player.direction == Direction.Down ? 1 : -1);
            Player.pos.x = e.x;
          }
          if (Player.direction == Direction.Left || Player.direction == Direction.Right) {
            Player.pos.x = e.x + (Player.direction == Direction.Left ? 1 : -1);
            Player.pos.y = e.y;
          }
        })
      }
    },
    {
      name: 'teleport',
      repeatability: 0.05,
      timeout: 30,
      disable_time: 60,
      disabled: () => {
        SnakeFoods.remove_food('teleport_elem')
        SnakeFoods.enable_food('teleport');
      },
      func: () => {
        SnakeFoods.rndFood('teleport_elem');
        SnakeFoods.rndFood('teleport_elem');
        SnakeFoods.disable_food('teleport');
      }
    },
    {
      name: 'simple_food',
      color: Vars.color_food,
      repeatability: .8,
      func: () => {
        Player.size++;
        Player.speed++;
        Snake.addScore((Player.size + Player.speed) / 2 >> 0)
      }
    },
    {
      name: 'manyfood',
      repeatability: 0.05,
      timeout: 30,
      disable_time: 15,
      disabled: () => SnakeFoods.remove_food('simple_food'),
      func: () => {
        for (let i = 0; i < 10; i++) SnakeFoods.rndFood('simple_food');
      }
    },
    {
      name: 'clearwall',
      repeatability: 0.05,
      timeout: 30,
      func: () => SnakeFoods.remove_food('wall')
    },
    {
      name: 'border_off',
      repeatability: 0.05,
      timeout: 30,
      disable_time: 60,
      disabled: () => {
        Player.isWall = true;
        Vars.color_border = DefaultVars.color_border;
        Canvas.first()
        Snake.draw()
      },
      func: () => {
        Player.isWall = false;
        Vars.color_border = '#C0C5CE';
        Canvas.first()
        Snake.draw()
      }
    },
    {
      name: 'speed_reduce',
      repeatability: 0.05,
      timeout: 30,
      func: () => {
        Player.speed -= 5;
        if (Player.speed < 0) Player.speed = 0;
      }
    },
    {
      name: 'size_reduce',
      repeatability: 0.05,
      timeout: 30,
      func: () => {
        Player.size -= 5;
        if (Player.size < 4) Player.size = 4;
      }
    },
    {
      name: 'speed_add',
      repeatability: 0.05,
      timeout: 30,
      func: () => {
        Player.speed += 5;
      }
    },
    {
      name: 'size_add',
      repeatability: 0.05,
      timeout: 30,
      func: () => {
        Player.size += 5;
      }
    },
    {
      name: 'bonus',
      repeatability: 0.05,
      timeout: 30,
      func: () => {
        Snake.addScore(Player.score);
      }
    },
    {
      name: 'wall',
      color: Vars.color_border,
      repeatability: 0.6,
      func: () => Snake.end()
    }
  ]
}
/* 
{
  name: 'border_off_alltime',
  repeatability: 0.03,
  isDisable: true,
  timeout: 30,
  isOne: true,
  func: () => {
    Player.isWall = false;
    Vars.color_border = '#C0C5CE';
    Canvas.first()
    SnakeFoods.disable_food('border_off')
  }
},
{
  name: 'resize_map',
  repeatability: 0.03,
  timeout: 30,
  isOne: true,
  isDisable: true,
  func: () => {
    Vars.defaultSizeMap = 25;
    Vars.blockSize = 12;
    Canvas.first();
    Snake.draw();
  }
}, */