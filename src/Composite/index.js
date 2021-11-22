class Composite {
  constructor(compositeName) {
    this.children = [];
    this.compositeName = compositeName;
  }

  add(child) {
    this.children.push(child);
  }

  getPrice() {
    let price = 0;

    this.children.forEach((child) => price += child.getPrice());

    return price;
  }
}

class Leaf {
  constructor(leafName, leafPrice) {
    this.leafName = leafName;
    this.leafPrice = leafPrice;
  }

  getPrice() {
    return this.leafPrice;
  }
}

const testing = () => {
  const package = new Composite('Автомобиль');
  const sportPackage = new Composite('Спортивный пакет');
  const sportSuspension = new Leaf('Спортивная подвеска', 50000);
  const sportTransmission = new Leaf('Спортивная коробка передач', 100000);
  const sportExterior = new Composite('Спортивный экстерьер');
  const sportLines = new Leaf('Спортивные полосы на кузове', 10000);

  package.add(sportPackage);

  sportPackage.add(sportSuspension);
  sportPackage.add(sportTransmission);

  package.add(sportExterior);
  sportExterior.add(sportLines);

  console.log(package.getPrice());
};

testing();
