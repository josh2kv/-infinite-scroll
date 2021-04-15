/** @format */

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 10;
const apiKey = 'pZBUflGw8vsD4gIEj5hwnEvRpdU8Hmxw983zhE8jl4M';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let arrayOfPhotos = [];
let totalOfImages = 0;
let imagesLoaded = 0;
let ready = false;

function imageLoadingComplete() {
  imagesLoaded++;
  console.log('imagesLoaded', imagesLoaded);
  if (imagesLoaded === totalOfImages) {
    ready = true;
    console.log('ready', ready);
    loader.hidden = true;
  }
}

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayArrayOfPhotos(arrOfPhotos) {
  imagesLoaded = 0;
  totalOfImages = arrOfPhotos.length;
  console.log('totalOfImages', totalOfImages);
  arrOfPhotos.forEach((photo) => {
    const anchorElement = document.createElement('a');
    const imgElement = document.createElement('img');
    // anchorElement.setAttribute('href', photo.links.html);
    // anchorElement.setAttribute('target', '_blank');
    // imgElement.setAttribute('src', photo.urls.regular);
    // imgElement.setAttribute('alt', photo.alt_description);
    // imgElement.setAttribute('title', photo.alt_description);
    setAttribute(anchorElement, { href: photo.links.html, target: '_blank' });
    console.log('anchorElement', anchorElement);
    setAttribute(imgElement, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    console.log('imgElement', imgElement);

    imgElement.addEventListener('load', imageLoadingComplete);

    imageContainer.appendChild(anchorElement);
    imageContainer.appendChild(imgElement);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    arrayOfPhotos = await response.json();
    console.log('arrayOfPhotos', arrayOfPhotos);
    displayArrayOfPhotos(arrayOfPhotos);
  } catch (error) {
    console.log(error);
  }
}
// Window.innerHeight: the interior height of the window in pixels
// Window.scrollY: the number of pixels that the document is currently scrolled vertically
// HTMLElement.offsetHeight: the height of an element(body)
// 사진 (count * n)장이 출력된 전체 길이 - 1000 = 스크롤 끝에 도달하기 1000px전
// 처음 본 window + 스크롤 한 만큼 = 사용자가 그 동안 스크롤을 내려서 본 만큼의 길이
// 사용자가 스크롤을 내리다가 남은 스크롤이 1000보다 작아지고 이전에 요청했던 사진들이 로딩완료 됐으면 새로이 사진들을 요청하여 출력
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log('LOAD MORE');
  }
});

getPhotos();
