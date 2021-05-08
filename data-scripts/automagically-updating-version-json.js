const fs = require('fs');
const versionJson = require('../_version.json');
console.log(process.argv);
process.argv.slice(2)
    .filter(file => /^_\S+\.json$/.test(file))
    .map(file => file.slice(1))
    .forEach(file => {
        let obj = versionJson[file];
        if (obj) {
            obj.version += 1;
        } else {
            versionJson[file] = {
                version: 1,
                url: `https://raw.githubusercontent.com/iThinkyouknow/psalter1912-data/master/${file}`
            };
        }
    });

fs.writeFileSync('../_version.json', JSON.stringify(versionJson, null, 2));