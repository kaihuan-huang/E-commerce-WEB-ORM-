const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  try{
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  }catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try{
    const categorieData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categorieData) {
      res.status(404).json({ message: ' No Product with that id!'});
      return;
    }

    res.status(200).json(categorieData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create( {
      product_id : req.params.product_id,
    });
    res.status(200).json(newCategory);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update( {
      product_id : req.params.product_id,
    });
    res.status(200).json(updateCategory);
  }catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
