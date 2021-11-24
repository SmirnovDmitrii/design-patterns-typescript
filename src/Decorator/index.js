class ServiceInteraction {
  constructor(url, port) {
    this.url = url;
    this.port = port;
  }

  connect() {
    return new Promise((resolve) => {
      this.connection = new WebSocket(`wss://${this.url}:${this.port}`);
      this.connection.onopen = (e) => {
        console.log('connected', e);
        resolve();
      };
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.connection.close();
      this.connection.onclose = (e) => {
        console.log('disconnected', e);
        resolve();
      };
    });
  }

  sendMessage(message) {
    return new Promise((resolve) => {
      this.connection.send(message);
      this.connection.onmessage = (e) => {
        console.log(e);
        resolve();
      };
    });
  }
}

class LogDecorator extends ServiceInteraction {
  constructor(server) {
    super();
    this.server = server;
  }

  connect() {
    console.log('ESTABLISHING CONNECTION WITH:', this.server.url);
    return this.server.connect();
  }

  disconnect() {
    console.log('DISCONNECTING FROM:', this.server.url);
    return this.server.disconnect();
  }

  sendMessage(message) {
    console.log('SENDING REQUEST WITH PARAMS:', message);
    return this.server.sendMessage(message);
  }
}

const testing = async () => {
  const server = new ServiceInteraction('echo.websocket.org', 443);
  const decoratedServer = new LogDecorator(server);

  await server.connect()
    .then(() => server.sendMessage('123'))
    .then(() => server.disconnect());

  console.log('=============================');

  await decoratedServer.connect()
    .then(() => decoratedServer.sendMessage('1234'))
    .then(() => decoratedServer.disconnect());
};

testing();
