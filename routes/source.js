const express = require('express');
const router = express.Router();

const SourceService = require('../services/source-service');

router.get('/', async (req, res, next) => {
  res.send(await SourceService.findAll());
});

router.get('/all', async (req, res, next) => {
  const sources = await SourceService.findAll();
  res.render('source-all', { sources })
});

router.get('/:id', async (req, res, next) => {
  const source = await SourceService.find(req.params.id);
  res.render('source-detail', { source });
})

router.post('/', async (req, res, next) => {
  const source = await SourceService.add(req.body);
  res.send(article);
});

router.delete('/:id', async (req, res, next) => {
  await SourceService.del(req.params.id);
  res.send('ok')
})

module.exports = router;
