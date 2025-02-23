let data = null;

/**
 * Loads the data in a JSON file, represented by an array of objects containing
 * key-value pairs, into memory.
 *
 * @NotNull path: a string representation of the relative path to the JSON data
 *                file.
 * @Nullable initializeTable: a function that takes no parameters and returns nothing.
 *                            Loads the initial state of the table.
 */
async function loadTable(path, initializeTable) {
    fetch(path).then(response => response.json()).then(pulledData => {
        data = pulledData;
        if (initializeTable instanceof Function) {
            initializeTable();
        }
    }).catch(error => console.error(error));
}

/**
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
    const filteredData = filter instanceof Function ? filter(data) : data;
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    table.innerHTML = "";
    const header = document.createElement("tr");
    keys.forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        header.appendChild(th);
    });
    table.append(header);
    filteredData.forEach(datum => {
        const row = table.insertRow();
        keys.forEach(key => {
            const cell = row.insertCell();
            cell.innerHTML = datum[key];
        });
    });
}

/**
 * Retrieves a deep copy of the data loaded in memory. Id est, it's safe to be
 * modified.
 * Safe under modifications over the data retrieved.
 * For usage in custom functions.
 */
function retrieveData() {
    return structuredClone(data);
}
