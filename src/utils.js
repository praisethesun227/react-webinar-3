const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function pluralize(count, one, some, many) {
  if (!count) {
    return '';
  }

  const countStr = `${count}`;

  if (countStr == '1') {
    return one;
  }

  if (countStr.charAt(countStr.length - 2) === '1') {
    return some;
  }

  switch(countStr.charAt(countStr.length - 1)) {
    case '2':
    case '3':
    case '4':
      return many;

    default:
      return some;
  }
}