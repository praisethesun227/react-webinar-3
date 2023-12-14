import {memo, useCallback} from "react";
import UserCard from "../../components/user-card";
import AuthPanel from "../../components/auth-panel";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import {useNavigate} from "react-router-dom";

function Profile() {
  const store = useStore();
  const select = useSelector(state => ({
    auth: state.user.authorized,
    username: state.user.username,
    userdata: state.user.userdata,
    waiting: state.user.waiting
  }))

  const navigate = useNavigate();

  useInit(() => {
    if (!store.actions.user.checkAuth())
      navigate('/login');
    else
      store.actions.user.loadUserData();
  }, [select.auth]);

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
      <Spinner active={select.waiting}>
        <UserCard t={t} userdata={select.userdata}/>
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile);
