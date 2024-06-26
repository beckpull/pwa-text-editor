import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const postDb = async (content) => {
    console.log('POST to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ text: content });
    const result = await request;
    console.log('Data saved to the database', result);
  };
  
  export const getDb = async () => {
    console.log('GET all from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    // console.log('result.value', result);
    // result 
    // ? console.log("Database retrieved", result.text) 
    // : console.log("Not retrieved");
    return result?.text;
  };
  
  // export const getOneDb = async (id) => {
  //   console.log('GET from the database');
  //   const jateDb = await openDB('jate', 1);
  //   const tx = jateDb.transaction('jate', 'readonly');
  //   const store = tx.objectStore('jate');
  //   const request = store.get(id);
  //   const result = await request;
  //   console.log('result.value', result);
  //   return result;
  // };

  // export const deleteDb = async (id) => {
  //   console.log('DELETE from the database', id);
  //   const jateDb = await openDB('jate', 1);
  //   const tx = jateDb.transaction('jate', 'readwrite');
  //   const store = tx.objectStore('jate');
  //   const request = store.delete(id);
  //   const result = await request;
  //   console.log('result.value', result);
  //   return result;
  // };
  
  export const putDb = async (id, content) => {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: id, text: content });
    const result = await request;
    console.log('Data saved to the database', result);
  };

initdb();
