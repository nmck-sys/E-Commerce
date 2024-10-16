const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }], 
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve tags' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }], 
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve tag' });
  }
});


router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create tag' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updated) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to update tag' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete tag' });
  }
});

module.exports = router;