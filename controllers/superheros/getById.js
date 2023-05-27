const { NotFound } = require('http-errors')
const { Superhero } = require('../../model')

const getById = async (req, res) => {
  const { id } = req.params
  const result = await Superhero.findById(id)
  if (!result) {
    throw new NotFound(`Not found id = ${id}`)
  }
  res.json({ message: 'template message', code: 200, data: { result } })
}
module.exports = getById
