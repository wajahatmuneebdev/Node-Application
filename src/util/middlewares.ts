import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { UserModel } from "../data-access-layer";
import jwt from 'jsonwebtoken'
import { unless } from "express-unless";

const SECRET_KEY: jwt.Secret = 'test_data_login_123'

export const handleValidations: RequestHandler = (request, response, next) => {
    const errors = validationResult(request);

    if (errors.isEmpty()) {
        return next();
    }

    response.status(400).json({ errors: errors.array() });
};

export const generateToken = (userData: UserModel): string => {
    return jwt.sign({ _id: userData.id, email: userData.email }, SECRET_KEY, {
        expiresIn: '2 days',
    });
}

export const authenticate = async (request, response, next) => {
    try {
        const [,authToken] = request.headers.authorization ? request.headers.authorization.split(' ') : [];

        if (!authToken) {
            return response.status(401).send('No token provided.');
        }

        const decodedData = await jwt.verify(authToken, SECRET_KEY);

        if (!decodedData) {
            return response.status(401).send('Invalid token provided.');
        }
   
        next();
    } catch (err) {
        response.status(401).send('Please authenticate');
    }
};

authenticate.unless = unless;