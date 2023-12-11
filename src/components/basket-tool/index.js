import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, translate}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('basketTool_inBasket', 'In basket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: translate('product_one', 'product'),
            few: translate('product_few', 'products'),
            many: translate('product_many', 'products')
          })} / ${numberFormat(sum)} ₽`
          : translate('basketTool_empty', 'empty')
        }
      </span>
      <button onClick={onOpen}>{translate('basketTool_toBasket', 'To basket')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translate: PropTypes.func
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0,
  translate: (key, defaultVal) => defaultVal
}

export default memo(BasketTool);
