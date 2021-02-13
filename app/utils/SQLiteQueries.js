import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("alerts.db");

export const initCrimeDB = async () => {
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
          crimeData TEXT,
          id REAL NOT NULL,
          createdAt REAL NULL
        );
      `,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const insertCrime = async ({
  id,
  lat,
  long,
  city = "",
  address = "",
  state = "",
  crimeData = "",
}) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO alerts (lat, long, city, address, state, crimeData, id, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `,
        [lat, long, city, address, state, crimeData, id, Date.now()],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteCrime = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM alerts where id = ?;
      `,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getCrimeData = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * from alerts
      `,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const dropTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DROP TABLE alerts
      `,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const clearCrimes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM alerts
      `,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};
