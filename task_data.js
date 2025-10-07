const taskThemes = {
    1: [],
    2: [],
    3: {
        1: 'Найти время одной записи',
        2: 'Во сколько раз первая запись больше второй'
    },
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: {
        1: 'lox',
        2: 'zov',
        3: 'piz',
        4: 'ahahahah'
    }
};

const taskFunctional = {
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
                    if(isFEquals.checked){
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
};