const selectType = document.getElementById('task-types');
const answerOutput = document.getElementById('answer');

const selectThemeButton = document.getElementById('select-theme-button');
const selectTypeButton = document.getElementById('select-type-button');
const acceptAnswerButton = document.getElementById('get-answer-button');
const backButtons = document.querySelectorAll('.back-button');

const themeSelectingDiv = document.querySelector('.theme-selecting');
const typeSelectingDiv = document.querySelector('.type-selecting');
const taskCompletingDiv = document.querySelector('.task-completing');
const answerFieldDiv = document.querySelector('.answer-field');

let themeId;
let typeId;

//функции удаления и появления объектов в документе
function removeObjects(objectsArray){
    for(let object of objectsArray){
        object.classList.add('deleted');
    }
}
function appendObjects(objectsArray){
    for(let object of objectsArray){
        object.classList.remove('deleted');
    }
}

//функция выбора темы
function selectTaskTheme(){
    const inputThemes = document.querySelectorAll('.task-theme');
    for(let inputTheme of inputThemes){
        if(inputTheme.checked){
            return inputTheme.value;
        }
    }
    return null;
}

//функции генерации и удаления типов задач определённой темы
function generateTaskTypesList(themeId){
    if(themeId === null) return;
    removeGeneratedTaskTypes();
    const taskTypes = taskThemes[themeId];
    for(let typeId in taskTypes){
        const option = document.createElement('option');
        option.classList.add('generated');
        option.value = typeId;
        option.innerHTML = taskTypes[typeId];
        selectType.append(option);
    }

    //для темы "кодирование информации"
    if(themeId === '7'){
        const warning = document.createElement('p');
        warning.classList.add('generated');
        warning.style.color = 'red';
        warning.innerHTML = 'Если ты чуть умнее табуретки, то наверное сможешь решить с помощью универсальной решалки похожие типы задач, просто подставляя разные значения и искать нужный в условии результат';
        typeSelectingDiv.append(warning);
    }
}
function removeGeneratedTaskTypes(){
    const generatedTaskTypes = typeSelectingDiv.querySelectorAll('.generated');
    for(let taskType of generatedTaskTypes) taskType.remove();
}

//функция выбора типа задачи по выбранной теме
function selectTaskType(){
    if(selectType.value === '') return null;
    else{
        removeGeneratedTaskInterface();
        return selectType.value;
    }
}

//удаление сгенерированного интерфейса для решения типа задач
function removeGeneratedTaskInterface(){
    const generatedObjects = taskCompletingDiv.querySelectorAll('.generated-interface');
    for(let object of generatedObjects) object.remove();
}





//выбор темы нажатием кнопки
selectThemeButton.addEventListener('click', function(){
    themeId = selectTaskTheme();
    if(themeId === null) return;
    else{
        generateTaskTypesList(themeId);
        removeObjects([themeSelectingDiv]);
        appendObjects([typeSelectingDiv]);
    }
});

//выбор типа задач нажатием кнопки
selectTypeButton.addEventListener('click', function(){
    typeId = selectTaskType();
    if(typeId === null) return;
    else{
        taskFunctional[themeId][typeId].generateInterface();
        removeObjects([typeSelectingDiv]);
        appendObjects([taskCompletingDiv]);
    }
});

//получение ответа нажатием кнопки
acceptAnswerButton.addEventListener('click', function(){
    answerOutput.innerHTML = taskFunctional[themeId][typeId].generateAnswer();
});

//работа кнопок "назад"
backButtons.forEach(function(element){
    element.addEventListener('click', function(){
        if(!typeSelectingDiv.classList.contains('deleted')){
            removeObjects([typeSelectingDiv]);
            appendObjects([themeSelectingDiv]);
            themeId = null;
        }
        else if(!taskCompletingDiv.classList.contains('deleted')){
            removeObjects([taskCompletingDiv]);
            appendObjects([typeSelectingDiv]);
            answerOutput.innerHTML = '';
            typeId = null;
        }
    });
});