import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function NavigationLayout ({children}) {
  const cn = bem('NavigationLayout');

  return (
    <div className={cn()}>
      <div className={cn('actions')}>
        {children}
      </div>
    </div>
  )
}

NavigationLayout.propTypes = {
  children: PropTypes.node
}

export default memo(NavigationLayout);
