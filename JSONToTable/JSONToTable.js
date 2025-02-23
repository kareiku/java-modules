let entries = null;

/*
 * Loads the data in a JSON file, represented by an array of objects containing
 * key-value pairs, into memory.
 *
 * @NotNull path: a string representation of the relative path to the JSON data
 *                file.
 * @Nullable callback: a function that takes no parameters and returns nothing.
 *                     Defined mainly to allow for synchronous table loading.
 */
async function loadTable(path, callback) {
    fetch(path).then(response => response.json()).then(data => {
        entries = data;
        if (callback instanceof Function) {
            callback();
        }
    }).catch(error => console.error(error));
}

/*
 * Writes the saved-in-memory data into the table specified in the parameter.
 * Keys represent the header and objects are shown on a row each.
 * Note that this is the default way of writting a table. There's no limitation
 * to defining another function to write the data with a different format.
 *
 * @Nullable filter: a function that takes an array of objects and filters it,
 *                   returning another array of objects.
 * @NotNull tableId: a string representing the id of the table where the data
 *                   should be loaded to.
 */
function writeTable(filter, tableId) {
    const table = document.getElementById(tableId);
    const data = filter instanceof Function ? filter(entries) : entries;
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    table.innerHTML = "";
    const header = document.createElement("tr");
    keys.forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        header.appendChild(th);
    });
    table.append(header);
    data.forEach(datum => {
        const row = table.insertRow();
        keys.forEach(key => {
            const cell = row.insertCell();
            cell.innerHTML = datum[key];
        });
    });
}

/*
 * Retrieves a deep copy of the entries loaded in memory.
 * For usage in custom functions.
 */
function retrieveEntries() {
    return structuredClone(entries);
}