//вспомогающие функции для генерации интерфейса
function createGroupingDiv(divProperties, elements){
    const div = document.createElement('div');
    div.classList.add('generated-interface');
    if(divProperties.width) div.style.width = divProperties.width;
    if(divProperties.class) div.classList.add(divProperties.class);
    if(divProperties.title){
        const title = document.createElement('p');
        title.innerHTML = divProperties.title;
        div.append(title);
    }
    for(let element of elements) div.append(element);
    return div;
}

function createSelect(selectProperties, optionProperties){
    const select = document.createElement('select');
    if(selectProperties.class) select.classList.add(selectProperties.class);
    for(let value in optionProperties){
        const option = document.createElement('option');
        option.value = value;
        option.innerHTML = optionProperties[value];
        select.append(option);
    }
    return select;
}

function createInput(inputProperties){
    const input = document.createElement('input');
    if(inputProperties.type) input.type = inputProperties.type;
    if(inputProperties.class) input.classList.add(inputProperties.class);
    if(inputProperties.width) input.style.width = inputProperties.width;
    return input;
}

function changeDot(floatNumber){
    return (floatNumber + '').replace('.', ',');
}

function getValue(selector, isNumber = false){
    const element = document.querySelector(selector);
    if (!element) return isNumber ? '' : '';
    if(isNumber){
        if(isNaN(element.value)) return '';
        else return element.value*1;
    }
    else return element.value || '';
}

//для темы "системы счисления"
const numbers = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
}
const reverseNumbers = {};
for(let number in numbers) reverseNumbers[numbers[number]] = number.toUpperCase();

function to10Notation(number, notation){
    let number10 = 0;
    const coockedNumber = [];
    for(let i = number.length - 1; i >= 0; i--){
        if(parseInt(number[i]) >= notation) return '';
        if(number[i].toLowerCase() in numbers){
            if(numbers[number[i].toLowerCase()] >= notation) return '';
            coockedNumber.push(numbers[number[i].toLowerCase()]);
            continue;
        }
        coockedNumber.push(parseInt(number[i]));
    }
    for(let i = 0; i < coockedNumber.length; i++) number10 += coockedNumber[i] * notation**i;
    return Number.isNaN(number10) ? '' : number10;
}

function toOtherNotation(number10, notation){
    if(number10 === 0 || number10 == null) return '0';
    if(notation < 2 || notation > 16 || notation == null) return '';

    let number = [];

    let divinedNum = number10;
    while(divinedNum > 0){
        const curNumber = divinedNum % notation;
        number.unshift(curNumber > 9 ? reverseNumbers[curNumber] : curNumber);

        divinedNum = Math.floor(divinedNum / notation);
    }
    return ''.concat(...number);
}

//для темы "преобразование логических выражений"
const min = -500; // так называемый brute-force approach (слишком много кода и логики для подбора нужного диапазона, мне лень ^-^)
const max = 500;
const operators = { //также для темы "системы счисления"
    '>=': (number1, number2) => number1 >= number2,
    '<=': (number1, number2) => number1 <= number2,
    '>': (number1, number2) => number1 > number2,
    '<': (number1, number2) => number1 < number2,
    '=>': (value1, value2) => !value1 || value2,
    '/\\': (value1, value2) => value1 && value2,
    'V': (value1, value2) => value1 || value2,

    '+': (number1, number2) => number1 + number2,
    '-': (number1, number2) => number1 - number2,
    '*': (number1, number2) => number1 * number2,
    ':': (number1, number2) => number1 / number2
}

//для темы "кодирование информации"
let symBuffer = 0;