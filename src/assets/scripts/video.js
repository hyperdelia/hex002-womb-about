const MEDIA_PREVIEW_SELECTOR = '.video';
const MEDIA_PLAYER_ID = 'video-player';
const MEDIA_PLAYER_VISIBLE_CLASS = 'video-player--visible';
const MEDIA_PLAYER_BODY_VISIBLE_CLASS = 'video-player-visible';
const MEDIA_PLAYER_CONTENT_ID = 'video-player-content';

const OEMBED_ENDPOINT = 'https://noembed.com/embed?url=';

const embeds = {};

const playerElem = document.getElementById(MEDIA_PLAYER_ID);
const contentElem = document.getElementById(MEDIA_PLAYER_CONTENT_ID);

playerElem.addEventListener('click', hide);

function show(url) {
  playerElem.classList.add(MEDIA_PLAYER_VISIBLE_CLASS);
  document.body.classList.add(MEDIA_PLAYER_BODY_VISIBLE_CLASS);
  contentElem.innerHTML = embeds[url];
}

function hide() {
  playerElem.classList.remove(MEDIA_PLAYER_VISIBLE_CLASS);
  document.body.classList.remove(MEDIA_PLAYER_BODY_VISIBLE_CLASS);
  contentElem.innerHTML = '';
}

function createItem(elem, id, preview, html) {
  embeds[id] = html;
  elem.style.backgroundImage = 'url(' + preview + ')';
}

function prepare(elem) {
  const url = elem.dataset.url;

  fetch(OEMBED_ENDPOINT + url)
    .then(response => response.json())
    .then(data => {
      createItem(elem, url, data.thumbnail_url, data.html);
    });

  elem.addEventListener('click', () => {
    show(url);
  });
}

export default function prepareVideos() {
  const elems = document.querySelectorAll(MEDIA_PREVIEW_SELECTOR);
  [...elems].forEach(elem => prepare(elem));
}
