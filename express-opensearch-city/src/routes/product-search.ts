import {Request, Response, Router} from 'express';
import ProductOsService from '../services/product-os-service';

const router = Router();
const productOsService = new ProductOsService();

router.get('/search', async (req: Request, res: Response) => {
  const sq = req.query.sq?.toString() || '';
  if (sq.length === 0) {
    return res.status(400).send('Bad Request! Query Parameters Required');
  }

  const response = await productOsService.searchProduct(sq);
  return res.send(response);
});

module.exports = router;
