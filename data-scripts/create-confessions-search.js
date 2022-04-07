const { writeFileSync } = require("fs");

const confessions = [
    '_The-Heidelberg-Catechism(by-LD).json'
    , '_The-Belgic-Confession.json'
    , '_The-Canons-of-Dordt.json'
    , '_The-Apostles-Creed.json'
    , '_The-Nicene-Creed.json'
    , '_The-Athanasian-Creed.json'
    , '_The-Creed-of-Chalcedon.json'
    , '_Form-for-the-Administration-of-Baptism.json'
    , '_Form-for-Public-Confession-of-Faith.json'
    , '_Form-for-the-Administration-of-the-Lords-Supper.json'
    , '_Form-for-Excommunication.json'
    , '_Form-for-Readmitting-Excommunicated-Persons.json'
    , '_Form-of-Ordination-(or-Installation)-of-Ministers-of-Gods-Word.json'
    , '_Form-of-Ordination-of-Elders-and-Deacons.json'
    , '_Form-for-the-Installation-of-Professors-of-Theology.json'
    , '_Form-for-the-Ordination-(or-Installation)-of-Missionaries.json'
    , '_Form-for-the-Confirmation-of-Marriage-before-the-Church.json'
    , '_Formula-of-Subscription-(RPC).json'
    , '_The-Church-Order.json'
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