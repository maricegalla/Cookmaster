const { ObjectId } = require('bson');
const getConnection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const result = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { name, ingredients, preparation, userId, _id: result.insertedId } };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const editOneRecipe = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const editedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return editedRecipe;
};

const deleteOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  editOneRecipe,
  deleteOneRecipe,
};