
<!-- @format -->

# Infinite Scroll

## 1. 소개 및 특징

- unsplash API로 사진들을 10장씩 무작위로 요청 받아 출력 (https://unsplash.com/)
- 스크롤을 내리다가 맨 아래 끝에 가까워지면 스크롤이 맨 아래 닿기 전에 다시 사진 10장을 요청하고 받아 그 아래에 추가
- loading spinner: customized SVG파일를 다운로드 받아 삽입 (https://loading.io/)
- 반응형

## 2. 사용기술

- HTML
- CSS
- JavaScript

## 3. 학습후기

1. for...in 구문을 이용한 반복적 속성삽입작업 처리

```javascript
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
setAttribute(anchorElement, { href: photo.links.html, target: '_blank' });
```

2. 무한 스크롤 구현

- 사용자가 스크롤을 내리다가 남은 스크롤 길이가 1000보다 작아지고 이전에 요청했던 사진들이 로딩완료 됐으면 새로이 사진들을 요청하여 출력
  - 처음 본 window + 스크롤 한 만큼 = 사용자가 그 동안 스크롤을 내려서 본 만큼의 길이
  - 사진 (count \* n)장이 출력된 전체 길이 - 1000 = 스크롤 끝에 도달하기 1000px전  
* imageLoadingComplete() 함수와 ready 변수로 요청한 사진이 전부 로드되었는지 확인  
<br/>
  > **Window.innerHeight** : the interior height of the window in pixels  
  >  **Window.scrollY** : the number of pixels that the document is currently scrolled vertically  
  >  **HTMLElement.offsetHeight** : the height of an element(body)  
  >  Source: https://developer.mozilla.org/ 


```javascript
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
```
<br/>
https://josh2kv.github.io/-infinite-scroll/

![image](https://user-images.githubusercontent.com/79514508/114887905-71066380-9dce-11eb-9b93-f719b6a3383d.png)
