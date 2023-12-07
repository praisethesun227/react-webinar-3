import {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Article from "../../components/article";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";

function Articles() {
  const {id} = useParams();
  const store = useStore();
  const select = useSelector((state) => ({
    article: state.catalog.activeArticle,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store])
  }

  useEffect(() => {
    store.actions.catalog.loadArticle(id);
  }, [id]);

  return (
    <>
      {Object.keys(select.article).length && <Article info={select.article} onAdd={callbacks.addToBasket}/>}
    </>
  );
}

export default memo(Articles);

