export default function preloadImage(path) {
  return new Promise((resolve, reject) => {
    const imgElem = document.createElement('img');

    imgElem.onload = () => {
      resolve(imgElem); 
    };
    imgElem.onerror = reject;

    imgElem.src = path;
  });
}
