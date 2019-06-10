namespace Canvas {
  export let canvas: HTMLCanvasElement;
  export let context: CanvasRenderingContext2D;
  let pixelRatio = window.devicePixelRatio;

  export function init(canvas_selector: string) {
    canvas = $(canvas_selector);
    canvas.width = (Vars.defaultSizeMap * Vars.blockSize + Vars.border * 2) * pixelRatio;
    canvas.height = canvas.width;

    // device scale
    canvas.style.width = (canvas.width / pixelRatio) + 'px';
    canvas.style.height = (canvas.height / pixelRatio) + 'px';

    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    first();
  }

  export function fill(color: string, x1 = 0, y1 = 0, x2 = canvas.width, y2 = canvas.height) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x1, y1, x2, y2);
    context.restore();
  }

  export function first() {
    fill(Vars.color_border);
    fill(
      Vars.color_background,
      Vars.border * pixelRatio,
      Vars.border * pixelRatio,
      canvas.width - Vars.border * 2 * pixelRatio,
      canvas.height - Vars.border * 2 * pixelRatio
    )
  }

  export function drawBox(x: number, y: number, color = "#000") {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(
      (Vars.border + x * Vars.blockSize) * pixelRatio,
      (Vars.border + y * Vars.blockSize) * pixelRatio,
      Vars.blockSize * pixelRatio,
      Vars.blockSize * pixelRatio
    );
    context.restore();
  }
}
