class ServiceInteraction {
  constructor(url) {
    this.url = url;
  }

  sendRequest(path, method) {
    return fetch(`https://${this.url}/${path}`, {
      method,
    })
      .then((res) => res.json())
      .then((result) => result);
  }
}

const proxy = (serv) => {
  const cache = {};

  const handler = {
    get(target, propKey, receiver) {
      const targetValue = Reflect.get(target, propKey, receiver);
      if (typeof targetValue === 'function') {
        return function (...args) {
          if (cache[args[0]]) {
            return cache[args[0]];
          }
          return targetValue.apply(this, args).then((response) => {
            cache[args[0]] = response;

            return response;
          });
        };
      }
      return targetValue;
    },
  };

  return new Proxy(serv, handler);
};

const testing = async () => {
  const server = new ServiceInteraction('jsonplaceholder.typicode.com');
  console.time('1');
  const response = await server.sendRequest('posts/1', 'GET');
  console.timeEnd('1');
  console.log('Ответ от сервера:', response);

  const serverWithProxy = proxy(server);
  console.time('2');
  const response2 = await serverWithProxy.sendRequest('posts/1', 'GET');
  console.timeEnd('2');
  console.log('Ответ от сервера:', response2);

  console.time('3');
  const response3 = await serverWithProxy.sendRequest('posts/1', 'GET');
  console.log('Запрос с тем же параметром, ответ из кэша:', response2);
  console.timeEnd('3');
};

testing();
