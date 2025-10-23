const taskThemes = {
    1: {},
    2: {},
    3: {
        1: 'Найти время одной записи',
        2: 'Во сколько раз первая запись больше второй'
    },
    4: {},
    5: {},
    6: {
        1: 'Логические выражения'
    },
    7: {
        1: 'сколько всего сущ. последовательностей символов...',
        2: 'максимальное кол-во слов/кодов в языке/коде (универсальная)',
        3: 'кодировочная таблица',
        4: 'структура слова с ограничениями/количество слов',
        5: 'для кодирования значений используется какой-то код',
        6: 'вычисление количества байт памяти для всех номеров',
    },
    8: {},
    9: {}
};

const taskFunctional = {
    1: {},
    2: {},
    3: {
        1: {
            'generateInterface': () => {
                const inputV = createInput({type: 'number', class: 'v-input', width: '60px'});
                const selectSizeV = createSelect({class: 'v-size'}, {
                    'Kb': 'Кб',
                    'Mb': 'Мб'
                });
                selectSizeV.value = 'Mb';
                const divV = createGroupingDiv({title: 'Информационный объём файла:'}, [inputV, selectSizeV]);
                taskCompletingDiv.insertBefore(divV, answerFieldDiv);

                const inputF = createInput({type: 'number', class: 'f-input', width: '60px'});
                const selectSizeF = createSelect({class: 'f-size'}, {
                    'Hz': 'Гц',
                    'KHz': 'КГц'
                });
                selectSizeF.value = 'KHz';
                const divF = createGroupingDiv({title: 'Частота дискретизации:'}, [inputF, selectSizeF]);
                taskCompletingDiv.insertBefore(divF, answerFieldDiv);

                const inputI = createInput({type: 'number', class: 'i-input', width: '40px'});
                const iDesc = document.createElement('p').innerHTML = 'бит';
                const divI = createGroupingDiv({title: 'Глубина кодирования (разрешение):'}, [inputI, iDesc]);
                taskCompletingDiv.insertBefore(divI, answerFieldDiv);

                const selectK = createSelect({class: 'k-select'}, {
                    1: '1',
                    2: '2',
                    4: '4'
                });
                const divK = createGroupingDiv({title: 'Количество каналов:'}, [selectK]);
                taskCompletingDiv.insertBefore(divK, answerFieldDiv);

                const selectRound = createSelect({class: 'round-select'}, {
                    1: 'До целых',
                    2: 'До десятых'
                });
                const divRound = createGroupingDiv({title: 'Округлять:'}, [selectRound]);
                taskCompletingDiv.insertBefore(divRound, answerFieldDiv);
            },
            'generateAnswer': () => {
                let t = 0;

                let V = document.querySelector('.v-input').value;
                const sizeV = document.querySelector('.v-size');
                if(sizeV.value === 'Kb') V *= 1024 * 8;
                else if(sizeV.value === 'Mb') V *= 1024 * 1024 * 8;

                let f = document.querySelector('.f-input').value;
                const sizeF = document.querySelector('.f-size');
                if(sizeF.value === 'KHz') f *= 1000;

                let i = document.querySelector('.i-input').value;
                let k = document.querySelector('.k-select').value;

                const rounding = document.querySelector('.round-select');
                if(rounding.value == 1) t = Math.round(V / (f * i * k));
                else if (rounding.value == 2) t = (Math.round((V / (f * i * k)) * 10)) / 10;

                if(!isNaN(t)) return changeDot(t);
                return '';
            }
        },
        2: {
            'generateInterface': () => {
                const isFEquals = createInput({type: 'checkbox', class: 'f-f'});
                const fDesc = document.createElement('p').innerHTML = 'Частота дискретизации равна';
                const divFEquals = createGroupingDiv({}, [isFEquals, fDesc]);
                taskCompletingDiv.insertBefore(divFEquals, answerFieldDiv);

                const inputF1 = createInput({type: 'number', class: 'f-input1', width: '60px'});
                const f1InputDesc = document.createElement('p').innerHTML = 'Кгц';
                const divF1 = createGroupingDiv({title: 'Частота дискретизации:', class: 'f'}, [inputF1, f1InputDesc]);

                const inputI1 = createInput({type: 'number', class: 'i-input1', width: '40px'});
                const iDesc1 = document.createElement('p').innerHTML = 'бит';
                const divI1 = createGroupingDiv({title: 'Глубина кодирования (разрешение):'}, [inputI1, iDesc1]);

                const selectK1 = document.createElement('p');
                selectK1.innerHTML = '2    (стерео)';
                const divK1 = createGroupingDiv({title: 'Количество каналов:'}, [selectK1]);

                const divMain1 = createGroupingDiv({title: '1 запись:'}, [divF1, divI1, divK1]);
                taskCompletingDiv.insertBefore(divMain1, answerFieldDiv);

                const inputF2 = createInput({type: 'number', class: 'f-input2', width: '60px'});
                const f2InputDesc = document.createElement('p').innerHTML = 'Кгц';
                const divF2 = createGroupingDiv({title: 'Частота дискретизации:', class: 'f'}, [inputF2, f2InputDesc]);

                const inputI2 = createInput({type: 'number', class: 'i-input2', width: '40px'});
                const iDesc2 = document.createElement('p').innerHTML = 'бит';
                const divI2 = createGroupingDiv({title: 'Глубина кодирования (разрешение):'}, [inputI2, iDesc2]);

                const selectK2 = document.createElement('p');
                selectK2.innerHTML = '1    (моно)';
                const divK2 = createGroupingDiv({title: 'Количество каналов:'}, [selectK2]);

                const divMain2 = createGroupingDiv({title: '2 запись:'}, [divF2, divI2, divK2]);
                taskCompletingDiv.insertBefore(divMain2, answerFieldDiv);

                const selectRound = createSelect({class: 'round-select'}, {
                    1: 'До целых',
                    2: 'До десятых'
                });
                const divRound = createGroupingDiv({title: 'Округлять:', class: 'f'}, [selectRound]);
                taskCompletingDiv.insertBefore(divRound, answerFieldDiv);

                isFEquals.addEventListener('change', function(){
                    const fObjects = document.querySelectorAll('.f');
                    if(this.checked){
                        for(let object of fObjects) object.style.display = 'none';
                        selectRound.value = 2;
                    }
                    else for(let object of fObjects) object.style.display = 'block';
                });
            },
            'generateAnswer': () => {
                let answer = 0;

                const isFEquals = document.querySelector('.f-f');
                let f1 = document.querySelector('.f-input1').value;
                if(isFEquals.checked) f1 = 1;
                const i1 = document.querySelector('.i-input1').value;
                const k1 = 2;

                let f2 = document.querySelector('.f-input2').value;
                if(isFEquals.checked) f2 = 1;
                const i2 = document.querySelector('.i-input2').value;
                const k2 = 1;

                const rounding = document.querySelector('.round-select');
                if(rounding.value == 1) answer = Math.round((f1 * i1 * k1) / (f2 * i2 * k2));
                else if(rounding.value == 2) answer = (Math.round(((f1 * i1 * k1) / (f2 * i2 * k2)) * 10)) / 10;

                if(!isNaN(answer)) return changeDot(answer);
                return '';
            }
        }
    },
    4: {},
    5: {},
    6: {
        1:{
            'generateInterface': () => {
                //
                const warning = document.createElement('p');
                warning.innerHTML = 'Если ответ равен 500 или -500, значит ответ на самом деле бесконечность (это ошибка собачки)';
                warning.classList.add('generated-interface');
                warning.style.color = 'red';
                taskCompletingDiv.insertBefore(warning, answerFieldDiv);

                const iscoefficient = createInput({type: 'checkbox', class: 'coefficient'});
                const coefDesc = document.createElement('p').innerHTML = 'Коэффициенты X (оставить поле пустым, если его нет, т.е. равен 1)';
                const divCoef = createGroupingDiv({}, [iscoefficient, coefDesc]);
                taskCompletingDiv.insertBefore(divCoef, answerFieldDiv);

                const answerType = createSelect({class: 'answer-type'}, {
                    'max': 'наибольшее целое число X',
                    'min': 'наименьшее целое число X',
                    'summ': 'сумму целых чисел X',
                    'amount': 'количество целых чисел X'
                });
                const divAnswerType = createGroupingDiv({title: 'Тип ответа:'}, [answerType]);
                taskCompletingDiv.insertBefore(divAnswerType, answerFieldDiv);

                const coefX1 = createInput({type: 'number', class: 'coef-x1', width: '30px'});
                coefX1.classList.add('coef');
                coefX1.style.display = 'none';

                const textX1 = document.createElement('p').innerHTML = 'X';
                const x1Operator = createSelect({class: 'x1-operator'}, {
                    '<': '<',
                    '>': '>',
                    '>=': '>=',
                    '<=': '<='
                });
                const x1 = createInput({type: 'number', class: 'x1-input', width: '40px'});
                const divX1 = createGroupingDiv({title: '1 выражение:'}, [coefX1, textX1, x1Operator, x1]);
                taskCompletingDiv.insertBefore(divX1, answerFieldDiv);

                const x1_x2_Operator = createSelect({class: 'x1-x2-operator'}, {
                    '=>': '=>',
                    'V': 'V'
                });
                const divX1X2 = createGroupingDiv({title: 'Знак между 1 и 2 выражениями:'}, [x1_x2_Operator]);
                taskCompletingDiv.insertBefore(divX1X2, answerFieldDiv);

                const coefX2 = createInput({type: 'number', class: 'coef-x2', width: '30px'});
                coefX2.classList.add('coef');
                coefX2.style.display = 'none';

                const textX2 = textX1;
                const x2Operator = createSelect({class: 'x2-operator'}, {
                    '<': '<',
                    '>': '>',
                    '>=': '>=',
                    '<=': '<='
                });
                const x2 = createInput({type: 'number', class: 'x2-input', width: '40px'});
                const divX2 = createGroupingDiv({title: '2 выражение:'}, [coefX2, textX2, x2Operator, x2]);
                taskCompletingDiv.insertBefore(divX2, answerFieldDiv);

                const betweenOperator = createSelect({class: 'between-operator'}, {
                    '=>': '=>',
                    '/\\': '/\\'
                });
                const divBetween = createGroupingDiv({title: 'Знак между 1 и 2 скобками:'}, [betweenOperator]);
                taskCompletingDiv.insertBefore(divBetween, answerFieldDiv);

                const coefX3 = createInput({type: 'number', class: 'coef-x3', width: '30px'});
                coefX3.classList.add('coef');
                coefX3.style.display = 'none';

                const textX3 = textX1;
                const x3Operator = createSelect({class: 'x3-operator'}, {
                    '<': '<',
                    '>': '>',
                    '>=': '>=',
                    '<=': '<='
                });
                const x3 = createInput({type: 'number', class: 'x3-input', width: '40px'});
                const divX3 = createGroupingDiv({title: '3 выражение:'}, [coefX3, textX3, x3Operator, x3]);
                taskCompletingDiv.insertBefore(divX3, answerFieldDiv);

                const x3_x4_Operator = createSelect({class: 'x3-x4-operator'}, {
                    '=>': '=>',
                    '/\\': '/\\'
                });
                const divX3X4 = createGroupingDiv({title: 'Знак между 3 и 4 выражениями:'}, [x3_x4_Operator]);
                taskCompletingDiv.insertBefore(divX3X4, answerFieldDiv);

                const coefX4 = createInput({type: 'number', class: 'coef-x4', width: '30px'});
                coefX4.classList.add('coef');
                coefX4.style.display = 'none';

                const textX4 = textX1;
                const x4Operator = createSelect({class: 'x4-operator'}, {
                    '<': '<',
                    '>': '>',
                    '>=': '>=',
                    '<=': '<='
                });
                const x4 = createInput({type: 'number', class: 'x4-input', width: '40px'});
                const divX4 = createGroupingDiv({title: '4 выражение:'}, [coefX4, textX4, x4Operator, x4]);
                taskCompletingDiv.insertBefore(divX4, answerFieldDiv);

                const trueFalse = createSelect({class: 'true-false'}, {
                    1: 'истинно',
                    0: 'ложно'
                });
                const divTrueFalse = createGroupingDiv({title: 'Для которого логическое выражение:'}, [trueFalse]);
                taskCompletingDiv.insertBefore(divTrueFalse, answerFieldDiv);

                iscoefficient.addEventListener('change', function(){
                    const coefs = document.querySelectorAll('.coef');
                    if(this.checked){
                        for(let coef of coefs){
                            coef.style.display = 'inline';
                            coef.value = '';
                        }
                    }
                    else for(let coef of coefs) coef.style.display = 'none';
                });
            },
            'generateAnswer': () => {
                const trueNumbers = [];

                const values = {
                    1: {
                        'coef': getValue('.coef-x1', true) || 1,
                        'number': getValue('.x1-input', true),
                        'operator': getValue('.x1-operator')
                    },
                    2: {
                        'coef': getValue('.coef-x2', true) || 1,
                        'number': getValue('.x2-input', true),
                        'operator': getValue('.x2-operator')
                    },
                    3: {
                        'coef': getValue('.coef-x3', true) || 1,
                        'number': getValue('.x3-input', true),
                        'operator': getValue('.x3-operator')
                    },
                    4: {
                        'coef': getValue('.coef-x4', true) || 1,
                        'number': getValue('.x4-input', true),
                        'operator': getValue('.x4-operator')
                    }
                };

                const x1x2Operator = getValue('.x1-x2-operator');
                const x3x4Operator = getValue('.x3-x4-operator');
                const betweenOperator = getValue('.between-operator');
                const expectedResult = getValue('.true-false', true);

                console.log('Values:', values);
                console.log('Operators:', { x1x2Operator, x3x4Operator, betweenOperator });

                for(let i = min; i <= max; i++){
                    try{
                        const expr1 = operators[values[1].operator](i * values[1].coef, values[1].number);
                        const expr2 = operators[values[2].operator](i * values[2].coef, values[2].number);
                        const expr3 = operators[values[3].operator](i * values[3].coef, values[3].number);
                        const expr4 = operators[values[4].operator](i * values[4].coef, values[4].number);

                        const combined1 = operators[x1x2Operator](expr1, expr2);
                        const combined2 = operators[x3x4Operator](expr3, expr4);
                        const finalResult = operators[betweenOperator](combined1, combined2);

                        if(finalResult === Boolean(expectedResult)){
                            trueNumbers.push(i);
                        }
                    } catch (error) {
                        console.error(`Ошибка при i=${i}:`, error);
                    }
                }

                console.log('Найденные числа:', trueNumbers);

                const answerType = getValue('.answer-type');

                if(answerType === 'min') return Math.min(...trueNumbers);
                else if(answerType === 'max') return Math.max(...trueNumbers);
                else if(answerType === 'amount') return trueNumbers.length;
                else if(answerType === 'summ') return trueNumbers.reduce((sum, num) => sum + num, 0);

                return '';
            }
        }
    },
    7: {
        1: {
            'generateInterface': () => {
                const symbols = createInput({type: 'number', class: 'symbols', width: '30px'});
                const symbolDiv = createGroupingDiv({title: 'Количество символов:'}, [symbols]);
                taskCompletingDiv.insertBefore(symbolDiv, answerFieldDiv);

                const rangeText1 = document.createElement('p').innerHTML = 'От';
                const rangeStart = createInput({type: 'number', class: 'range-start', width: '30px'});
                const rangeText2 = document.createElement('p').innerHTML = 'До';
                const rangeEnd = createInput({type: 'number', class: 'range-end', width: '30px'});
                const rangeText3 = document.createElement('p');
                rangeText3.innerHTML = '(от X до X, если дана 1 длина, где X - эта длина)';
                const rangeDiv = createGroupingDiv({title: 'Диапазон длин:', class: 'range-div'}, [rangeText1, rangeStart, rangeText2, rangeEnd, rangeText3]);
                taskCompletingDiv.insertBefore(rangeDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                let variations = 0;
                const symbols = getValue('.symbols', true);
                const rangeStart = getValue('.range-start', true);
                const rangeEnd = getValue('.range-end', true);

                if(symbols === '' || rangeStart === '' || rangeEnd === '') return '';

                if(rangeStart > rangeEnd){
                    if(document.querySelector('.warning') !== null) return '';
                    const rangeDiv = document.querySelector('.range-div');
                    const warning = document.createElement('p');
                    warning.innerHTML = 'Некорректное значение диапазона';
                    warning.classList.add('warning');
                    warning.style.color = 'red';
                    rangeDiv.append(warning);
                    return '';
                }
                else{
                    const warning = document.querySelector('.warning');
                    if(warning !== null) warning.remove();
                }

                for(let i = rangeStart; i <= rangeEnd; i++){
                    variations += symbols ** i;
                }

                return variations;
            }
        },

        2: {
            'generateInterface': () => {
                const alpabet = createInput({type: 'number', class: 'alphabet', width: '30px'});
                const alpabetDiv = createGroupingDiv({title: 'Количество букв в алфавите:'}, [alpabet]);
                taskCompletingDiv.insertBefore(alpabetDiv, answerFieldDiv);

                const symbolsAmount = createInput({type: 'number', class: 'symbols-amount', width: '30px'});
                const symbolsAmountDiv = createGroupingDiv({title: 'Количество букв в слове:'}, [symbolsAmount]);
                taskCompletingDiv.insertBefore(symbolsAmountDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const symbolsAmount = getValue('.symbols-amount', true);
                const alpabet = getValue('.alphabet', true);
                if(symbolsAmount === '' || alpabet === '') return '';
                return alpabet ** symbolsAmount;
            }
        },

        3: {
            'generateInterface': () => {
                const code = createInput({type: 'text', class: 'code', width: '150px'});
                const codeDiv = createGroupingDiv({title: 'Закодированный текст:'}, [code]);
                taskCompletingDiv.insertBefore(codeDiv, answerFieldDiv);
                code.addEventListener('beforeinput', function(ev){if(ev.data !== '0' && ev.data !== '1' && ev.data !== null) ev.preventDefault()});

                const symbolText = document.createElement('p').innerHTML = 'Количество символов в таблице: ';
                const symbolsAmount = createInput({type: 'number', class: 'symbols-amount', width: '30px'});

                const table = document.createElement('table');
                const symTr = document.createElement('tr');
                symTr.style.textAlign = 'center';
                const codeTr = document.createElement('tr');
                table.append(symTr);
                table.append(codeTr);
                symbolsAmount.addEventListener('beforeinput', function(ev){
                    if((ev.data === 'e' || this.value.length === 1) && ev.data !== null) ev.preventDefault();
                    tableDataInputs = {};
                    symBuffer = 0;
                });

                symbolsAmount.addEventListener('input', function(){
                    if(this.value.length === 0) document.querySelectorAll('.table-data').forEach(function(el){el.remove()});
                    symBuffer = getValue('.symbols-amount', true);
                
                    for(let i = 0; i < symBuffer; i++){
                        const symTd = document.createElement('td');
                        symTd.classList.add('table-data');
                        const symInput = createInput({type: 'text', class: 'sym-' + i, width: '12px'});
                        symInput.addEventListener('beforeinput', function(ev){if(this.value.length === 1 && ev.data !== null) ev.preventDefault()})
                        symTd.append(symInput);
                        symTr.append(symTd);

                        const codeTd = document.createElement('td');
                        codeTd.classList.add('table-data');
                        const codeInput = createInput({type: 'number', class: 'code-' + i, width: '60px'});
                        codeInput.addEventListener('beforeinput', function(ev){if(ev.data !== '0' && ev.data !== '1' && ev.data !== null) ev.preventDefault()});
                        codeTd.append(codeInput);
                        codeTr.append(codeTd);
                    }
                });

                const tableDiv = createGroupingDiv({title: 'Таблица кодировки символов:'}, [symbolText, symbolsAmount, table]);
                taskCompletingDiv.insertBefore(tableDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const tableData = {};
                let answer = '';

                for(let i = 0; i < symBuffer; i++){
                    const sym = getValue('.sym-' + i, false);
                    const code = getValue('.code-' + i, false);
                    if(sym === '' || code === '') return '';

                    tableData[code] = sym;
                }

                let code = getValue('.code', false);
                if(code === '') return '';
                let chunckCode = '';
                for(let i = 0; i < code.length; i++){
                    chunckCode += code[i];

                    if(tableData[chunckCode]){
                        answer += tableData[chunckCode];
                        chunckCode = '';
                    }
                }

                return answer;
            }
        },

        4: {
            'generateInterface': () => {
                const n = createInput({type: 'number', class: 'n', width: '30px'});
                const nDiv = createGroupingDiv({title: 'Количество букв в алфавите:'}, [n]);
                taskCompletingDiv.insertBefore(nDiv, answerFieldDiv);

                const pattern = createInput({type: 'text', class: 'pattern', width: '150px'});
                const patternDiv = createGroupingDiv({title: 'Шаблон слова, который составляется по условию (одинаковые буквы обозначаются одинаковыми символами, например "abcddcba", где a, b, c, d - обозначение букв):'}, [pattern]);
                taskCompletingDiv.insertBefore(patternDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const n = getValue('.n', true);
                const pattern = getValue('.pattern', false);
                if(pattern === '' || n === '') return '';

                let usedptrns = [];
                let answer = 1;
                for(let i = 0; i < pattern.length; i++){
                    if(usedptrns.includes(pattern[i])) continue;
                    usedptrns.push(pattern[i]);
                    answer *= n-i;
                    console.log(pattern[i] + ', ' + answer + '  ' + usedptrns);
                    
                }

                return answer;
            }
        },

        5: {
            'generateInterface': () => {
                const num = createInput({type: 'number', class: 'num', width: '30px'});
                const numDiv = createGroupingDiv({title: 'Код какой системы счисления используется:'}, [num]);
                taskCompletingDiv.insertBefore(numDiv, answerFieldDiv);

                const rangeText1 = document.createElement('p').innerHTML = 'От';
                const rangeStart = createInput({type: 'number', class: 'range-start', width: '60px'});
                const rangeText2 = document.createElement('p').innerHTML = 'До';
                const rangeEnd = createInput({type: 'number', class: 'range-end', width: '60px'});
                const rangeDiv = createGroupingDiv({title: 'Интервал чисел:', class: 'range-div'}, [rangeText1, rangeStart, rangeText2, rangeEnd]);
                taskCompletingDiv.insertBefore(rangeDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const num = getValue('.num', true);
                const rangeStart = getValue('.range-start', true);
                const rangeEnd = getValue('.range-end', true);
                if(num === '' || rangeStart === '' || rangeEnd === '') return '';

                const diff = rangeEnd - rangeStart;
                let i = 1;
                while(true){
                    if(num**i >= diff) return i;
                    i++;
                }
            }
        },

        6: {
            'generateInterface': () => {
                const symAmount = createInput({type: 'number', class: 'sym-amount', width: '30px'});
                const sAmountDiv = createGroupingDiv({title: 'Длина номера:'}, [symAmount]);
                taskCompletingDiv.insertBefore(sAmountDiv, answerFieldDiv);

                const n = createInput({type: 'number', class: 'n', width: '30px'});
                const nDiv = createGroupingDiv({title: 'Количество символов для кодирования (вместе с цифрами и заглавными буквами):'}, [n]);
                taskCompletingDiv.insertBefore(nDiv, answerFieldDiv);

                const numAmount = createInput({type: 'number', class: 'num-amount', width: '40px'});
                const numAmountDiv = createGroupingDiv({title: 'Количество номеров:'}, [numAmount]);
                taskCompletingDiv.insertBefore(numAmountDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const symAmount = getValue('.sym-amount', true);
                const n = getValue('.n', true);
                const num = getValue('.num-amount', true);
                if(symAmount === '' || n === '' || num === '') return '';
                
                let bit = 1;
                while(true){
                    if(2**bit >= n) break;
                    bit++
                }
                
                let minByte = 0;
                if(symAmount*bit % 8 !== 0) minByte = Math.ceil(symAmount*bit / 8);
                else minByte = symAmount*bit / 8;

                return num * minByte;
            }
        },

        7: {
            'generateInterface': () => {},
            'generateAnswer': () => {}
        },
    },
    8: {},
    9: {}
};