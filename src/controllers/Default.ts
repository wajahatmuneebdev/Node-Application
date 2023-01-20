import { Router } from 'express';

export const defaultRouter: Router = Router();

defaultRouter.get('/',(request, response)=> {
    response.send('<h>Welcome!</h>')
});