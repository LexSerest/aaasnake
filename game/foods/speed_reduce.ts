import Player from '../libs/player';

export default {
  name: 'speed_reduce',
  text: 'Reduce speed',
  show_msg: true,
  repeatability: 1, // 1
  timeout: 30,
  func: () => {
    Player.speed -= 10;
    if (Player.speed < 0) Player.speed = 0;
  }
}