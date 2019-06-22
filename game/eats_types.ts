/// <reference path="vars.ts"/>

namespace SnakeFoodsTypes {
  export let foods: FoodType[] = [
    {
      name: 'eat',
      color: Vars.color_food,
      repeatability: 1,
      func: () => {
        Player.inc();
        Player.addScore();
        SnakeFoods.addFood('eat');
        setTimeout(e => SnakeFoods.addFood('feces', Player.pos), 100)

        SnakeFoods.addFood('border_off')
        SnakeFoods.addFood('speed_reduce')
        SnakeFoods.addFood('size_reduce')
        SnakeFoods.addFood('speed_add')
        SnakeFoods.addFood('size_add')
        SnakeFoods.addFood('speed_reduce')
        SnakeFoods.addFood('bonus_x2')
        SnakeFoods.addFood('bonus_1000')
        SnakeFoods.addFood('manyfood')
        SnakeFoods.addFood('clearwall')
        SnakeFoods.addFood('hell')
        SnakeFoods.addFood('exithell')

        Snake.snake();
      }
    },
    {
      name: 'simple_food',
      color: Vars.color_food,
      repeatability: .8,
      func: () => {
        Player.inc();
        Player.addScore();
      }
    },
    {
      name: 'manyfood',
      repeatability: 0.05,
      timeout: 30,
      disable_time: 15,
      disabled: () => SnakeFoods.remove_food('simple_food'),
      func: () => {
        for (let i = 0; i < 10; i++) SnakeFoods.addFood('simple_food');
      }
    },
    {
      name: 'clearwall',
      repeatability: 0.05,
      timeout: 30,
      func: () => SnakeFoods.remove_food('feces')
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
        Snake.snake()
      },
      func: () => {
        Player.isWall = false;
        Vars.color_border = '#C0C5CE';
        Canvas.first()
        Snake.snake()
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
      name: 'bonus_x2',
      repeatability: 0.05,
      timeout: 30,
      func: () => {
        Player.addScore(Player.score);
      }
    },
    {
      name: 'bonus_1000',
      repeatability: 0.05,
      timeout: 30,
      func: () => {
        Player.addScore(1000);
      }
    },
    {
      name: 'feces',
      color: Vars.color_border,
      repeatability: 0.6,
      func: () => Snake.end()
    },
    {
      name: 'hell',
      repeatability: 0.05,
      timeout: 30,
      isOne: true,
      func: () => {
        Vars.set_default();
        SnakeFoods.foods_init(SnakeFoodsTypes.foods);
        GUI.clearTimer();
        setTimeout(e => GUI.legengReset(), 100);
        setTimeout(e => GUI.clearTimer(), 100);
        setTimeout(e => SnakeFoods.foods_type['hell'].isDisable = true, 100);
        setTimeout(e => SnakeFoods.foods_type['exithell'].isDisable = false, 100);
        Player.isWall = true;

        Vars.color_border = '#463434';
        Vars.color_background = '#baa7a7';
        Vars.color_snake = '#664f4f';
        Vars.color_snake_head = '#5a4747';
        SnakeFoods.foods_type['feces'].repeatability = 1;
        Canvas.first();  

        SnakeFoods.clear();
        SnakeFoods.addFood('eat');
        Snake.snake();
      }
    },
    {
      name: 'exithell',
      repeatability: 0.05,
      timeout: 30,
      isOne: true,
      isDisable: true,
      func: () => {
        Vars.set_default();
        setTimeout(e => GUI.clearTimer(), 100);
        setTimeout(e => SnakeFoods.foods_type['hell'].isDisable = false, 100);
        setTimeout(e => SnakeFoods.foods_type['exithell'].isDisable = true, 100);
        Player.isWall = true;
        SnakeFoods.foods_type['feces'].repeatability = 0.6
        Canvas.first();  
        Snake.snake();
      }
    }
  ]
}