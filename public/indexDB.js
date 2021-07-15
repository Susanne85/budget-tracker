
export function useIndexedDB(databaseName, storeName, method, object) {

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(databaseName, 1);
        let db, store;

        request.onupgradeneeded = ({ event }) => {
            db = request.result;
            db.createObjectStore(storeName, { keyPath: "_id" });
        };

        request.onsuccess = event => {
            //Setup a transaction store
            db = request.result;
            const budgetTransaction = db.transaction([storeName, "readwrite");
            store = budgetTransaction.objectStore(storeName);

            //now add data
            db.onerror = function (e) {
                console.log("error");
            };
            if (method === "put") {
                store.put(object);
            }
            if (method === "clear") {
                store.clear();
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

