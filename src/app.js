import React, {useCallback} from 'react';
import List from "./components/list";
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

    onAddToCart: useCallback((item) => {
      store.addToCart(item, 1);
    }, [store]),

    onRemoveFromCart: useCallback((item) => {
      store.removeFromCart(item, state.cart.items.get(item.code).count);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartTracker onOpenCart={callbacks.onOpenCart}
                   totalCount={state.cartUniqueItemsCount}
                   totalPrice={state.cartTotalPrice}
      />
      <List list={state.list}
            onAddToCart={callbacks.onAddToCart}
            cartDisplay={false}
      />
      <Cart isCartOpen={state.isCartOpen}
            onCloseCart={callbacks.onCloseCart}
            totalPrice={state.cartTotalPrice}
            onRemoveFromCart={callbacks.onRemoveFromCart}
            cart={state.cart}
      />
    </PageLayout>
  );
}

export default App;
