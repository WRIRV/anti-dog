const taskThemes = {
    1: {},
    2: {},
    3: {
        1: 'Найти время одной записи',
        2: 'Во сколько раз первая запись больше второй'
    },
    4: {
        1: 'Перевод из одной системы в другую (универсальное)',
        2: 'Арифметика',
        3: 'Какое число следует/предшествует',
        4: 'Определить основание X системы счисления',
        5: 'Определить количество цифр в записи числа'
    },
    5: {
        1: 'Размер файла и его передача через соединение',
        2: 'Загрузка файлов куда-либо',
        3: 'Найти средний размер одного файла',
        4: 'Время передачи файла по каналу связи',
        5: 'Файл, который можно передать за это же время'
    },
    6: {
        1: 'Логические выражения'
    },
    7: {
        1: 'Сколько всего сущ. последовательностей символов...',
        2: 'Максимальное кол-во слов/кодов в языке/коде (универсальное)',
        3: 'Кодировочная таблица',
        4: 'Структура слова с ограничениями/количество слов',
        5: 'Для кодирования значений используется какой-то код',
        6: 'Вычисление количества байт памяти для всех номеров',
        7: 'Вычисление количества байт памяти для одного пользователя',
        8: 'Вычисление байт для определённого кол-ва пользователей'
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
                let V = getValue('.v-input', true);
                const VSize = getValue('.v-size', false);
                let f = getValue('.f-input', true);
                const fSize = getValue('.f-size', false);
                const i = getValue('.i-input', true);
                const k = getValue('.k-select', true);
                const roundSelect = getValue('.round-select', true);
                console.log(V + ' ' + VSize, f + ' ' + fSize);
                if(V === '' || VSize === '' || f === '' || fSize === '' || i === '' || k === '' || roundSelect === '') return '';

                if(VSize === 'Kb') V *= 1024 * 8;
                else if(VSize === 'Mb') V *= 1024 * 1024 * 8;

                if(fSize === 'KHz') f *= 1000;

                const time = V / (f * i * k);
                if(roundSelect == 1) return Math.round(time);
                else if (roundSelect == 2) return changeDot(Math.round(time * 10) / 10);
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
                const isFEquals = document.querySelector('.f-f');
                let f1 = getValue('.f-input1', true);
                const i1 = getValue('.i-input1', true);
                const k1 = 2;
                let f2 = getValue('.f-input2', true);
                const i2 = getValue('.i-input2', true);
                const k2 = 1;
                const roundSelect = getValue('.round-select', true);
                if(isFEquals.checked) f1 = 1;
                if(isFEquals.checked) f2 = 1;
                if(f1 === '' || i1 === '' || f2 === '' || i2 === '') return '';

                const answer = (f1 * i1 * k1) / (f2 * i2 * k2);
                if(roundSelect == 1) return Math.round(answer);
                else if(roundSelect == 2) return changeDot(Math.round(answer * 10) / 10);
            }
        }
    },
    4: {
        1: {
            'generateInterface': () => {
                const number = createInput({type: 'text', class: 'number', width: '50px'});
                const numberText = document.createElement('p').innerHTML = '\tв системе счисления:\t';
                const numberNotation = createInput({type: 'number', class: 'number-notation', width: '30px'});
                const numberDiv = createGroupingDiv({title: 'Число:'}, [number, numberText, numberNotation]);
                taskCompletingDiv.insertBefore(numberDiv, answerFieldDiv);

                const answerNotation = createInput({type: 'number', class: 'answer-notation', width: '30px'});
                const answerText = document.createElement('p').innerHTML = '\tсистему счисления';
                const answerDiv = createGroupingDiv({title: 'Перевести в:'}, [answerNotation, answerText]);
                taskCompletingDiv.insertBefore(answerDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const number = getValue('.number', false);
                const numberNotation = getValue('.number-notation', true);
                const answerNotation = getValue('.answer-notation', true);
                if(number === '' || numberNotation === '' || answerNotation === '') return '';
                
                const number10 = to10Notation(number, numberNotation);

                return toOtherNotation(number10, answerNotation);
            }
        },

        2: {
            'generateInterface': () => {
                const numberNotation = createInput({type: 'number', class: 'numbers-notation', width: '30px'});
                const numberText = document.createElement('p').innerHTML = '\tсистеме счисления:';
                const numberDiv = createGroupingDiv({title: 'Числа, записанные в:'}, [numberNotation, numberText]);
                numberDiv.style.marginBottom = '20px';
                taskCompletingDiv.insertBefore(numberDiv, answerFieldDiv);

                const number1 = createInput({type: 'text', class: 'number1', width: '50px'});
                const operator = createSelect({class: 'operator'}, {
                    '+': '+',
                    '-': '-',
                    '*': '*',
                    ':': ':'
                });
                const number2 = createInput({type: 'text', class: 'number2', width: '50px'});
                const expDiv = createGroupingDiv({}, [number1, operator, number2]);
                taskCompletingDiv.insertBefore(expDiv, answerFieldDiv);

                const answerNotation = createInput({type: 'number', class: 'answer-notation', width: '30px'});
                const answerText = document.createElement('p').innerHTML = '\tсистеме счисления';
                const answerDiv = createGroupingDiv({title: 'Записать в:'}, [answerNotation, answerText]);
                taskCompletingDiv.insertBefore(answerDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const numbersNotation = getValue('.numbers-notation', true);
                const number1 = getValue('.number1', false);
                const number2 = getValue('.number2', false);
                const operator = getValue('.operator', false);
                const answerNotation = getValue('.answer-notation', true);
                if(numbersNotation === '' || number1 === '' || number2 === '' || operator === '' || answerNotation === '') return '';
                
                const metaAnswer = operators[operator](to10Notation(number1, numbersNotation), to10Notation(number2, numbersNotation));
                return toOtherNotation(metaAnswer, answerNotation);
            }
        },

        3: {
            'generateInterface': () => {
                const numberNotation = createInput({type: 'number', class: 'number-notation', width: '30px'});
                const numberDiv = createGroupingDiv({title: 'Система счисления:'}, [numberNotation]);
                taskCompletingDiv.insertBefore(numberDiv, answerFieldDiv);

                const number = createInput({type: 'text', class: 'number', width: '50px'});
                const numDiv = createGroupingDiv({title: 'Число:'}, [number]);
                taskCompletingDiv.insertBefore(numDiv, answerFieldDiv);

                const operation = createSelect({class: 'operation'}, {
                    '0': 'следует',
                    '1': 'предшествует'
                });
                const opDiv = createGroupingDiv({title: 'Найти число, которое:'}, [operation]);
                taskCompletingDiv.insertBefore(opDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const numberNotation = getValue('.number-notation', true);
                const number = getValue('.number', false);
                const operation = getValue('.operation', true);
                if(numberNotation === '' || number === '' || operation === '') return '';

                const changedNumber = to10Notation(number, numberNotation);
                return operation ? toOtherNotation(changedNumber - 1, numberNotation) : toOtherNotation(changedNumber + 1, numberNotation);
            }
        },

        4: {
            'generateInterface': () => {
                const number1 = createInput({type: 'text', class: 'number1', width: '50px'});
                number1.style.fontSize = '24px';
                const num1Notation = createInput({type: 'number', class: 'number1-notation', width: '30px'});
                const expText1 = document.createElement('p').innerHTML = '\t=\t';
                const number2 = createInput({type: 'text', class: 'number2', width: '50px'});
                number2.style.fontSize = '24px';
                const expText2 = document.createElement('p').innerHTML = '\tX\t';
                const expDiv = createGroupingDiv({title: 'Напиши уравнение:'}, [number1, num1Notation, expText1, number2, expText2]);
                taskCompletingDiv.insertBefore(expDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const number1 = getValue('.number1', false);
                const num1Notation = getValue('.number1-notation', true);
                const number2 = getValue('.number2', false);
                if(number1 === '' || number2 === '' || num1Notation === '') return '';

                const number10 = to10Notation(number1, num1Notation);
                let notation = 2;
                while(toOtherNotation(number10, notation) != number2){
                    notation++;
                    if(notation >= 16) return '';
                }
                return notation;
            }
        },

        5: {
            'generateInterface': () => {
                const numNotation = createInput({type: 'number', class: 'number-notation', width: '30px'});
                const numNotationDiv = createGroupingDiv({title: 'Число в системе счисления:'}, [numNotation]);
                taskCompletingDiv.insertBefore(numNotationDiv, answerFieldDiv);

                const number = createInput({type: 'text', class: 'number', width: '50px'});
                const numberDiv = createGroupingDiv({title: 'Число:'}, [number]);
                taskCompletingDiv.insertBefore(numberDiv, answerFieldDiv);

                const nums = createInput({type: 'text', class: 'nums', width: '30px'});
                const numsDiv = createGroupingDiv({title: 'Определить количество каких цифр:'}, [nums]);
                taskCompletingDiv.insertBefore(numsDiv, answerFieldDiv);

                const answerNotation = createInput({type: 'number', class: 'answer-notation', width: '30px'});
                const answerNotationDiv = createGroupingDiv({title: 'В эквиваленте числа какой системы счисления:'}, [answerNotation]);
                taskCompletingDiv.insertBefore(answerNotationDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const number = getValue('.number', false);
                const numNotation = getValue('.number-notation', true);
                const nums = getValue('.nums', false);
                const answerNotation = getValue('.answer-notation', true);
                if(number === '' || numNotation === '' || nums === '' || answerNotation === '') return '';

                let numsCounter = 0;
                const trueNumber = toOtherNotation(to10Notation(number, numNotation), answerNotation);
                for(let num of trueNumber) num === nums && numsCounter++;
                return numsCounter;
            }
        }
    },
    5: {
        1: {
            'generateInterface': () => {
                const fileSize = createInput({type: 'number', class: 'file-size', width: '40px'});
                const metric = createSelect({class: 'metric'}, {
                    'Kbyte': 'Кбайт',
                    'byte': 'байт'
                });
                const fsDiv = createGroupingDiv({title: 'Файл размером:'}, [fileSize, metric]);
                taskCompletingDiv.insertBefore(fsDiv, answerFieldDiv);

                const minutes = createInput({type: 'number', class: 'minutes', width: '30px'});
                const minText1 = document.createElement('p').innerHTML = '\tмин\t';
                const seconds = createInput({type: 'number', class: 'seconds', width: '30px'});
                const secText1 = document.createElement('p').innerHTML = '\tсек';
                const timeDiv = createGroupingDiv({title: 'Время загрузки файлов:'}, [minutes, minText1, seconds, secText1]);
                taskCompletingDiv.insertBefore(timeDiv, answerFieldDiv);

                const finalMinutes = createInput({type: 'number', class: 'final-minutes', width: '30px'});
                const minText2 = document.createElement('p').innerHTML = '\tмин\t';
                const finalSeconds = createInput({type: 'number', class: 'final-seconds', width: '30px'});
                const secText2 = document.createElement('p').innerHTML = '\tсек';
                const timeDesc = document.createElement('p');
                timeDesc.innerHTML = '(оставить минуты пустыми, если их нет)';
                const finalTimeDiv = createGroupingDiv({title: 'Должно передаваться в течение:'}, [finalMinutes, minText2, finalSeconds, secText2, timeDesc]);
                taskCompletingDiv.insertBefore(finalTimeDiv, answerFieldDiv);

                const answerMetric = createSelect({class: 'answer-metric'}, {
                    'Kbyte': 'Кбайт',
                    'byte': 'байт'
                });
                const metricDiv = createGroupingDiv({title: 'Ответ указать в:'}, [answerMetric]);
                taskCompletingDiv.insertBefore(metricDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                let fileSize = getValue('.file-size', true);
                const metric = getValue('.metric', false);
                const minutes = getValue('.minutes', true) || 0;
                const seconds = getValue('.seconds', true);
                const finalMinutes = getValue('.final-minutes', true) || 0;
                const finalSeconds = getValue('.final-seconds', true);
                const answerMetric = getValue('.answer-metric', false);
                if(fileSize === '' || metric === '' || seconds === '' || finalSeconds === '' || answerMetric === '') return '';

                if(metric === 'Kbyte') fileSize *= 1024*8;
                else if(metric === 'byte') fileSize *= 8;

                const time = minutes*60 + seconds;
                const finalTime = finalMinutes*60 + finalSeconds;
                let ioSpeed = 0;
                let finalSize = 0;
                ioSpeed = fileSize / time;
                finalSize = ioSpeed * finalTime;

                if(answerMetric === 'Kbyte') return finalSize /= 8*1024;
                else if(answerMetric === 'byte') return finalSize /= 8;
            }
        },

        2: {
            'generateInterface': () => {
                const fileAmount = createInput({type: 'number', class: 'file-amount', width: '30px'});
                const FAText = document.createElement('p').innerHTML = '\tфайлов';
                const FADiv = createGroupingDiv({title: 'Количество файлов:'}, [fileAmount, FAText]);
                taskCompletingDiv.insertBefore(FADiv, answerFieldDiv);

                const fileSize = createInput({type: 'number', class: 'file-size', width: '50px'});
                const metric = createSelect({class: 'metric'}, {
                    'byte': 'байт',
                    'Kbyte': 'Кбайт'
                });
                const fsDiv = createGroupingDiv({title: 'Средний размер файлов:'}, [fileSize, metric]);
                taskCompletingDiv.insertBefore(fsDiv, answerFieldDiv);

                const minutes = createInput({type: 'number', class: 'minutes', width: '30px'});
                const minText = document.createElement('p').innerHTML = '\tмин\t';
                const seconds = createInput({type: 'number', class: 'seconds', width: '30px'});
                const secText = document.createElement('p').innerHTML = '\tсек';
                const timeDesc = document.createElement('p');
                timeDesc.innerHTML = '(оставить минуты пустыми, если их нет)';
                const timeDiv = createGroupingDiv({title: 'Время загрузки файлов:'}, [minutes, minText, seconds, secText, timeDesc]);
                taskCompletingDiv.insertBefore(timeDiv, answerFieldDiv);

                const answerMetric = createSelect({class: 'answer-metric'}, { //ОТВЕТ МОЖЕТ БЫТЬ И НАХОЖДЕНИЕ РАЗМЕРА ФАЙЛА
                    'Kbit': 'Кбит/с',
                    'bit': 'бит/с'
                });
                const metricDiv = createGroupingDiv({title: 'Ответ указать в:'}, [answerMetric]);
                taskCompletingDiv.insertBefore(metricDiv, answerFieldDiv);

                const answerRound = createSelect({class: 'answer-round'}, {
                    '0': 'До целых',
                    '1': 'До десятых'
                });
                const roundDiv = createGroupingDiv({title: 'Ответ округлить:'}, [answerRound]);
                taskCompletingDiv.insertBefore(roundDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const fileAmount = getValue('.file-amount', true);
                let fileSize = getValue('.file-size', true);
                const metric = getValue('.metric', false);
                const minutes = getValue('.minutes', true) || 0;
                const seconds = getValue('.seconds', true);
                const answerMetric = getValue('.answer-metric', false);
                const answerRound = getValue('.answer-round', false);
                if(fileAmount === '' || fileSize === '' || metric === '' || seconds === '' || answerMetric === '' || answerRound === '') return '';

                if(metric === 'Kbyte') fileSize *= 1024*8 * fileAmount;
                else if(metric === 'byte') fileSize *= 8 * fileAmount;

                if(answerMetric === 'Kbit') fileSize /= 1024;
                else if(answerMetric === 'bit') fileSize = fileSize;

                const time = minutes*60 + seconds;
                let ioSpeed = fileSize / time;
                if(answerRound === '0') return Math.round(ioSpeed);
                else if(answerRound === '1') return changeDot(Math.round(ioSpeed * 10) / 10);
            }
        },

        3: {
            'generateInterface': () => {
                const fileAmount = createInput({type: 'number', class: 'file-amount', width: '30px'});
                const FAText = document.createElement('p').innerHTML = '\tфайлов';
                const FADiv = createGroupingDiv({title: 'Количество файлов:'}, [fileAmount, FAText]);
                taskCompletingDiv.insertBefore(FADiv, answerFieldDiv);

                const time = createInput({type: 'number', class: 'time', width: '30px'});
                const timeText = document.createElement('p').innerHTML = '\tсекунд';
                const timeDiv = createGroupingDiv({title: 'Загрузка длилась:'}, [time, timeText]);
                taskCompletingDiv.insertBefore(timeDiv, answerFieldDiv);

                const ioSpeed = createInput({type: 'number', class: 'io-speed', width: '40px'});
                const ioMetric = createSelect({class: 'io-metric'}, {
                    'Kbit': 'Кбит/сек',
                    'bit': 'бит/сек'
                });
                const ioDiv = createGroupingDiv({title: 'Скорость передачи данных:'}, [ioSpeed, ioMetric]);
                taskCompletingDiv.insertBefore(ioDiv, answerFieldDiv);

                const answerMetric = createSelect({class: 'answer-metric'}, {
                    'Kbyte': 'Кбайт',
                    'byte': 'байт'
                });
                const metricDiv = createGroupingDiv({title: 'Ответ указать в:'}, [answerMetric]);
                taskCompletingDiv.insertBefore(metricDiv, answerFieldDiv);

                const answerRound = createSelect({class: 'answer-round'}, {
                    '0': 'До целых',
                    '1': 'До десятых'
                });
                const roundDiv = createGroupingDiv({title: 'Ответ округлить:'}, [answerRound]);
                taskCompletingDiv.insertBefore(roundDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const fileAmount = getValue('.file-amount', true);
                const time = getValue('.time', true);
                let ioSpeed = getValue('.io-speed', true);
                const ioMetric = getValue('.io-metric', false);
                const answerMetric = getValue('.answer-metric', false);
                const answerRound = getValue('.answer-round', false);
                if(fileAmount === '' || time === '' || ioSpeed === '' || ioMetric === '' || answerMetric === '' || answerRound === '') return '';

                if(ioMetric === 'Kbit') ioSpeed *= 1024;
                else if(ioMetric === 'bit') ioSpeed = ioSpeed;

                let fileSize = time * ioSpeed / fileAmount;
                if(answerMetric === 'Kbyte') fileSize /= 8*1024;
                else if(answerMetric === 'byte') fileSize /= 8;

                if(answerRound === '0') return Math.round(fileSize);
                else if(answerRound === '1') return changeDot(Math.round(fileSize * 10) / 10);
            }
        },

        4: {
            'generateInterface': () => {
                const ioSpeed = createInput({type: 'number', class: 'io-speed', width: '50px'});
                const ioText = document.createElement('p').innerHTML = '\tбит/с';
                const ioDiv = createGroupingDiv({title: 'Пропускная способность канала свзяи:'}, [ioSpeed, ioText]);
                taskCompletingDiv.insertBefore(ioDiv, answerFieldDiv);

                const fileSize = createInput({type: 'number', class: 'file-size', width: '50px'});
                const metric = createSelect({class: 'metric'}, {
                    'Kbyte': 'Кбайт',
                    'byte': 'байт'
                });
                const fsDiv = createGroupingDiv({title: 'Размер файла:'}, [fileSize, metric]);
                taskCompletingDiv.insertBefore(fsDiv, answerFieldDiv);

                const timeMetric = createSelect({class: 'time-metric'}, {
                    'second': 'Секундах',
                    'minute': 'Минутах'
                });
                const TMDiv = createGroupingDiv({title: 'Ответ записать в:'}, [timeMetric]);
                taskCompletingDiv.insertBefore(TMDiv, answerFieldDiv);

                const answerRound = createSelect({class: 'answer-round'}, {
                    '0': 'До целых',
                    '1': 'До десятых'
                });
                const roundDiv = createGroupingDiv({title: 'Ответ округлить:'}, [answerRound]);
                taskCompletingDiv.insertBefore(roundDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const ioSpeed = getValue('.io-speed', true);
                let fileSize = getValue('.file-size', true);
                const timeMetric = getValue('.time-metric', false);
                const metric = getValue('.metric', false);
                const answerRound = getValue('.answer-round', false);
                if(ioSpeed === '' || fileSize === '' || metric === '' || answerRound === '') return '';

                if(metric === 'Kbyte') fileSize *= 1024*8;
                else if(metric === 'byte') fileSize *= 8;

                let time = 0;
                if(timeMetric === 'second') time = fileSize / ioSpeed;
                else if(timeMetric === 'minute') time = fileSize / ioSpeed / 60;

                if(answerRound === '0') return Math.round(time);
                else if(answerRound === '1') return changeDot(Math.round(time * 10) / 10);
            }
        },

        5: {
            'generateInterface': () => {

            },
            'generateAnswer': () => {
                return '';
            }
        },

        6: {
            'generateInterface': () => {

            },
            'generateAnswer': () => {
                return '';
            }
        }
    },
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
                let i = 0;
                while(true){
                    i++;
                    if(num**i >= diff) return i;
                    if(i >= 20) return '';
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
                
                let bit = 0;
                while(true){
                    bit++;
                    if(2**bit >= n) break;
                    if(bit >= 20) return '';
                }
                
                let minByte = 0;
                if(symAmount*bit % 8 !== 0) minByte = Math.ceil(symAmount*bit / 8);
                else minByte = symAmount*bit / 8;

                return num * minByte;
            }
        },

        7: {
            'generateInterface': () => {
                const symAmount = createInput({type: 'number', class: 'sym-amount', width: '30px'});
                const sAmountDiv = createGroupingDiv({title: 'Длина номера:'}, [symAmount]);
                taskCompletingDiv.insertBefore(sAmountDiv, answerFieldDiv);

                const n = createInput({type: 'number', class: 'n', width: '30px'});
                const nDiv = createGroupingDiv({title: 'Количество символов для кодирования (вместе с цифрами и заглавными буквами):'}, [n]);
                taskCompletingDiv.insertBefore(nDiv, answerFieldDiv);

                const users = createInput({type: 'number', class: 'users', width: '50px'});
                const usersDiv = createGroupingDiv({title: 'Количество пользователей:'}, [users]);
                taskCompletingDiv.insertBefore(usersDiv, answerFieldDiv);

                const inf = createInput({type: 'number', class: 'inf', width: '50px'});
                const infDiv = createGroupingDiv({title: 'Сколько потребовалось байт для хранения:'}, [inf]);
                taskCompletingDiv.insertBefore(infDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const symAmount = getValue('.sym-amount', true);
                const n = getValue('.n', true);
                const users = getValue('.users', true);
                const bytes = getValue('.inf', true);
                if(symAmount === '' || n === '' || users === '' || bytes === '') return '';

                let bit = 0;
                while(true){
                    bit++;
                    if(2**bit >= n) break;
                    if(bit >= 20) return '';
                }
                let minByte = 0;
                if(symAmount*bit % 8 !== 0) minByte = Math.ceil(symAmount*bit / 8);
                else minByte = symAmount*bit / 8;

                let addData = 0;
                while(true){
                    addData++;
                    if(users * (minByte + addData) === bytes) return addData;
                    else if(users * (minByte + addData) > bytes) return '';
                }
            }
        },

        8: {
            'generateInterface': () => {
                const users = createInput({type: 'number', class: 'users', width: '50px'});
                const usersDiv = createGroupingDiv({title: 'Количество людей (спортсменов):'}, [users]);
                taskCompletingDiv.insertBefore(usersDiv, answerFieldDiv);

                const finishedUsers = createInput({type: 'number', class: 'finished-users', width: '50px'});
                const finishedUsersDiv = createGroupingDiv({title: 'Финиширующие люди (спортсмены):'}, [finishedUsers]);
                taskCompletingDiv.insertBefore(finishedUsersDiv, answerFieldDiv);
            },
            'generateAnswer': () => {
                const users = getValue('.users', true);
                const finishedUsers = getValue('.finished-users', true);
                if(users === '' || finishedUsers === '') return '';

                let bit = 0;
                while(true){
                    bit++;
                    if(2**bit >= users) break;
                    if(bit >= 20) return '';
                }

                return Math.ceil(finishedUsers * bit / 8);
            }
        },
    },
    8: {},
    9: {}
};