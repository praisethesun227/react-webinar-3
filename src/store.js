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

  addToCart(item, count) {
    const cartItems = this.state.cart.items;
    let uniqueItemsCount = this.state.cartUniqueItemsCount;

    if(!cartItems.has(item.code)) {
      cartItems.set(item.code, {item: item, count: count});
      uniqueItemsCount++;
    }

    else {
      cartItems.set(item.code, {item: item, count: cartItems.get(item.code).count + count});
    }

    this.setState({
      ...this.state,
      cartUniqueItemsCount: uniqueItemsCount,
      cartTotalPrice: this.state.cartTotalPrice + item.price * count,
      cart: {...this.state.cart, items: cartItems}
    })
  }

  removeFromCart(item, count) {
    const cartItems = this.state.cart.items;
    let uniqueItemsCount = this.state.cartUniqueItemsCount;

    if(!cartItems.has(item.code)) {
      console.log(`Attempted to delete nonexistent cart item ${item.code}`);
      return;
    }

    const itemCount = cartItems.get(item.code).count;
    if (count >= itemCount) {
      cartItems.delete(item.code);
      uniqueItemsCount--;
    }

    else {
      cartItems.set(item.code, {item: item, count: cartItems.get(item.code).count - count});
    }

    this.setState({
      ...this.state,
      cartUniqueItemsCount: uniqueItemsCount,
      cartTotalPrice: this.state.cartTotalPrice - item.price * count,
      cart: {...this.state.cart, items: cartItems}
    })
  }
}

export default Store;
