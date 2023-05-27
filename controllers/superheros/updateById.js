const { NotFound } = require('http-errors')
const { Superhero } = require('../../model')
const fs = require('fs/promises')
const path = require('path')

const pathAvatars = path.join(__dirname, '../../public/images')

const updateById = async (req, res) => {
  const { id } = req.params

  if (!req.file) {
    const result = await Superhero.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!result) {
      throw new NotFound(`Not found id = ${id}`)
    }
    res.status(200).json({ status: 'succes', code: 200, data: { result } })
  }
  const { path: tempPath, originalname } = req.file
  const resultDir = path.join(pathAvatars, originalname)
  await fs.rename(tempPath, resultDir)
  const imageUrl = path.join('/images', originalname)
  const updateHero = { ...req.body, imageUrl }

  const result = await Superhero.findByIdAndUpdate(id, updateHero, {
    new: true,
  })
  if (!result) {
    throw new NotFound(`Not found id = ${id}`)
  }
  res.status(200).json({ status: 'succes', code: 200, data: { result } })
}

module.exports = updateById
