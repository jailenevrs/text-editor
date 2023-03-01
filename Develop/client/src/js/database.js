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
  export const putDb = async (content) => {
    console.log('put to database')
  
  const jateDb = await openDB('jate', 1 );
  const tx = jateDb.transaction('jate', 'readwrite')
  const store = tx.objectStore('jate');
  const request = store.put({id : 1, value: content})
  const result = await request;
  console.log ("data saved to db" , result.value);
  }
// TODO: Add logic to a method that accepts some content and adds it to the database
//   console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  console.log('data retrieved', result.value);
return result.value
}

// }console.error('getDb not implemented');

initdb();
