import DatabaseConnection from "./core/database";

export const createTableCasa = () => {
    const db = DatabaseConnection.getConnection();
    const query = `
        CREATE TABLE IF NOT EXISTS casa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contrato VARCHAR(255) NOT NULL,
            endereco VARCHAR(255) NOT NULL,
            valor REAL NOT NULL,
            quartos INTEGER NOT NULL,
            banheiros INTEGER NOT NULL,
            locado BOOLEAN NOT NULL
        );
    `;
    db.transaction(tx => {
        tx.executeSql(query);
    }, (error) => {
        console.log("error call back: " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Transaction complete");
    });
}

export const insertIntoCasa = () => {
    const db = DatabaseConnection.getConnection();
    const query = `INSERT INTO 
        casa(contrato, valor, condominio, endereco, locado)
        VALUES("Compra", 150000, "Rua das macieiras", false);`
    return new Promise((resolve, reject) => db.transaction(
        tx => {
            tx.executeSql(query), (_, {insertId, rows}) => {
                resolve(insertId);
            }, (sqlError) => {
                console.log("SQL Error: " + JSON.stringify(sqlError));
            }, (txError) => {
                console.log("Transaction Error: " + JSON.stringify(txError));
            }
        }
    ));
}

export const findAllCasa = () => {
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from casa`, [], (_, { rows }) => {
            console.log(rows);
            resolve(rows);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
}
