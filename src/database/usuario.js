import DatabaseConnection from "./core/database";

export async function createTableUsuario() {
    const db = DatabaseConnection.getConnection();
    const query = `
        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            senha VARCHAR(255) NOT NULL
        );
    `;
    db.transaction(tx => {
        tx.executeSql(query);
    }, (error) => {
        console.log("error call back: " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("[usuario] Transaction complete");
    });
}

export async function insertIntoUsuario (usuario) {
    console.log(JSON.stringify(usuario));
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(
        tx => {
            console.log("Inserindo...");
            tx.executeSql(`INSERT INTO 
            usuario(nome, email, senha)
            VALUES("${usuario.nome}", "${usuario.email}", "${usuario.senha}");`,
            (_, {insertId, rows}) => {
                console.log("Executou a inserção");
                resolve(insertId);
            }), (sqlError) => {
                console.log("SQL Error: " + JSON.stringify(sqlError));
        }}, (txError) => {
                console.log("Transaction Error: " + txError);
        }
    ));
}

export async function findAllUsuario() {
    console.log("Consultando...");
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from usuario`, [], (_, { rows }) => {
            console.log("All: " + JSON.stringify(rows));
            resolve(rows);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
}

export async function findUsuario(email) {
    console.log("Consultando...");
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from usuario where email like "${email}"`, [], (_, { rows }) => {
            console.log("All: " + JSON.stringify(rows));
            resolve(rows);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
}

export async function alterPassword (email, senha) {
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`update usuario set senha = "${senha}" where email like "${email}";`, [], (_, { rows }) => {
            console.log("All: " + JSON.stringify(rows));
            resolve(rows);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
}
