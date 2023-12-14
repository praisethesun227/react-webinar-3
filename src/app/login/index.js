import {memo, useCallback} from "react";
import PageLayout from "../../components/page-layout";
import AuthPanel from "../../components/auth-panel";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LocaleSelect from "../../containers/locale-select";

function Login() {
  const store = useStore();
  const select = useSelector((state) => ({
    auth: state.user.authorized,
    username: state.user.username,
    errorMsg: state.user.errorMessage
  }))

  const callbacks = {
    authorize: useCallback((login, password) => store.actions.user.auth(login, password), [store]),
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
        <LoginForm onSubmit={callbacks.authorize} errorMsg={select.errorMsg} t={t}/>
      </PageLayout>
    )
}

export default memo(Login);
