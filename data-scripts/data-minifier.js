const fs = require('fs');
const minifiedFilesRegex = /\.json$/i;
const unminifiedFilesRegex = /_\S+\.json$/i;

const getFileNames = (regex = minifiedFilesRegex) => {
    return fs
        .readdirSync(`${__dirname}/../`)
        .filter((fileName) => regex.test(fileName));
};

const apply = (val, fn) => fn(val);

const compose = (fns) => (val) => fns.reduce(apply, val);

const getFile = (fileName) => ({obj: require(`../${fileName}`), fileName});
const setDestinationFileName = (transformFn = (name) => name) => ((obj) => {
    obj.fileName = transformFn(obj.fileName);
    return obj;
});
const removePrefixFromName = (name) => name.slice(1);
const stringify = (indent) => ({obj, fileName}) => ({str: JSON.stringify(obj, null, indent), fileName});
const _writeToFile = (filePrefix = '') => ({ str, fileName }) => fs.writeFileSync(`${__dirname}/../${filePrefix}${fileName}`, str);
const writeToFile = _writeToFile();
const writeToFilePrefix = _writeToFile('_');
const trace = (obj) => console.dir(obj, {colors: true, depth: null});


const minify = (fileNames) => fileNames
.map(compose([
    getFile
    , setDestinationFileName(removePrefixFromName)
    , stringify()
    , writeToFile
]));

const deminify = (fileNames) => fileNames
.map(compose([
    getFile
    , stringify(4)
    , writeToFilePrefix
]));

trace(getFileNames(unminifiedFilesRegex));
minify(getFileNames(unminifiedFilesRegex));
// trace(getFileNames(minifiedFilesRegex));
// deminify(getFileNames(minifiedFilesRegex));



