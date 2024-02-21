/* eslint-disable no-param-reassign */
// * Taken from p5 library https://github.com/processing/p5.js/blob/main/src/image/filters.js
const invertColors = (pixels) => {
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255 - pixels[i];
    pixels[i + 1] = 255 - pixels[i + 1];
    pixels[i + 2] = 255 - pixels[i + 2];
  }
};

// * Taken from p5 library https://github.com/processing/p5.js/blob/main/src/image/filters.js
const thresholdFilter = (pixels, level) => {
  if (level === undefined) {
    level = 0.5;
  }
  const thresh = Math.floor(level * 255);
  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];

    const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    let value;
    if (gray >= thresh) {
      value = 255;
    } else {
      value = 0;
    }
    // eslint-disable-next-line no-multi-assign
    pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
  }
};

// * Taken from p5 library https://github.com/processing/p5.js/blob/main/src/image/filters.js
const grayscaleFilter = (pixels) => {
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // CIE luminance for RGB
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // eslint-disable-next-line no-multi-assign
    pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
  }
};

const preprocessImage = (canvas, greyscale, threshold) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);

  invertColors(image.data);
  if (greyscale) {
    grayscaleFilter(image.data);
  }
  if (threshold) {
    thresholdFilter(image.data, 0.48);
  }

  return image;
};

export const canvasPreview = (image, canvas, crop, scale, greyscale, threshold) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);

  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  // * Apply preprocessing
  ctx.putImageData(preprocessImage(canvas, greyscale, threshold), 0, 0);

  ctx.restore();
};

export default {};
