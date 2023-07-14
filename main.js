// Global
const data = JSON.parse(localStorage.getItem('items'));
const dataKey = +(localStorage.getItem('key'));

let items = []
let key;

const itemsRef = []

const holdTouchDeily = 600;

const updateDataInLocalStorage = _ => localStorage.setItem('items', JSON.stringify(items));

const updateItemRefInLoops = _ => {
  removeOneItem();
  plusOnCounter();
  minusOnCounter();
  pludBoxInputShowAndHidden();
  minusBoxInputShowAndHidden();
  plusOrMinusOnCounterByInput()
}

const itemsBoxRef = document.querySelector('ul.list');
const itemInputRef = document.querySelector('.add-item-box .input');

const createElemantList = (value, count, key) => {
  const li = document.createElement('li');
  const removeBut = document.createElement('button');
  const item = document.createElement('span');
  const plusBut = document.createElement('button');
  const counter = document.createElement('span');
  const minusBut = document.createElement('button');
  const plauOrMinusBox = document.createElement('div');
  const plauOrMinusSign = document.createElement('span');
  const plauOrMinusInput = document.createElement('input');


  removeBut.classList.add('button', 'remover');
  item.classList.add('item');
  plusBut.classList.add('button', 'plus');
  counter.classList.add('counter');
  minusBut.classList.add('button', 'minus');
  plauOrMinusBox.classList.add('box-plau-or-minus');
  plauOrMinusSign.classList.add('plau-or-minus');
  plauOrMinusInput.classList.add('plau-or-minus');


  removeBut.append('x');
  item.append(value);
  plusBut.append('+');
  counter.append(count);
  minusBut.append('-');

  plauOrMinusInput.type = 'number';
  li.setAttribute('key', key)

  plauOrMinusBox.append(plauOrMinusInput, plauOrMinusSign);
  li.append(plusBut, minusBut, item, removeBut, plauOrMinusBox, counter)
  itemsBoxRef.append(li);
  itemsRef.push(li);

  // Update itemsRef in the loops 
  updateItemRefInLoops();

}

// Add items if there are items stored in the local storage
const conAddaddItemsFromLocalStorage = _ => {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      items.push(data[i])
    }

    key = dataKey

    items.forEach(item => {
      const value = item.item;
      const { key, count } = item
      createElemantList(value, count, key);
    })

  } else {
    key = 0
    items = []
    localStorage.setItem('key', key)

  }
}

window.addEventListener('load', conAddaddItemsFromLocalStorage)
// Add item to list
const addItemToList = _ => {
  const value = itemInputRef.value.trim();
  if (value != '') {

    if (value[0] == '$' && value[value.length - 1] == '$') {
      let word = '';
      const words = [];

      for (let i = 1; i < value.length - 1; i++) {
        if (value[i] != '\n' && value[i] != '') {
          word += value[i]
        } else {
          words.push(word.trim())
          word = ''
        }
      }

      words.forEach(word => {
        if (word != '') {
          items.push({ key, item: word, count: 0 })
          createElemantList(word, 0, key);
          key++;
          localStorage.setItem('key', key)
        }
      })
      updateDataInLocalStorage();

    } else {
      items.push({ key, item: value, count: 0 })

      createElemantList(value, 0, key);

      key++;
      localStorage.setItem('key', key)
      updateDataInLocalStorage();
    }

  }

  itemInputRef.focus();
  itemInputRef.value = '';

}

const addButRef = document.querySelector('.add-item-box button');
addButRef.addEventListener('click', addItemToList);

// Remove one item 
const removeOneItem = _ => {
  itemsRef.forEach(li => {
    const removeButRef = li.querySelector('button.remover');
    removeButRef.onclick = _ => {
      removeButRef.parentElement.remove();
      const itemKey = removeButRef.parentElement.getAttribute('key');
      items.forEach((item, i) => {
        if (item.key == itemKey) {
          items.splice(i, 1);
        }
      })

      updateDataInLocalStorage();
    }
  })
}

// Clear all items 
const clearAllItems = _ => {
  itemsBoxRef.innerHTML = '';
  localStorage.clear();
  itemInputRef.focus();
}

const clearAllItemsButRef = document.querySelector('button.clear');
clearAllItemsButRef.addEventListener('click', clearAllItems);

// Plus on counter
const plusOnCounter = _ => {
  itemsRef.forEach(li => {
    const plusButRef = li.querySelector('button.plus');
    plusButRef.onclick = _ => {
      const itemKey = plusButRef.parentElement.getAttribute('key');
      items.forEach((item, i) => {
        if (item.key == itemKey && item.count < 8000) {
          item.count += 1
          const itemCounterRef = li.querySelector('span.counter');
          itemCounterRef.innerHTML = item.count;
          updateDataInLocalStorage();
        }
      })
    }
  })
}

// Minus on counter
const minusOnCounter = _ => {
  itemsRef.forEach(li => {
    const minusButRef = li.querySelector('button.minus');
    minusButRef.onclick = _ => {
      const itemKey = minusButRef.parentElement.getAttribute('key');
      items.forEach((item, i) => {
        if (item.key == itemKey && item.count > 0) {
          item.count -= 1
          const itemCounterRef = li.querySelector('span.counter');
          itemCounterRef.innerHTML = item.count;
          updateDataInLocalStorage();
        }
      })
    }
  })
}

