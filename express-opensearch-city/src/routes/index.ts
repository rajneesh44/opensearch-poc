import {Request, Response, Router} from 'express';

const router = Router();

router.get('/test', (req: Request, res: Response) =>
  res.send('Server is up & running!')
);
router.use('/city', require('./city-search'));

module.exports = router;
