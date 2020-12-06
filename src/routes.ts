import { Router } from 'express'

import ControllerLanguage from './controllers/ControllerLanguage';
import ControllerRepositories from './controllers/ControllerRepositories';

const routes = Router();

routes.get('/language', ControllerLanguage.index);

routes.get('/repositories', ControllerRepositories.show);

routes.post('/language/create', ControllerLanguage.create);

export default routes;