// Plus box input show and hidden
const pludBoxInputShowAndHidden = _ => {
  let holdTouchTimeout;
  itemsRef.forEach(li => {
    const plusButRef = li.querySelector('button.plus');
    const plauOrMinusBoxRef = li.querySelector('div.box-plau-or-minus');
    const plauOrMinusInputRef = plauOrMinusBoxRef.querySelector('input.plau-or-minus');

    plusButRef.ontouchstart = _ => {
      holdTouchTimeout = setTimeout(_ => {
        const plauOrMinusBoxShow = plauOrMinusBoxRef.dataset.show == 'true' ? true : false;
        const plauOrMinusBoxPlusSgin = plauOrMinusBoxRef.dataset.plus == 'true' ? true : false;

        if (plauOrMinusBoxShow && !plauOrMinusBoxPlusSgin) {
          plauOrMinusBoxRef.dataset.plus = !plauOrMinusBoxPlusSgin;
          plauOrMinusInputRef.focus()
        } else if (!plauOrMinusBoxShow) {
          plauOrMinusBoxRef.dataset.show = !plauOrMinusBoxShow;
          plauOrMinusBoxRef.dataset.plus = !plauOrMinusBoxPlusSgin;
          plauOrMinusInputRef.focus()
        } else if (plauOrMinusBoxShow, plauOrMinusBoxPlusSgin) {
          plauOrMinusBoxRef.dataset.show = !plauOrMinusBoxShow;
          plauOrMinusBoxRef.dataset.plus = !plauOrMinusBoxPlusSgin;
          plauOrMinusInputRef.value = '';
        }

      }, holdTouchDeily)
    }
    plusButRef.ontouchend = _ => clearTimeout(holdTouchTimeout);
  })
}

// Minus box input show and hidden
const minusBoxInputShowAndHidden = _ => {
  let holdTouchTimeout;
  itemsRef.forEach(li => {
    const minusButRef = li.querySelector('button.minus');
    const plauOrMinusBoxRef = li.querySelector('div.box-plau-or-minus');
    const plauOrMinusInputRef = plauOrMinusBoxRef.querySelector('input.plau-or-minus');
    minusButRef.ontouchstart = _ => {
      holdTouchTimeout = setTimeout(_ => {
        const plauOrMinusBoxShow = plauOrMinusBoxRef.dataset.show == 'true' ? true : false;
        const plauOrMinusBoxPlusSgin = plauOrMinusBoxRef.dataset.plus == 'true' ? true : false;
        if (plauOrMinusBoxShow && plauOrMinusBoxPlusSgin) {
          plauOrMinusBoxRef.dataset.plus = !plauOrMinusBoxPlusSgin;
          plauOrMinusInputRef.focus();
        } else if (plauOrMinusBoxShow && !plauOrMinusBoxPlusSgin) {
          plauOrMinusBoxRef.dataset.show = !plauOrMinusBoxShow;
        } else if (!plauOrMinusBoxShow && !plauOrMinusBoxPlusSgin) {
          plauOrMinusBoxRef.dataset.show = !plauOrMinusBoxShow;
          plauOrMinusInputRef.focus();
          plauOrMinusInputRef.value = '';
        }
      }, holdTouchDeily)
    }
    minusButRef.ontouchend = _ => clearTimeout(holdTouchTimeout);
  })
}

const plusOrMinusOnCounterByInput = _ => {
  itemsRef.forEach(li => {
    const plauOrMinusBoxRef = li.querySelector('div.box-plau-or-minus');
    const itemCounterRef = li.querySelector('span.counter');
    const plauOrMinusInputRef = li.querySelector('div.box-plau-or-minus input.plau-or-minus');
    const itemKey = li.getAttribute('key');
    plauOrMinusInputRef.onkeypress = e => {
      const plusOrMinusInputValue = Number(plauOrMinusInputRef.value);
      const itemCounterTextContent = Number(itemCounterRef.textContent);
      const inputValuePlusItemCounter = plusOrMinusInputValue + itemCounterTextContent;
      const inputValueMinusItemCounter = itemCounterTextContent - plusOrMinusInputValue;
      const plauOrMinusBoxShow = plauOrMinusBoxRef.dataset.show == 'true' ? true : false;
      const plauOrMinusBoxPlusSgin = plauOrMinusBoxRef.dataset.plus == 'true' ? true : false;
      if (e.key == 'Enter' && plusOrMinusInputValue > 0 && plauOrMinusBoxShow) {
        if (plauOrMinusBoxPlusSgin) {
          (inputValuePlusItemCounter) <= 8000 && (inputValuePlusItemCounter).toString().length <= 5 ? itemCounterRef.textContent = inputValuePlusItemCounter : false;
          plauOrMinusInputRef.value = ''
          items.forEach((item, i) => {
            if (item.key == itemKey && item.count <= 8000) {
              item.count = Number(itemCounterRef.textContent);
              updateDataInLocalStorage();
            }
          })
          
        } else {
          (inputValueMinusItemCounter) >= 0  && (inputValueMinusItemCounter).toString().length <= 5 ? itemCounterRef.textContent = inputValueMinusItemCounter : false;
          plauOrMinusInputRef.value = ''
          items.forEach((item, i) => {
            if (item.key == itemKey && item.count > 0.9) {
              item.count = Number(itemCounterRef.textContent);
              updateDataInLocalStorage();
            }
          })
        }
      }
    }
  })
}

