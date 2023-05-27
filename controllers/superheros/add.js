const { Superhero } = require('../../model');
const fs = require('fs/promises');
const path = require('path');

const pathAvatars = path.join(__dirname, '../../public/images');

const addSuperhero = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  // const resultDir = path.join(pathAvatars, originalname);
  // await fs.rename(tempPath, resultDir);
  // const imageUrl = path.join('/images', originalname);
  // const newHero = { ...req.body, imageUrl };
  // const result = await Superhero.create(newHero);
  res.status(201).json({ status: 'Succes saved file', code: 201, data: { name: originalname } });
};

module.exports = addSuperhero;
