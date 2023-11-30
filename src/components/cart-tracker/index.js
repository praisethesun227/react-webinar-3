import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Controls from "../controls";
import { formatPrice } from "../../utils";
import { plural } from "../../utils";

function CartTracker (props) {
  const cn = bem('CartTracker');
  return (
    <div className={cn()}>
      <span>В корзине:</span>
      <strong className={cn('info')}>
        {
          props.totalCount > 0 ?
          `${props.totalCount} ${plural(props.totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatPrice(props.totalPrice)}`
          :
          'пусто'
        }
      </strong>
      <Controls handleClick={props.onOpenCart}
                text={props.openCartBtnText}
      />
    </div>
  )
}

CartTracker.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
  onOpenCart: PropTypes.func,
  openCartBtnText: PropTypes.string
}

CartTracker.defaultProps = {
  onOpenCart: () => {},
  openCartBtnText: 'Перейти'
}

export default React.memo(CartTracker);
