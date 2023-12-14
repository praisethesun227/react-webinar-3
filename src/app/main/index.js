import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import AuthPanel from "../../components/auth-panel";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();
  const select = useSelector(state => ({
    auth: state.user.authorized,
    username: state.user.username
  }))

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const callbacks = {
    onLogoff: useCallback(() => store.actions.user.logoff(), [store])
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthPanel
        onLogoff={callbacks.onLogoff}
        link={'/profile'} authorized={select.auth}
        username={select.username}
        t={t}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
