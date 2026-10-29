// 모래놀이터 카페: 음료/케이크 오프라인 저장
// HTML을 바꾼 뒤에는 아래 버전 번호를 올려 주세요.
const CACHE_NAME = 'sand-cafe-two-kiosks-v1';
const FILES = ['./drink.html', './cake.html'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('sand-cafe-two-kiosks-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
