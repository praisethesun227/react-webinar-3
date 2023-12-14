import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {Link} from "react-router-dom";

function AuthPanel(props) {
  const cn = bem('AuthHead');

  return (
    <div className={cn()}>
      {
        props.authorized && props.username ?
          <>
            <Link className={cn('username')} to={props.link}>{props.username}</Link>
            <button onClick={props.onLogoff} className={cn('logoff')}>{props.t('auth.logoff')}</button>
          </>
          :
          <Link className={cn('login')} to={'/login'}>
            <button>{props.t('auth.login')}</button>
          </Link>
      }
    </div>
  )
}

AuthPanel.propTypes = {
  authorized: PropTypes.bool,
  username: PropTypes.string,
  onLogoff: PropTypes.func,
  t: PropTypes.func
};

AuthPanel.defaultProps = {
  t: (text) => text,
  onLogoff: () => {}
}

export default memo(AuthPanel);
