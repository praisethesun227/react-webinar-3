import {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Article from "../../components/article";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Navigation from "../../components/navigation";
import NavigationLayout from "../../components/navigation-layout";
import useLanguage from "../../language/use-language";

function Articles() {
  const {langContext, translate} = useLanguage();
  const {id} = useParams();
  const store = useStore();
  const select = useSelector((state) => ({
    article: state.article.activeArticle,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    translate: useCallback((key, defaultValue) => {
      return translate(key, langContext.lang, defaultValue);
    }, [langContext.lang])
  }

  useEffect(() => {
    store.actions.article.loadArticle(id);
  }, [id]);

  return (
    <PageLayout>
      <Head title={select.article.title || '...'}/>
      <NavigationLayout>
        <Navigation translate={callbacks.translate}/>
        <BasketTool translate={callbacks.translate}
                    onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}
        />
      </NavigationLayout>
      {!!Object.keys(select.article).length &&
        <Article translate={callbacks.translate}
                 info={select.article}
                 onAdd={callbacks.addToBasket}/>
      }
    </PageLayout>
  );
}

export default memo(Articles);
