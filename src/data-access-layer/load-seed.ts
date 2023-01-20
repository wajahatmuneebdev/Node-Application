import { execute } from "./mysql-connector";

const queries = [
    'DROP DATABASE IF EXISTS test_db',
    'CREATE DATABASE test_db',
    'USE test_db',
    `CREATE TABLE User (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(50) NOT NULL,
        email varchar(50) NOT NULL UNIQUE,
        password varchar(50),
        PRIMARY KEY (id)
    )`,
    `CREATE TABLE Task (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        PRIMARY KEY (id)
    )`
]

export const loadSeed = async () => {
    try {
        await execute(queries.join(';'), []);
    }
    catch(error) {
        console.log(error);
        throw new Error('Unable to load seed file.')
    }
}