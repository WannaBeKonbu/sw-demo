var cacheStorageKey = 'cachesName';
var cacheList = [
  // 注册成功后要立即缓存的资源列表
  'https://cdn.bootcss.com/jquery/1.10.2/jquery.min.js',
  '../css/common.css',
  '../css/fonts/iview.css',
  '../css/fonts/flex-table.css',
  '../css/fonts/ionicons.svg',
  '../css/fonts/ionicons.ttf',
  '../css/fonts/ionicons.woff',
  '../css/fonts/ionicons.woff2',
  '../public/jquery-1.12.4.min.js',
  '../public/axios.js',
  '../public/base-head.js',
  '../public/base-page.js',
  '../public/base-title.js',
  '../public/function.js',
  '../public/http.js',
  '../public/iview.js',
  '../public/vue.js',
  '../img/topCode.png',
  '../img/ycsBack.png',
  '../js/index.js',
  '../index.html',
  '../html/resultEntry.html',
  '../js/resultEntry.js',
]

// 当浏览器解析完 SW 文件时触发 install 事件
self.addEventListener('install', function(e) {
  // install 事件中一般会将 cacheList 中要换存的内容通过 addAll 方法，请求一遍放入 caches 中
  //https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      return cache.addAll(cacheList)
    })
  );
});

// 激活时触发 activate 事件
self.addEventListener('activate', function(e) {
  // active 事件中通常做一些过期资源释放的工作，匹配到就从 caches 中删除
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) {
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
