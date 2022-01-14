import {Request, Response, Router} from 'express';

const router = Router();

router.get('/test', (req: Request, res: Response) =>
  res.send('Server is up & running!')
);
router.use('/product', require('./product-search'));

module.exports = router;
