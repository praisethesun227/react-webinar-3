import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useLanguage from "../../language/use-language";

function Basket() {

  const {langContext, translate} = useLanguage();
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    translate: useCallback((key, defaultValue) => {
      return translate(key, langContext.lang, defaultValue);
    }, [langContext.lang])
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket translate={callbacks.translate}
                         link={`/articles/${item._id}`}
                         item={item}
                         onRemove={callbacks.removeFromBasket}
                         closeModal={callbacks.closeModal}
      />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={callbacks.translate('basket_title', 'Basket')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal translate={callbacks.translate} sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
