import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {Route, Routes, useLocation} from "react-router-dom";
import Articles from "../articles";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(10, 0, 'items(_id, title, price),count');
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    articleCount: state.catalog.totalCount,
    location: state.location.locationName
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadPage: useCallback((itemsPerPage, page) =>
      store.actions.catalog.load(itemsPerPage, itemsPerPage * (page - 1)), [store]
    ),
    changeLocation: useCallback((location) => store.actions.location.setLocation(location), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} onClick={callbacks.changeLocation}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={select.location}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  onChangeLoc={callbacks.changeLocation}
                  sum={select.sum}/>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <List list={select.list} renderItem={renders.item}/>
              <Pagination itemsTotal={select.articleCount}
                          itemsPerPage={10}
                          loadPage={callbacks.loadPage}
              />
            </>
        }/>
        <Route path='/articles/:id' element={<Articles/>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
