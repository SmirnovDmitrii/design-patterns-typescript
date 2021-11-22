class OldDateConverter {
  convertToUSAFormat(dateObject) {
    const [y, m, d] = dateObject.toISOString().substr(0, 10).split('-');
    return [m, d, y].join('-');
  }

  convertToRussianFormat(dateObject) {
    const [y, m, d] = dateObject.toISOString().substr(0, 10).split('-');
    return [d, m, y].join('-');
  }
}

class NewDateConverter {
  convert(dateObject, format) {
    const [y, m, d] = dateObject.toISOString().substr(0, 10).split('-');

    const parser = {
      'mm-dd-yyyy': () => `${m}-${d}-${y}`,
      'dd-mm-yyyy': () => `${d}-${m}-${y}`,
    };

    return parser[format]();
  }
}

class DateAdapter {
  constructor() {
    this.dateConverter = new NewDateConverter();
  }

  convertToUSAFormat(dateObject) {
    return this.dateConverter.convert(dateObject, 'mm-dd-yyyy');
  }

  convertToRussianFormat(dateObject) {
    return this.dateConverter.convert(dateObject, 'dd-mm-yyyy');
  }
}

const testing = () => {
  const oldDateConverter = new OldDateConverter();
  const newDateConverter = new NewDateConverter();
  const dateAdapter = new DateAdapter();

  const dateToUSAOld = oldDateConverter.convertToUSAFormat(new Date());
  const dateToRussianOld = oldDateConverter.convertToRussianFormat(new Date());
  const dateToUSANew = newDateConverter.convert(new Date(), 'mm-dd-yyyy');
  const dateToRussianNew = newDateConverter.convert(new Date(), 'dd-mm-yyyy');

  const dateAdapterToUSA = dateAdapter.convertToUSAFormat(new Date());
  const dateAdapterToRussian = dateAdapter.convertToRussianFormat(new Date());

  console.log('Американский формат, старый конвертер:', dateToUSAOld);
  console.log('Американский формат, новый конвертер:', dateToUSANew);
  console.log('Американский формат, адаптер:', dateAdapterToUSA);
  console.log('Русский формат, старый конвертер:', dateToRussianOld);
  console.log('Русский формат, новый конвертер:', dateToRussianNew);
  console.log('Русский формат, адаптер:', dateAdapterToRussian);
};

testing();
