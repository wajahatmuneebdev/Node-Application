import { execute, TaskModel } from "../data-access-layer";

export const getTasks = async (): Promise<TaskModel[]> => {
    const query = `SELECT * from Task;`;

    return execute(query, []);
};

export const createTask = async (taskData: Partial<TaskModel>): Promise<void> => {
    const query = `INSERT INTO test_db.Task (name) VALUES (?);`

    await execute(query, [taskData.name]);
};