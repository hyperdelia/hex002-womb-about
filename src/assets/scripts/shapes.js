import catmullRomSpline from 'svg-catmull-rom-spline';

import { randomRange, randomItem } from './utils';

const SHAPE_RANDOMNESS = 0.1;
const SHAPE_SMOOTHING = 4;

function svgNode(name, attrs = {}) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.keys(attrs).forEach(key => {
    node.setAttributeNS(null, key, attrs[key]);
  });
  return node;
}

function generateRandomShape(options) {
  const { width, height, x, y } = options;

  const shapeWidth = width / 2;
  const shapeHeight = height / 2;

  const rectangle = [
    {
      x: shapeWidth,
      y: shapeHeight / 2,
    },
    {
      x: shapeWidth,
      y: shapeHeight / 4,
    },
    {
      x: shapeWidth,
      y: 0,
    },
    {
      x: (shapeWidth / 4) * 3,
      y: 0,
    },
    {
      x: shapeWidth / 2,
      y: 0,
    },
    {
      x: shapeWidth / 4,
      y: 0,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: 0,
      y: shapeHeight / 4,
    },
    {
      x: 0,
      y: shapeHeight / 2,
    },
    {
      x: 0,
      y: (shapeHeight / 4) * 3,
    },
    {
      x: 0,
      y: shapeHeight,
    },
    {
      x: shapeWidth / 4,
      y: shapeHeight,
    },
    {
      x: shapeWidth / 2,
      y: shapeHeight,
    },
    {
      x: (shapeWidth / 4) * 3,
      y: shapeHeight,
    },
    {
      x: shapeWidth,
      y: shapeHeight,
    },
    {
      x: shapeWidth,
      y: (shapeHeight / 4) * 3,
    },
  ];

  const randomShape = rectangle.map(point => {
    point.x += randomRange(-shapeWidth, shapeWidth) * SHAPE_RANDOMNESS;
    point.y += randomRange(-shapeHeight, shapeHeight) * SHAPE_RANDOMNESS;
    return [point.x + (shapeWidth / 2) + x, point.y + (shapeHeight / 2) + y];
  });

  return catmullRomSpline.toPath(randomShape, SHAPE_SMOOTHING, true);
}

export function generateMobile(options) {
  const { width, height, shapeCount, textures } = options;

  const shapeWidth = width;
  const shapeHeight = height / shapeCount;

  const svg = svgNode('svg', { width, height: (shapeHeight * (shapeCount + 1)) / 2 });
  const defs = svgNode('defs');

  for (let i = 0; i < shapeCount; i += 1) {
    const position = (shapeHeight / 2) * i;

    // Pick a random texture
    const href = randomItem(textures);

    // Generate a random shape path
    const smoothRandomShape = generateRandomShape({
      width: shapeWidth,
      height: shapeHeight,
      x: randomRange(-10, 10),
      y: position,
    });

    // Create clip paths
    const clipPathId = `clip-${(i + 1)}`;
    const clipPath = svgNode('clipPath', { id: clipPathId });
    const path = svgNode('path', { d: smoothRandomShape });
    clipPath.appendChild(path);
    defs.appendChild(clipPath);

    // Add image with clip mask
    const image = svgNode('image', {
      'clip-path': `url(#${clipPathId})`,
      href,
      height: shapeHeight,
      width: shapeWidth,
      x: 0,
      y: position,
    });

    svg.appendChild(image);
  }

  svg.appendChild(defs);

  return svg;
}
