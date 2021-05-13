const fs = require('fs');
const versionJson = require('../_version.json');
console.log(process.argv);
process.argv.slice(2)
    .filter(file => /^_\S+\.json$/.test(file))
    .map(file => file.slice(1))
    .forEach(file => {
        let key = file.replace('.json', '');
        let obj = versionJson[key];
        if (obj) {
            obj.version += 1;
        } else {
            versionJson[key] = {
                version: 1,
                url: `https://raw.githubusercontent.com/iThinkyouknow/psalter1912-data/master/${file}`
            };
        }
    });
versionJson.version.version += 1;

fs.writeFileSync('../_version.json', JSON.stringify(versionJson, null, 2));