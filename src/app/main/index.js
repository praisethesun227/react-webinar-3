import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Navigation from "../../components/navigation";

function Main() {

  const store = useStore();
  const ITEMS_PER_PAGE = 10;

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    articleCount: state.catalog.totalCount,
    currentPage: state.catalog.currentPage
  }));

  useEffect(() => {
    store.actions.catalog.load(ITEMS_PER_PAGE, select.currentPage, 'items(_id, title, price),count');
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadPage: useCallback((itemsPerPage, page) => {
        store.actions.catalog.load(itemsPerPage, page);
      }, [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={'Магазин'}/>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Navigation/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </div>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination itemsTotal={select.articleCount}
                  itemsPerPage={ITEMS_PER_PAGE}
                  activePage={select.currentPage}
                  loadPage={callbacks.loadPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
