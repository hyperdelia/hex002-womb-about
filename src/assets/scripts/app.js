import { generateMobile } from './shapes';

const RESOURCES_URL = 'https://world.inanimate.world';

const SHAPE_SIZE = 500;
const SHAPE_ELEM_IDS = [
  'shape-left',
  'shape-right',
];

fetch(RESOURCES_URL)
  .then(response => {
    return response.json();
  })
  .then(json => {
    const textures = json.textures.mobile.map(url => RESOURCES_URL + url);

    SHAPE_ELEM_IDS.forEach(id => {
      const node = document.getElementById(id);
      createBackground(textures, node);
    });
  })
  .catch(error => {
    throw new Error(error);
  });

function createBackground(textures, node) {
  const mobile = generateMobile({
    width: SHAPE_SIZE,
    height: 3000,
    shapeCount: 4,
    textures,
  });

  node.appendChild(mobile);
}
