import { Express } from 'express';
import {defaultRouter, userRouter, taskRouter} from './controllers';

export const routes = (app: Express) => {
    app.use('/', defaultRouter);

    app.use('/api/users', userRouter);

    app.use('/api/tasks', taskRouter);
};