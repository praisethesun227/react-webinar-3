import {memo} from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function Navigation(props) {
  const cn = bem('Navigation');

  return (
    <nav className={cn()}>
      <Link className={cn('link')} to='/'>{props.translate('navigation_link_main', 'Main')}</Link>
    </nav>
  )
}

export default memo(Navigation);

Navigation.propTypes = {
  translate: PropTypes.func
}

Navigation.defaultProps = {
  translate: (key, defaultVal) => defaultVal
}