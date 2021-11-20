class Singleton {
  constructor(data) {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    Singleton.instance = this;
    this.data = data;

    return this;
  }
}

// Code for the testing
const testing = () => {
  const a = new Singleton('test1');
  const b = new Singleton('test2');
  if (a === b) {
    console.log('Singleton работает, один экземпляр');
  }
};

testing();
