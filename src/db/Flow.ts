import * as SQLite from "expo-sqlite/legacy";
import type { Notes } from "@/typings/Notes";

const db = SQLite.openDatabase("notes.db");

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        color TEXT,
        iconName TEXT,
        content TEXT,
        createdAt TEXT
      );`
    );
  });
};

export const addNote = (
  { title, color, iconName, content, createdAt }: Notes,
  successCallback: () => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO notes (title, color, iconName, content, createdAt) VALUES (?, ?, ?, ?, ?);`,
      [title, color, iconName, content, createdAt],
      (_, result) => successCallback(),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};

export const fetchNotes = (
  successCallback: (notes: Notes[]) => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM notes;`,
      [],
      (_, { rows }) => successCallback(rows._array as Notes[]),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};

export const deleteNote = (
  id: number,
  successCallback: () => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM notes WHERE id = ?;`,
      [id],
      (_, result) => successCallback(),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};

export const createFavoriteTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        color TEXT,
        iconName TEXT,
        content TEXT,
        createdAt TEXT
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        noteId INTEGER,
        FOREIGN KEY(noteId) REFERENCES notes(id) ON DELETE CASCADE
      );`
    );
  });
};
export const addNoteToFavorites = (
  noteId: number,
  successCallback: () => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO favorites (noteId) VALUES (?);`,
      [noteId],
      (_, result) => successCallback(),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};

export const fetchFavoriteNotes = (
  successCallback: (notes: Notes[]) => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT notes.* FROM notes
       INNER JOIN favorites ON notes.id = favorites.noteId;`,
      [],
      (_, { rows }) => successCallback(rows._array as Notes[]),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};
export const removeNoteFromFavorites = (
  noteId: number,
  successCallback: () => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM favorites WHERE noteId = ?;`,
      [noteId],
      (_, result) => successCallback(),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};

export const updateNoteContent = (
  id: number,
  newContent: string,
  successCallback: () => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE notes SET content = ? WHERE id = ?;`,
      [newContent, id],
      (_, result) => successCallback(),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};

export const updateNoteCreatedAt = (
  id: number,
  newCreatedAt: string,
  successCallback: () => void,
  errorCallback: (error: Error) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE notes SET createdAt = ? WHERE id = ?;`,
      [newCreatedAt, id],
      (_, result) => successCallback(),
      (_, error) => {
        errorCallback(error as any);
        return false;
      }
    );
  });
};
