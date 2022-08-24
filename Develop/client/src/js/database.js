import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    }
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async content => {
  const jate_db = await openDB("jate", 1);
  const transaction = jate_db.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  const req = store.put({ value: content });
  const result = await req;

  return result;
};
// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jate_db = await openDB("jate", 1);
  const transaction = jate_db.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  const req = store.getAll();
  const res = await req;
};
// console.error('getDb not implemented');

initdb();
