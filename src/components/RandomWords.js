import randomWords from 'random-words';

function generateWord(WORD_LENGTH) {
    var word;
    while (word == null || word[0].length < WORD_LENGTH) {
        word = randomWords({ exactly: 1, maxLength: WORD_LENGTH })
    };
    word = word[0];
    return word;
};

export { generateWord };