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

//для темы "преобразование логических выражений"
const min = -500; // так называемый brute-force approach (слишком много кода и логики для подбора нужного диапазона)
const max = 500;
const operators = {
    '>=': (number1, number2) => number1 >= number2,
    '<=': (number1, number2) => number1 <= number2,
    '>': (number1, number2) => number1 > number2,
    '<': (number1, number2) => number1 < number2,
    '=>': (value1, value2) => !value1 || value2,
    '/\\': (value1, value2) => value1 && value2,
    'V': (value1, value2) => value1 || value2,
}