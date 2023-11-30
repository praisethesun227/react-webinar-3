import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart"
import CartTracker from './components/cart-tracker';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const state = store.getState();

  const callbacks = {
    onOpenCart: useCallback(() => {
      store.openCart();
    }, [store]),

    onCloseCart: useCallback(() => {
      store.closeCart();
    }, [store]),

    onAddToCart: useCallback((code, count) => {
      store.addToCart(code, count);
    }, [store]),

    onRemoveFromCart: useCallback((code, count) => {
      store.removeFromCart(code, count);
    }, [store])
  }

  const uniqueItemsCount = state.cartUniqueItems.size;
  const cartItems = state.list.filter(item => {
    if (item.count > 0) return item;
  })

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartTracker onOpenCart={callbacks.onOpenCart}
                   totalCount={uniqueItemsCount}
                   totalPrice={state.cartTotalPrice}
                   openCartBtnText={'Перейти'}
      />
      <List list={state.list}
            onAddToCart={callbacks.onAddToCart}
            cartDisplay={false}
      />
      <Cart isCartOpen={state.isCartOpen}
            onCloseCart={callbacks.onCloseCart}
            totalPrice={state.cartTotalPrice}
            onRemoveFromCart={callbacks.onRemoveFromCart}
            goods={cartItems}
      />
    </PageLayout>
  );
}

export default App;
