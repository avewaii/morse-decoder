const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {  // expr ="00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010"
    
    const regExp = /\S\S\S\S\S\S\S\S\S\S/g; //строка из 10 любых символов

    if (expr.length % 10 !== 0) {
        let count10symbol = (expr.length / 10).toFixed; //сколько раз 10 символов помещается в expr
        let indexOfAdditionalSymbols = expr.length - count10symbol * 10; // количество "лишних" знаков

        let indForZeros = expr.length - indexOfAdditionalSymbols; // с какого элемента вставлять нули
        
        expr = expr.split(''); //перевод из строки в массив

        while (expr.length % 10 !== 0) {                //пока символов в expr !== 10, вставлять 0
            let i = expr.length;
            expr = expr.splice(indForZeros, 0, "0");
            i++;
        };
    };

    let arrOfStr = expr.match(regExp); // ["0000101010", "0000001011", "0010101011", "0000000010", "**********", "0000001111", "0000000010"]

    arrOfStr = arrOfStr.map(function(elem) {  // ["00", "00", "10", "10", "10"]
        return elem.match(/\S\S/g);           // ["00", "00", "00", "10", "11"]
    });                                       // ["00", "10", "10", "10", "11"]

    let decodeArr = [];
    for (let i = 0; i<= arrOfStr.length-1; i++){    
        for(let j = 0; j <= arrOfStr[i].length; j++){
            if(arrOfStr[i][j] == "00"){
                decodeArr.push(' ');
            } else if (arrOfStr[i][j] == "10") {
                decodeArr.push('.');
            } else if (arrOfStr[i][j] == "11"){
                decodeArr.push('-');
            } else if (arrOfStr[i][j] == "**"){
                decodeArr.push('*');
            }
        };
    };

    decodeArr = decodeArr.join('');

    decodeArr = decodeArr.match(/.{1,5}/g); // [' ....', ' --..']

    let morseCode = []; // 
    for (let i = 0; i <= decodeArr.length-1; i++) { 
        morseCode.push(decodeArr[i].replace(/\s/g, ''));
    };

   
    let decodedStr = [];    // ['h', 'i']
    for ( let i = 0; i <= morseCode.length; i++) {
        for (let key in MORSE_TABLE) {
            if (key == morseCode[i]) {
                decodedStr.push(MORSE_TABLE[key]);
            };
        };
        if (morseCode[i] == '*****') {
            decodedStr.push(' ');
        };
    };  
    
    decodedStr = decodedStr.join('');
    return decodedStr;
}

//decode("0010101010**********0010101010");

module.exports = {
    decode
}