const fs = require('fs');
const path = require('path');

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1;
    } else {
        return 1;
    }
};

const newDate = () => new Date().toString();

function checkDataArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id);
        if (!row) {
            reject({
                message: 'ID not found!',
                status: 404
            });
        }
 
        resolve(row);
    });
};

function writeJSONFile(filename, content) {
    fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = {
    getNewId,
    newDate,
    checkDataArray,
    writeJSONFile
};
