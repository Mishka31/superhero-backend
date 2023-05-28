// const { Superhero } = require('../../model');
const { db } = require('../../firebase/config');

const getAll = async (_, res) => {
  try {
    const snapshot = await db.collection('superheroes').get();

    const superheroes = [];
    snapshot.forEach((doc) => {
      const superheroData = doc.data();
      const superhero = {
        id: doc.id,
        ...superheroData,
      };
      superheroes.push(superhero);
    });

    res.json({ message: 'Get all heroes', code: 200, data: superheroes });
  } catch (error) {
    res.status(500).json({ status: 'Error', code: 500, message: 'Failed to get heroes' });
  }
};

module.exports = getAll;
