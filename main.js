const data = JSON.parse(localStorage.getItem('items'));
const dataKey = +(localStorage.getItem('key'));
const itemsRef = []
let items = []
let key;


const inputItemRef = document.querySelector('.add-item-box .input');
const buttonAddItemRef = document.querySelector('.add-item-box button')
const listRef = document.querySelector('ul.list')

const addItems = (value, count, key) => {
  const li = document.createElement('li');
  const buttonRemove = document.createElement('button');
  const item = document.createElement('span');
  const buttonPlus = document.createElement('button');
  const counter = document.createElement('span');
  const buttonMinus = document.createElement('button');

  buttonRemove.classList.add('button', 'remover');
  item.classList.add('item');
  buttonPlus.classList.add('button', 'plus');
  counter.classList.add('counter');
  buttonMinus.classList.add('button', 'minus');

  buttonRemove.append('x');
  item.append(value);
  buttonPlus.append('+');
  counter.append(count);
  buttonMinus.append('-');

  li.append(buttonPlus, buttonMinus, item, buttonRemove, counter);

  li.setAttribute('key', key)

  listRef.appendChild(li);
  itemsRef.push(li);


  // Remove on item
  removeOneItem()

  // Plus item
  const buttonPlusRefS = li.querySelectorAll('ul li .plus')
  buttonPlusRefS.forEach(but => {
    but.addEventListener('click', e => {

      const keyToPlus = e.target.parentElement.getAttribute('key');
      items.forEach((item, i) => {
        if (item.key == keyToPlus && item.count < 999) {
          item.count += 1
          document.querySelector(`li[key="${keyToPlus}"] span.counter`).innerHTML = item.count;
          localStorage.setItem('items', JSON.stringify(items));
        }
      })

    })
  })

  // Minus item
  const buttonMinusRefS = li.querySelectorAll('ul li .minus')
  buttonMinusRefS.forEach(but => {
    but.addEventListener('click', e => {
      const keyToMinus = e.target.parentElement.getAttribute('key');
      console.log(keyToMinus)
      items.forEach((item, i) => {
        if (item.key == keyToMinus && item.count > 0) {
          item.count -= 1
          document.querySelector(`li[key="${keyToMinus}"] span.counter`).innerHTML = item.count;
          localStorage.setItem('items', JSON.stringify(items));
        }
      })

    })
  })

  // Clear all item
  const buttonClearAllRef = document.querySelector('button.clear')

  buttonClearAllRef.addEventListener('click', _ => {
    const lisRef = listRef.querySelectorAll('li')
    lisRef.forEach(ele => {
      ele.remove();
    })
    localStorage.clear();
    inputItemRef.focus();
  })


}


if (data) {

  for (let i = 0; i < data.length; i++) {
    items.push(data[i])
  }

  key = dataKey

  items.forEach(item => {
    const value = item.item;
    const { key, count } = item
    addItems(value, count, key);
  })

} else {
  key = 0
  items = []
  localStorage.setItem('key', key)

}

buttonAddItemRef.addEventListener('click', _ => {
  const value = inputItemRef.value.trim();
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
          addItems(word, 0, key);
          key++;
          localStorage.setItem('key', key)
        }
      })
      localStorage.setItem('items', JSON.stringify(items))

    } else {
      items.push({ key, item: value, count: 0 })

      addItems(value, 0, key);

      key++;
      localStorage.setItem('key', key)
      localStorage.setItem('items', JSON.stringify(items))
    }

  }

  inputItemRef.focus();
  inputItemRef.value = '';

})

const removeOneItem = _ => {
  itemsRef.forEach(li => {
    const removeButRef = li.querySelectorAll('ul li .remover')
    removeButRef.addEventListener('click', e => {
      removeButRef.parentElement.remove();
      const keyToRemove = removeButRef.parentElement.getAttribute('key');

      items.forEach((item, i) => {
        if (item.key == keyToRemove) {
          items.splice(i, 1);
        }
      })

      localStorage.setItem('items', JSON.stringify(items));
    })
  })
}


