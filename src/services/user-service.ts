import { execute, UserModel } from "../data-access-layer";

export const getUser = async (userId: number): Promise<UserModel[]> => {
    const query = `SELECT * from User WHERE id = ?;`;

    return execute(query, [userId]);
};

export const loginUser = async (userData: Partial<UserModel>): Promise<UserModel[]> => {
    const query = `SELECT * from User WHERE email = ? AND password = ?;`;

    return execute(query, [userData.email, userData.password]);
};

export const createUser = async (userData: Partial<UserModel>): Promise<void> => {
    const query = `INSERT INTO test_db.User (name, email, password) VALUES (?, ?, ?);`

    await execute(query, [userData.name, userData.email, userData.password]);
};