const { writeFileSync } = require("fs");

const confessions = [
    'The-Heidelberg-Catechism(by-LD).json'
    , 'The-Belgic-Confession.json'
    , 'The-Canons-of-Dordt.json'
    , 'The-Apostles-Creed.json'
    , 'The-Nicene-Creed.json'
    , 'The-Athanasian-Creed.json'
    , 'The-Creed-of-Chalcedon.json'
    , 'Form-for-the-Administration-of-Baptism.json'
    , 'Form-for-Public-Confession-of-Faith.json'
    , 'Form-for-the-Administration-of-the-Lords-Supper.json'
    , 'Form-for-Excommunication.json'
    , 'Form-for-Readmitting-Excommunicated-Persons.json'
    , 'Form-of-Ordination-(or-Installation)-of-Ministers-of-Gods-Word.json'
    , 'Form-of-Ordination-of-Elders-and-Deacons.json'
    , 'Form-for-the-Installation-of-Professors-of-Theology.json'
    , 'Form-for-the-Ordination-(or-Installation)-of-Missionaries.json'
    , 'Form-for-the-Confirmation-of-Marriage-before-the-Church.json'
    , 'Formula-of-Subscription-(RPC).json'
    , 'The-Church-Order.json'
].map(file => require(`./../${file}`));

const alphaNumericRegex = /[a-z0-9]/i;

const result = confessions.map(({ title, type, content, levels_deep }, index) => {
    const result = content.map(({ header, content }, idx) => {
        if (levels_deep === 2) {
            const result = content.map(({ content }, subIndex) => {
                const text = content.map((textFragments) => {
                    return textFragments
                        .filter(({ is_superscript }) => !is_superscript)
                        .map(({ text }) => text)
                        .reduce((result, text) => {
                            if (alphaNumericRegex.test(text.slice(0, 1))) {
                                result += ' ';
                            }
                            result += text;
                            return result;
                        }, '')


                }).join(' ');

                return {
                    index,
                    chIndex: idx,
                    subIndex,
                    title,
                    header,
                    type,
                    text
                }
            });
            return result;
        } else {
            let text = content.map(({ content }) => {
                return content.map((textFragments) => {
                    return textFragments
                        .filter(({ is_superscript }) => !is_superscript)
                        .map(({ text }) => text)
                        .reduce((result, text) => {
                            if (alphaNumericRegex.test(text.slice(0, 1))) {
                                result += ' ';
                            }
                            result += text;
                            return result;
                        }, '')
                })
                    .join('')
            }).join(' ');

            return {
                index,
                chIndex: idx,
                subIndex: null,
                title,
                header,
                type,
                text
            }
        }
    });

    return result;
}).flat(2);

// console.log(JSON.stringify(result[0][1], null, 2));

writeFileSync('./../_CreedsSearchJSON.json', JSON.stringify(result, null, 2));