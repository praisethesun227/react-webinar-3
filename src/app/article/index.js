import {memo, useCallback} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import AuthPanel from "../../components/auth-panel";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    auth: state.user.authorized,
    username: state.user.username
  }));

  const navigate = useNavigate();
  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLogoff: useCallback(() => store.actions.user.logoff(), [store]),
    onLogin: useCallback(() => navigate('/login'), [])
  }

  return (
    <PageLayout>
      <AuthPanel
        onLogoff={callbacks.onLogoff}
        link={'/profile'} authorized={select.auth}
        username={select.username}
        onLogin={callbacks.onLogin}
        t={t}
      />
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
