import * as SQLite from 'expo-sqlite';

export default DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("database.test4"),
};
