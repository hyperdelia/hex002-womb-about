import { generateMobile } from './shapes';
import preloadImage from './preload';

const RESOURCES_URL = 'https://world.inanimate.world';

const SHAPE_SIZE = 500;
const SHAPE_ELEM_IDS = [
  'shape-left',
  'shape-right',
];

// Generate random shapes and display them
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

// Add images to content
const imageElems = document.querySelectorAll('.image');

[...imageElems].forEach(elem => {
  const { url } = elem.dataset;

  elem.classList.add('image--loading');
  preloadImage(url)
    .then(imgElem => {
      elem.classList.remove('image--loading');
      elem.classList.add('image--ready');
      elem.appendChild(imgElem);
    });
});
