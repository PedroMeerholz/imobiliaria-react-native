import DatabaseConnection from "./core/database";

export async function createTableUsuario() {
    const db = DatabaseConnection.getConnection();
    const query = `
        CREATE TABLE IF NOT EXISTS credenciais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(255) NOT NULL
        );
    `;
    db.transaction(tx => {
        tx.executeSql(query);
    }, (error) => {
        console.log("error call back: " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("[credenciais] Transaction complete");
    });
}

export async function addLogin(credenciais, token) {
    const db = DatabaseConnection.getConnection();
    const resultadoBuscaLogin = await findUsuario(credenciais.email);
    console.log("Resultado busca login: " + JSON.stringify(resultadoBuscaLogin));
    if(resultadoBuscaLogin['_array'].length === 0) {
        insertIntoCredenciais(credenciais);
    } else {
        console.log(resultadoBuscaLogin['_array'][0].id);
        updateCredenciais(credenciais, token, resultadoBuscaLogin['_array'][0].id);
    }
}

async function insertIntoCredenciais (credenciais) {
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(
        tx => {
            console.log("Inserindo...");
            tx.executeSql(`INSERT INTO 
            credenciais(email, token)
            VALUES("${credenciais.email}", "${credenciais.token}");`,
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

async function updateCredenciais (credenciais, token, id) {
    console.log(token);
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(
        tx => {
            console.log("Atualizando...");
            tx.executeSql(`UPDATE credenciais SET
            email = "${credenciais.email}", token = "${token}" WHERE id = ${id};`,
            (_, {insertId, rows}) => {
                console.log("Executou a atualização");
                resolve(insertId);
            }), (sqlError) => {
                console.log("SQL Error: " + JSON.stringify(sqlError));
        }}, (txError) => {
                console.log("Transaction Error: " + txError);
        }
    ));
}

export async function findUsuario(email) {
    console.log("Consultando...");
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from credenciais where email = "${email}"`, [], (_, { rows }) => {
            resolve(rows);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
}
