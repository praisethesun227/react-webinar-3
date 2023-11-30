import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Controls(props) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <button className={cn('btn1')} onClick={() => props.handleClick()}>{props.text}</button>
    </div>
  )
}

Controls.propTypes = {
  handleClick: PropTypes.func
}

Controls.defaultProps = {
  handleClick: () => {}
}

export default React.memo(Controls);
