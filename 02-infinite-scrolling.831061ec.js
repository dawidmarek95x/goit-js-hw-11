!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},o={},t=n.parcelRequired7c6;null==t&&((t=function(e){if(e in a)return a[e].exports;if(e in o){var n=o[e];delete o[e];var t={id:e,exports:{}};return a[e]=t,n.call(t.exports,t,t.exports),t.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},n.parcelRequired7c6=t);var i,s,l,r,c=t("iwbpK"),f=t("iU1Pc"),d=t("5IjG7"),u=function(e){return document.querySelector(e)},_=u(".search-form"),p=u(".search-form__input"),g=u(".gallery");function m(){(0,c.fetchImages)(p.value,i).then((function(n){!function(n){var a=n.hits,o=n.totalHits;l=o;var t=a.map((function(e){var n=e.webformatURL,a=e.largeImageURL,o=e.tags,t=e.likes,i=e.views,s=e.comments,l=e.downloads;return'\n  <div class="gallery__item">\n    <a class="gallery__link" href="'.concat(a,'"><img class="gallery__img" src="').concat(n,'" alt="').concat(o,'" loading="lazy" /></a>\n    <div class="gallery__info">\n      <p class="info__item">\n        <b class="info__label">Likes</b>\n        <span class="info__data">').concat(t,'</span>\n      </p>\n      <p class="info__item">\n        <b class="info__label">Views</b>\n        <span class="info__data">').concat(i,'</span>\n      </p>\n      <p class="info__item">\n        <b class="info__label">Comments</b>\n        <span class="info__data">').concat(s,'</span>\n      </p>\n      <p class="info__item">\n        <b class="info__label">Downloads</b>\n        <span class="info__data">').concat(l,"</span>\n      </p>\n    </div>\n  </div>\n  ")})).join("");g.insertAdjacentHTML("beforeend",t),"object"==typeof r&&r.destroy();r=new(e(d))(".gallery__item a"),0===(s+=a.length)?e(f).Notify.failure("Sorry, there are no images matching your search query. Please try again."):s>0&&1===i?e(f).Notify.success("Hooray! We found ".concat(l," images.")):s>0&&s===l&&e(f).Notify.info("We're sorry, but you've reached the end of search results.");if(i>1){var c=document.querySelector(".gallery .gallery__item").getBoundingClientRect().height;window.scrollBy({top:2*c,behavior:"smooth"})}l===s?window.removeEventListener("scroll",y,{passive:!0}):window.addEventListener("scroll",y,{passive:!0})}(n)})).catch((function(e){return console.log(e)}))}function y(){var e=document.documentElement,n=e.scrollTop,a=e.scrollHeight;e.clientHeight+n>=a-5&&(i+=1,m())}_.addEventListener("submit",(function(e){e.preventDefault(),i=1,s=0,m(),g.innerHTML=""}))}();
//# sourceMappingURL=02-infinite-scrolling.831061ec.js.map