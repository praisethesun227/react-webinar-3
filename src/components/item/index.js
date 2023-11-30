import React, {useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { formatPrice } from "../../utils";

function Item(props) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      {props.cartDisplay && <div className={cn('count')}>{props.item.count} шт</div>}
      <div className={cn('actions')}>
      {props.cartDisplay ?
        <button className={cn('removeFromCartBtn')}
                onClick={() => props.onRemoveFromCart(props.item.code, props.item.count)}>
                Удалить
        </button>
        :
        <button className={cn('addToCartBtn')}
                onClick={() => props.onAddToCart(props.item.code, 1)}>
                Добавить
        </button>
      }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {},
  onRemoveFromCart: () => {}
}

export default React.memo(Item);
