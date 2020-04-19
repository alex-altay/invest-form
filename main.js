/* Кастомное сообщение о валидации поля "Сумма инвестиций" */
const invSumInput = document.querySelector('#input-inv-sum');

const setErrorMessageForSum = event => {
  if (invSumInput.validity.rangeUnderflow) {
    invSumInput.setCustomValidity("Минимальная сумма инвестиции $ 100");
  } else {
    invSumInput.setCustomValidity("");
  }
}  

const invSumToLocaleStr = event => {
  const value = Number(event.target.value);
  if (value >= 100 && value <= 200000) {
    invSumInput.value = value;
  }
}

invSumInput.addEventListener("input", setErrorMessageForSum);
invSumInput.addEventListener("input", invSumToLocaleStr);


/* Работа ползунка мультипликатора */
const multiplyInp = document.querySelector('#input-inv-multiply');
const rangeDiv = document.querySelector('.range-main-div');
const rangeInp = document.querySelector('.range-input');
const resultDiv = document.querySelector('.multiply-result');

const showRangeDiv = event => {
  rangeDiv.classList.remove('range-main-div_hidden');
  rangeDiv.classList.add('range-main-div_visible');
}

const hideRangeDiv = event => {
  rangeDiv.classList.remove('range-main-div_visible');
  rangeDiv.classList.add('range-main-div_hidden');
}

const multiplyInpChangeHandler = event => {
  const value = Number(event.target.value);
  if (value >= 1 && value <= 40) {
    rangeInp.value = value;
  }
}

const rangeInpChangeHandler = event => {
  const value = Number(event.target.value);
  if (value >= 1 && value <= 40) {
    multiplyInp.value = value;
  }
}

const showFactInvestResult = event => {
  const value = multiplyInp.value;
  const invSum = invSumInput.value;
  if (value >= 1 && 
      value <= 40 && 
      invSum >= 100 && 
      invSum <= 200000) {
    const result = Number(value) * Number(invSum);
    resultDiv.innerHTML = result.toLocaleString('ru');
  } else {
    resultDiv.innerHTML = '';
  }
}

multiplyInp.addEventListener('click', showRangeDiv);
multiplyInp.addEventListener('focus', showRangeDiv);
rangeInp.addEventListener('change', hideRangeDiv);
multiplyInp.addEventListener('change', hideRangeDiv);
multiplyInp.addEventListener('input', multiplyInpChangeHandler);
multiplyInp.addEventListener('input', showFactInvestResult);
rangeInp.addEventListener('input', rangeInpChangeHandler);
rangeInp.addEventListener('input', showFactInvestResult);
invSumInput.addEventListener("input", showFactInvestResult);


/* Кастомное сообщение о валидации поля мультипликатора */
const setErrorMessageForMultiply = event => {
  if (multiplyInp.validity.rangeUnderflow ||
      multiplyInp.validity.rangeOverflow) {
    multiplyInp.setCustomValidity("Неверное значение мультипликатора");
  } else {
    multiplyInp.setCustomValidity("");
  }
} 

multiplyInp.addEventListener('change', setErrorMessageForMultiply);
rangeInp.addEventListener('change', setErrorMessageForMultiply);


/* Отображение и скрытие блока "Ограничить прибыль и убытки" */
const refinementsHeader = document.querySelector('.refinements-header');
const refinementsHeaderArrow = refinementsHeader.querySelector('img');
const refinementsSettings = document.querySelector('.refinements-settings');
const radioButton = document.querySelector('#inp-radio1');

const toggleRefinementsVisibility = event => {
  if (refinementsHeaderArrow.classList.contains('expand-button_expanded')) {
    refinementsHeaderArrow.classList.remove('expand-button_expanded');
    refinementsHeaderArrow.classList.add('expand-button_collapsed')
    refinementsSettings.classList.remove('refinements-settings_visible');
    refinementsSettings.classList.add('refinements-settings_hidden');
  } else {
    refinementsHeaderArrow.classList.remove('expand-button_collapsed')
    refinementsHeaderArrow.classList.add('expand-button_expanded');
    refinementsSettings.classList.remove('refinements-settings_hidden');
    refinementsSettings.classList.add('refinements-settings_visible');
  }
}

refinementsHeader.addEventListener('click', toggleRefinementsVisibility);


/* Изменения при выборе радиобаттонов */
const inpRadioPercent = document.querySelector('#radio-percent');
const inpRadioDollar = document.querySelector('#radio-dollar');
const inputSymbols = document.querySelectorAll('.refinements .input-symbol');
const inputRefProfit = document.querySelector('#input-ref-profit');
const inputRefLoss = document.querySelector('#input-ref-loss');


const updateInputRefProfitPercent = () => {
  if (inputRefProfit.disabled) {
    inputRefProfit.value = '';
  } else if (invSumInput.checkValidity()) {
    inputRefProfit.value = 30;
    inputRefProfit.min = 10;
  }
}

const updateInputRefProfitDollar = () => {
  if (inputRefProfit.disabled) {
    inputRefProfit.value = '';
  } else if (invSumInput.checkValidity()) {
    inputRefProfit.value = Math.ceil(Number(invSumInput.value) * 0.3);
    inputRefProfit.min = Math.ceil(Number(invSumInput.value) * 0.1);
  }
}

const updateInputRefLossPercent = () => {
  if (inputRefLoss.disabled) {
    inputRefLoss.value = '';
  } else if (invSumInput.checkValidity()) {
    inputRefLoss.value = 30;
    inputRefLoss.min = 10;
    inputRefLoss.max = 100; // Максимум есть только у убытка 
  }
}

