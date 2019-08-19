import Player from '../libs/player';

export default {
  name: 'size_reduce',
  text: 'Reduce size',
  show_msg: true,
  repeatability: 1, // 1
  timeout: 30,
  func: () => {
    Player.size -= 5;
    if (Player.size < 4) Player.size = 4;
  }
}