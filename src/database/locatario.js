import DatabaseConnection from "./core/database";

export async function createTableLocatario() {
    const db = DatabaseConnection.getConnection();
    const query = `
        CREATE TABLE IF NOT EXISTS locatario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255) NOT NULL,
            cpf INTEGER NOT NULL, 
            dataNascimento VARCHAR(255) NOT NULL,
            rendaMensal REAL NOT NULL,
            vencimentoAluguel INTEGER NOT NULL,
            dataInicioContrato VARCHAR(255) NOT NULL,
            dataFimContrato VARCHAR(255) NOT NULL,
            idImovelAlugado INTEGER NOT NULL
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

export async function insertIntoLocatario (locatario) {
    console.log(JSON.stringify(locatario));
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(
        tx => {
            console.log("Inserindo...");
            tx.executeSql(`INSERT INTO 
            locatario(nome, cpf, dataNascimento, rendaMensal, vencimentoAluguel, dataInicioContrato, dataFimContrato, idImovelAlugado)
            VALUES("${locatario.nome}", ${locatario.cpf}, "${locatario.dataNascimento}", ${locatario.rendaMensal}, ${locatario.vencimentoAluguel}, "${locatario.inicioContrato}", "${locatario.terminoContrato}", "${locatario.idImovelAlugado}");`,
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

export async function findAllLocatario() {
    console.log("Consultando...");
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from locatario`, [], (_, { rows }) => {
            console.log("All: " + JSON.stringify(rows));
            resolve(rows);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
}
