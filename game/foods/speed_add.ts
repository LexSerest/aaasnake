import Player from '../libs/player';

export default {
  name: 'speed_add',
  text: 'Add speed',
  show_msg: true,
  repeatability: 1, // 1
  timeout: 30,
  func: () => {
    Player.speed += 10;
  }
}