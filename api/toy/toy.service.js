const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy);
    // const criteria = {}
    console.log("query:", criteria);
    const collection = await dbService.getCollection("toy");
    var toys = await collection.find(criteria).toArray();
    
    console.log(toys);
    return toys;
  } catch (err) {
    logger.error("cannot find toys", err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  console.log("_buildCriteria(filterBy):", filterBy);
  const criteria = {};
  if (filterBy.toyName) {
      const regTxt = { $regex: filterBy.toyName, $options: 'i' }
      criteria.name = regTxt
  }
  if (filterBy.inStock === "in stock") {
    criteria.inStock = { $eq:true };
  }
  if (filterBy.inStock === "out of stock") {
    criteria.inStock = { $eq: false};
  }
  if (filterBy.labels) {
      if (filterBy.labels==='All')return
          criteria.labels = filterBy.labels;
      }

  console.log("criteria", criteria);
  return criteria;
}
// function sort(){if (filter.status) {
//     const { status } = filter;
//     if (status === 'name') {
//         toys.sort((a, b) => a.name.localeCompare(b.name))
//     }
//     if (status === 'price') {
//         toys.sort((a, b) => a.price - b.price)
//     }
//     if (status === 'created') {
//         toys.sort((a, b) => b.createdAt - a.createdAt);
//     }
// }}

async function getById(toyId) {
  try {
    console.log(toyId);
    const collection = await dbService.getCollection("toy");
    const toy = collection.findOne({ _id: ObjectId(toyId) });
    return toy;
  } catch (err) {
    logger.error(`while finding toy ${toyId}`, err);
    throw err;
  }
}

async function remove(toyId) {
  try {
    const collection = await dbService.getCollection("toy");
    await collection.deleteOne({ _id: ObjectId(toyId) });
    return toyId;
  } catch (err) {
    logger.error(`cannot remove toy ${toyId}`, err);
    throw err;
  }
}

async function add(toy) {
  try {
    const collection = await dbService.getCollection("toy");
    const addedtoy = await collection.insertOne(toy);
    return addedtoy;
  } catch (err) {
    logger.error("cannot insert toy", err);
    throw err;
  }
}
async function update(toy) {
  try {
    var id = ObjectId(toy._id);
    delete toy._id;
    const collection = await dbService.getCollection("toy");
    await collection.updateOne({ _id: id }, { $set: { ...toy } });
    return toy;
  } catch (err) {
    logger.error(`cannot update toy ${toyId}`, err);
    throw err;
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
};
