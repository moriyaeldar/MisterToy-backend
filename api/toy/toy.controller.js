const toyService = require('./toy.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function gettoys(req, res) {
  try {
    // var queryParams = req.query;
    const filterBy = req.query;
    console.log('filterBy controller:',filterBy);
    const toys = await toyService.query(filterBy)
    res.json(toys);
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

// GET BY_id
async function gettoyById(req, res) {
  try {
    const toyId = req.params.id;
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

// POST (add toy)
async function addtoy(req, res) {
  try {
    const toy = req.body;
    const addedtoy = await toyService.add(toy)
    res.json(addedtoy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}

// PUT (Update toy)
async function updatetoy(req, res) {
  try {
    const toy = req.body;
    console.log('toy:',toy);
    const updatedtoy = await toyService.update(toy)
    res.json(updatedtoy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

// DELETE (Remove toy)
async function removetoy(req, res) {
  try {
    const toyId = req.params.id;
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

module.exports = {
  gettoys,
  gettoyById,
  addtoy,
  updatetoy,
  removetoy
}
