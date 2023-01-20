import { Router } from 'express';
import { param, body } from 'express-validator';
import { createUser, getUser, loginUser } from '../services';
import { generateToken, handleValidations } from '../util';

export const userRouter: Router = Router();

userRouter.get('/:id',
    param('id').exists().isInt().toInt(),
    handleValidations,
    async (request, response)=> {
    try {
        const { id } = request.params;

        const [user] = await getUser(id);

        if(!user) {
            response.status(404).json({ message: `User is not found against user id: ${id}` });
        }
        
        response.status(200).json(user);
    }
    catch(error){
        console.log(error);
        response.status(500).json(error);
    }
});

userRouter.post('/login',
    body('email').exists().isString().trim().isEmail(),
    body('password').exists().isString().trim(),
    handleValidations,
    async (request, response)=> {
    try {
        const { email, password } = request.body;

        const [user] = await loginUser({ email, password });

        if(!user) {
            response.status(404).json({ message: 'User is not found, email or password is wrong.' });
        }
        
        const authToken = generateToken(user);

        response.status(200).json({jwt: authToken});
    }
    catch(error){
        console.log(error);
        response.status(500).json(error);
    }
});

userRouter.post('/register',
    body('name').notEmpty().isString().trim(),
    body('email').notEmpty().isString().trim().isEmail(),
    body('password').notEmpty().isString().trim(),
    handleValidations,
    async (request, response)=> {
    try{
        const { name, email, password } = request.body;

        await createUser({ name, email, password })
    
        response.status(200).json(true);
    }
    catch(error) {
        response.status(500).json(error);
    }
})

