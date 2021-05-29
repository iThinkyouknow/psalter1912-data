const fs = require('fs');
const {log} = console;
const minifiedFilesRegex = /^(?<!_)[a-z0-9-\(\)]+\.json$/i
const files = fs.readdirSync(`${__dirname}/../`)
    .filter(file => minifiedFilesRegex.test(file));

const versionObj = files.reduce((obj, fileName) => {
    const key = fileName.replace('.json', '');
    obj[key] = {
        version: 1,
        url: `https://raw.githubusercontent.com/iThinkyouknow/psalter1912-data/master/${fileName}`
    };
    return obj;
}, {});

console.dir(versionObj);
fs.writeFileSync('../_version.json', JSON.stringify(versionObj, null, 2));