const updateInputRefLossDollar = () => {
  if (inputRefLoss.disabled) {
    inputRefLoss.value = '';
  } else if (invSumInput.checkValidity()) {
    inputRefLoss.value = Math.ceil(Number(invSumInput.value) * 0.3);
    inputRefLoss.min = Math.ceil(Number(invSumInput.value) * 0.1);
    inputRefLoss.max = invSumInput.value; // Максимум есть только у убытка 
  }
}

const toggleRadioButtonsHandler = event => {
  if (event.target.id === 'radio-percent') {
    inputSymbols.forEach(s => s.innerHTML = '%');
    updateInputRefProfitPercent();
    updateInputRefLossPercent();
  } else if (invSumInput.checkValidity()) {    
    inputSymbols.forEach(s => s.innerHTML = '$');
    updateInputRefProfitDollar();
    updateInputRefLossDollar();
  }
}

inpRadioDollar.addEventListener('click', toggleRadioButtonsHandler);
inpRadioPercent.addEventListener('click', toggleRadioButtonsHandler);


/* Выбор чекбоксов ограничения прибыли и убытков */
const refCheckboxes = document.querySelectorAll('.refinements input[type="checkbox"]');
const checkboxRefProfit = document.querySelector('#checkbox-profit');
const checkboxRefLoss = document.querySelector('#checkbox-loss');

const toggleCheckboxProfit = event => {
  if (event.target.checked) {
    inputRefProfit.disabled = false;
  } else {
    inputRefProfit.disabled = true;
  }
  // Обновляем инпут значений каждый раз при снятии чекбокса  
  if (inpRadioPercent.checked) {
    updateInputRefProfitPercent();
  } else {
    updateInputRefProfitDollar();
  }
}

const toggleCheckboxLoss = event => {
  if (event.target.checked) {
    inputRefLoss.disabled = false;
  } else {
    inputRefLoss.disabled = true;
  }
  // Обновляем инпут значений каждый раз при снятии чекбокса  
  if (inpRadioPercent.checked) {
    updateInputRefLossPercent();
  } else {
    updateInputRefLossDollar();
  }
}

/* если сумма инвестиций меняется, обновляем 
инпуты прибыли и убытков */
const updateProfitAndLossIfInvChanged = () => {
  if (inpRadioPercent.checked) {
    updateInputRefProfitPercent();
    updateInputRefLossPercent();
  } else {
    updateInputRefProfitDollar();
    updateInputRefLossDollar();    
  }
}

checkboxRefProfit.addEventListener('click', toggleCheckboxProfit);
checkboxRefLoss.addEventListener('click', toggleCheckboxLoss);
invSumInput.addEventListener('input', updateProfitAndLossIfInvChanged);


/* Кастомное сообщение о валидации поля "Прибыль" */
const setErrorMessageForProfit = event => {
  if (inputRefProfit.validity.rangeUnderflow) {
    let value = '';
    if (inpRadioDollar.checked) {
      value = `\$${inputRefProfit.min}`;
    } else {
      value = `${inputRefProfit.min}%`;
    }
    inputRefProfit.setCustomValidity(`Не может быть меньше ${value}`);
  } else {
    inputRefProfit.setCustomValidity("");
  }
}  

inputRefProfit.addEventListener('input', setErrorMessageForProfit);

/* Кастомное сообщение о валидации поля "Убыток" */
const setErrorMessageForLoss = event => {
  if (inputRefLoss.validity.rangeUnderflow) {
    let value = '';
    if (inpRadioDollar.checked) {
      value = `\$${inputRefLoss.min}`;
    } else {
      value = `${inputRefLoss.min}%`;
    }
    inputRefLoss.setCustomValidity(`Не может быть меньше ${value}`);
  } else if (inputRefLoss.validity.rangeOverflow) {
    let value = '';
    if (inpRadioDollar.checked) {
      value = `\$${inputRefLoss.max}`;
    } else {
      value = `${inputRefLoss.max}%`;
    }
    inputRefLoss.setCustomValidity(`Не может быть больше ${value}`);
  } else {
    inputRefLoss.setCustomValidity("");
  }
}  

inputRefProfit.addEventListener('input', setErrorMessageForProfit);
inputRefLoss.addEventListener('input', setErrorMessageForLoss);


/* Отправка формы */
const form = document.querySelector('form');
const buttons = document.querySelectorAll('.button');

const submitForm = event => {
  if (form.checkValidity()) {
    const data = {
      sumInv: invSumInput.value,
      mult: multiplyInp.value,
      direction: event.target.parentNode.dataset.direction,
    }
    if (checkboxRefProfit.checked && inputRefProfit.value) {
      let takeProfit = inputRefProfit.value;
      if (inpRadioPercent.checked) {
        takeProfit = Math.ceil(Number(takeProfit)/100 * Number(invSumInput.value)); 
      }
      data.takeProfit = takeProfit;
    }
    if (checkboxRefLoss.checked && inputRefLoss.value) {
      let stopLoss = inputRefLoss.value;
      if (inpRadioPercent.checked) {
        stopLoss = Math.ceil(Number(stopLoss)/100 * Number(invSumInput.value)); 
      }
      data.stopLoss = stopLoss;
    }
    alert(`Успех!
Дальше отправляем объект с данными на сервер:
${JSON.stringify(data)}
Здесь уже будет AJAX-запрос`);
    form.submit();
  } else {
    form.reportValidity();
  }
}

buttons.forEach(button => button.addEventListener('click', submitForm));
