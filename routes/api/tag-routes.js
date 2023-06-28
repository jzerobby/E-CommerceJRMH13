const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.find().populate('products');
    
    res.json(tags);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;

    // Find the tag by its id and populate the 'products' field
    const tag = await Tag.findById(tagId).populate('products');

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { name } = req.body;

    const tag = new Tag({ name });

    // Save the tag to the database
    await tag.save();

    res.status(201).json(tag);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.id;
    const { name } = req.body;

    // Find the tag by its id and update its name
    const updatedTag = await Tag.findByIdAndUpdate(tagId, { name }, { new: true });

    if (!updatedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;

    // Find the tag by its id and delete it
    const deletedTag = await Tag.findByIdAndDelete(tagId);

    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
