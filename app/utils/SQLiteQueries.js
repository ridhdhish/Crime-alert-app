import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("alerts.db");

export const init = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS alerts (
          lat REAL NOT NULL,
          long REAL NOT NULL,
          city TEXT,
          address TEXT,
          state TEXT,
          crimeData TEXT
        );
      `,
        [],
        (_) => {
          resolve();
        },
        (_, error) => {
          reject();
        }
      );
    });
  });
};
