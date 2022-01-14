import {Request, Response, Router} from 'express';
import CityOsService from '../services/city-os-service';

const router = Router();
const cityOsService = new CityOsService();

router.get('/search', async (req: Request, res: Response) => {
  const state = req.query.state?.toString() || '';
  const name = req.query.name?.toString() || '';
  if (state.length === 0 && name.length === 0) {
    return res.status(400).send('Bad Request! Query Parameters Required');
  }

  const response = await cityOsService.searchCity(name, state);
  return res.send(response);
});

module.exports = router;
