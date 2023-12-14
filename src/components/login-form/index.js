import {memo, useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function LoginForm(props) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const cn = bem('LoginForm');

  const callbacks = {
    onSubmit: (e, login, password) => {
      e.preventDefault();
      props.onSubmit(login, password);
    }
  }

  return (
    <div className={cn()}>
      <form onSubmit={(e) => callbacks.onSubmit(e, login, pass)} className={cn('form')}>
        <h2 className={cn('title')}>{props.t('login.title')}</h2>
        <label>
          {props.t('login.username')}
          <input autoComplete={'username'}
                 onChange={(e) => setLogin(e.target.value)}
                 value={login} name={'login'}/>
        </label>
        <label>
          {props.t('login.password')}
          <input autoComplete={'current-password'}
                 type={"password"}
                 onChange={(e) => setPass(e.target.value)}
                 value={pass} name={'password'}/>
        </label>
        {props.errorMsg && <div className={cn('error')}>{props.errorMsg}</div>}
        <button type={"submit"} className={cn('action')}>{props.t('login.login')}</button>
      </form>
    </div>
  )
}

export default memo(LoginForm);

LoginForm.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  errorMsg: PropTypes.string
}

LoginForm.defaultTypes = {
  t: (text) => text,
  onSubmit: () => {}
}
