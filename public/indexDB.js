//const { v4: uuidv4 } = require('uuid');
function useIndexedDB(databaseName, storeName, method, object) {

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(databaseName, 1);
        let db, store;

        request.onupgradeneeded = ({ event }) => {
            db = request.result;
            db.createObjectStore(storeName, { keyPath: "_id" });
        };

        request.onerror = (event) => {
            console.log('IndexDB had an error', event);
          };
        request.onsuccess = (event) => {
            //Setup a transaction store
            db = event.target.result;
            
            const budgetTransaction = db.transaction([storeName], "readwrite");
            store = budgetTransaction.objectStore(storeName);

            if (method === "put") {
               store.put({_id:uuidv4(), budgetData: object});
            }
            if (method === "clear") {
                store.clear(object);
            }
            if (method === "get") {
                const all = store.getAll();
                all.onsuccess = function () {
                    resolve(all.result);
                };
            }
            budgetTransaction.oncomplete = function () {
                db.close();
            };
        };
    });
}

 module.exports = {useIndexedDB}