// Abstract
class AbstractCarFactory {
  createPremiumCar(product) {
    return new AbstractPremiumCar(product);
  }

  createSportCar(product) {
    return new AbstractSportCar(product);
  }
}
class AbstractPremiumCar {
  constructor(model) {
    this.type = 'Premium car';
    this.model = model;
  }
}
class AbstractSportCar {
  constructor(model) {
    this.type = 'Sport car';
    this.model = model;
  }
}

// Concrete #1
class ToyotaFactory extends AbstractCarFactory {
  createPremiumCar(model) {
    return new ToyotaPremiumCar(model);
  }

  createSportCar(model) {
    return new ToyotaSportCar(model);
  }
}
class ToyotaPremiumCar extends AbstractPremiumCar {
  constructor(model) {
    super(model);
  }
}
class ToyotaSportCar extends AbstractSportCar {
  constructor(model) {
    super(model);
  }
}

// Concrete #2
class LexusFactory extends AbstractCarFactory {
  createPremiumCar(model) {
    return new LexusPremiumCar(model);
  }

  createSportCar(model) {
    return new LexusSportCar(model);
  }
}
class LexusPremiumCar extends AbstractPremiumCar {
  constructor(model) {
    super(model);
  }
}
class LexusSportCar extends AbstractSportCar {
  constructor(model) {
    super(model);
  }
}

// Code for the testing
const testing = (Factory, premiumCarName, sportCarName) => {
  const concreteFactory = new Factory();
  const concretePremiumCar = concreteFactory.createPremiumCar(premiumCarName);
  const concreteSportCar = concreteFactory.createSportCar(sportCarName);

  console.log(concreteFactory, concretePremiumCar, concreteSportCar);
};

testing(ToyotaFactory, 'Camry', 'Supra');
testing(LexusFactory, 'IS', 'LFA');
