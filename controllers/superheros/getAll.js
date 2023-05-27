const { Superhero } = require('../../model');

const getAll = async (_, res) => {
  // const superheros = await Superhero.find({});
  console.log('GET ALL');
  res.json({ message: 'Get all hero', code: 200, data: { Dima: 'Sosi' } });
};

module.exports = getAll;
