import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum, translate}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate('basket_total', 'Total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  translate: PropTypes.func
};

BasketTotal.defaultProps = {
  sum: 0,
  translate: (key, defaultVal) => defaultVal
}

export default memo(BasketTotal);
