import DatabaseConnection from "./core/database";

export async function createTableApartamento() {
  const db = DatabaseConnection.getConnection();
  const query = `CREATE TABLE IF NOT EXISTS apartamento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contrato VARCHAR(10) NOT NULL,
        endereco VARCHAR(255) NOT NULL,
        valorAluguel REAL NOT NULL,
        valorCompra REAL NOT NULL,
        condominio REAL NOT NULL, 
        qtd_quartos INTEGER NOT NULL,
        qtd_banheiros INTEGER NOT NULL,
        locado BOOLEAN NOT NULL
    );`
  db.transaction(tx => {
    tx.executeSql(query);
  }, (error) => {
    console.log("error call back: " + JSON.stringify(error));
    console.log(error);
  }, () => {
    console.log("Transaction complete");
  });
}

export async function findAllApartamento() {
  const db = DatabaseConnection.getConnection();
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql("SELECT * FROM apartamento", [], (_, {rows}) => {
      console.log("All: " + JSON.stringify(rows));
      resolve(rows);
    }), (sqlError) => {
      console.log(sqlError);
    }}, (txError) => {
      console.log(txError);
  }));
}

export async function findById(id) {
  const db = DatabaseConnection.getConnection();
  return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`SELECT * FROM apartamento WHERE id=1`, [], (_, { row }) => {
        console.log("By id: " + JSON.stringify(row));  
        resolve(row)
      }), (sqlError) => {
          console.log(sqlError);
      }}, (txError) => {
      console.log(txError);
  }));
}

export async function insertIntoApartamento (apartamento) {
  console.log(JSON.stringify(apartamento));
  const db = DatabaseConnection.getConnection();
  return new Promise((resolve, reject) => db.transaction(
      tx => {
          tx.executeSql(`INSERT INTO 
          apartamento(contrato, valorAluguel, valorCompra, condominio, endereco, qtd_quartos, qtd_banheiros, locado)
          VALUES("${apartamento.contrato}", ${apartamento.valorAluguel}, ${apartamento.valorVenda}, ${apartamento.condominio}, "${apartamento.endereco}", ${apartamento.quartos}, ${apartamento.banheiros}, ${apartamento.locado});`,
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
