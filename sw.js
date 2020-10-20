var cacheStorageKey = 'cachesName';
var cacheList = [
  // 注册成功后要立即缓存的资源列表
  'https://cdn.bootcss.com/jquery/1.10.2/jquery.min.js',
  './css/common.css',
  './css/fonts/iview.css',
  './css/flex-table.scss',
  './css/fonts/ionicons.svg',
  './css/fonts/ionicons.ttf',
  './css/fonts/ionicons.woff',
  './css/fonts/ionicons.woff2',
  './public/jquery-1.12.4.min.js',
  './public/axios.js',
  './public/base-head.js',
  './public/base-page.js',
  './public/base-title.js',
  './public/function.js',
  './public/http.js',
  './public/iview.js',
  './public/vue.js',
  './img/topCode.png',
  './img/ycsBack.png',
  './index.js',
  './index.html',
  './html/resultEntry.html',
  './js/resultEntry.js',
]

// 当浏览器解析完 SW 文件时触发 install 事件
self.addEventListener('install', function(e) {
  var _this = this
  // install 事件中一般会将 cacheList 中要换存的内容通过 addAll 方法，请求一遍放入 caches 中
  //https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
  e.waitUntil(
    caches.open(_this.cacheStorageKey).then(function(cache) {
      if(!_this.cacheStorageKey) {
        location.reload();
      }
      return cache.addAll(_this.cacheList)
    })
  );
});

// 激活时触发 activate 事件
self.addEventListener('activate', function(e) {
  var _this = this
  // active 事件中通常做一些过期资源释放的工作，匹配到就从 caches 中删除
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(name => {
      if(!_this.cacheStorageKey) {
        location.reload();
      }
      if (name !== _this.cacheStorageKey) {
        return caches.delete(name);
      } else {
        return Promise.resolve();
      }
    }));
  });

  e.waitUntil(
    Promise.all([cacheDeletePromises])
  );
});

// self.addEventListener('fetch', function(e) {
//   console.log("fetch",e.request.url);
//   if(e.request.url === "https://fomenyesu.github.io/service-worker-demo/api.json"){
//     // 在此编写缓存策略
//     e.respondWith(
//       // 可以通过匹配缓存中的资源返回
//       // caches.match(e.request)
//       // // 也可以从远端拉取
//       fetch(e.request.url)
//       // // 也可以自己造
//       // new Response('自己造')
//       // 也可以通过吧 fetch 拿到的响应通过 caches.put 方法放进 caches
//     );
//   }else{
//     // 在此编写缓存策略
//     e.respondWith(
//       // 可以通过匹配缓存中的资源返回
//       // caches.match(e.request)
//       // // 也可以从远端拉取
//       fetch(e.request.url)
//       // // 也可以自己造
//       // new Response('自己造')
//       // 也可以通过吧 fetch 拿到的响应通过 caches.put 方法放进 caches
//     );
//   }
// });

self.addEventListener('fetch', function(e) {
  console.log('Fetch event ' + cacheStorageKey + ' :', e.request.url);
  e.respondWith( // 该策略先从网络中获取资源，如果获取失败则再从缓存中读取资源
    fetch(e.request.url)
    .then(function (httpRes) {

      // 请求失败了，直接返回失败的结果
      if (!httpRes || httpRes.status !== 200) {
          // return httpRes;
          return caches.match(e.request)
      }

      // 请求成功的话，将请求缓存起来。
      var responseClone = httpRes.clone();
      caches.open(cacheStorageKey).then(function (cache) {
          return cache.delete(e.request)
          .then(function() {
              cache.put(e.request, responseClone);
          });
      });

      return httpRes;
    })
    .catch(function(err) { // 无网络情况下从缓存中读取
      console.error(err);
      return caches.match(e.request);
    })
  )
})

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.getRegistrations().then(registrations => {
//     for (const registration of registrations) {
//       registration.unregister()
//     }
//   })
//   caches.keys().then(keyList => {
//     return Promise.all(keyList.map(key => {
//       return caches.delete(key)
//     }))
//   })
// }