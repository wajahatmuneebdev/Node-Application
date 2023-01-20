import { Router } from 'express';
import { createTask, getTasks } from '../services';
import { body } from 'express-validator';
import { handleValidations } from '../util';

export const taskRouter: Router = Router();

taskRouter.get('/',async (request, response)=> {
    try {
        const tasks = await getTasks();

        response.status(200).json(tasks);
    }
    catch(error){
        console.log(error);

        response.status(500).json(error);
    }
});

taskRouter.post('/create',
    body('name').exists().isString().trim(),
    handleValidations,
    async (request, response)=> {
    try{
        const { name } = request.body;

        await createTask({ name });
    
        response.status(200).json(true);
    }
    catch(error) {
        response.status(500).json(error);
    }
})

