import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  openCart() {
    this.setState({
        ...this.state,
        isCartOpen: true
      }
    )
  }

  closeCart() {
    this.setState({
        ...this.state,
        isCartOpen: false
      }
    )
  }

  addToCart(code, count) {
    this.state.cartUniqueItems.add(code);

    let priceDiff;
    const newList = this.state.list.map(item => {
      if (item.code === code) {
        priceDiff = item.price * count;
        return {
          ...item,
          count: item.count + count || count
        }
      }
      return item;
    })

    this.setState({
      ...this.state,
      list: newList,
      cartTotalPrice: this.state.cartTotalPrice + priceDiff,
    })
  }

  removeFromCart(code, count) {
    this.state.cartUniqueItems.delete(code);

    let priceDiff;
    const newList = this.state.list.map(item => {
      if (item.code === code) {
        priceDiff = item.price * count;
        return {
          ...item,
          count: count >= item.count ? 0 : item.count - count
        }
      }
      return item;
    })

    this.setState({
      ...this.state,
      list: newList,
      cartTotalPrice: priceDiff >= this.state.cartTotalPrice ? 0 : this.state.cartTotalPrice - priceDiff,
    })
  }
}

export default Store;
