import React from "react";
import './style.css';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Controls from "../controls";
import Head from "../head";
import List from "../list"
import { formatPrice } from "../../utils";

function Cart(props) {
  const cn = bem('Cart');

  if (!props.isCartOpen) return null;

  return (
    <div className={cn()}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cn('overlay')}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cn('modalDialog')}
        >
          <Head title='Корзина'>
            <Controls handleClick={props.onCloseCart}
                      text={'Закрыть'}
            />
          </Head>
          <div className={cn('body')}>
          {props.goods.length ?
            <>
              <div className={cn('items')}>
                <List list={props.goods}
                      cartDisplay={true}
                      onRemoveFromCart={props.onRemoveFromCart}
                />
              </div>
              <div className={cn('totalPrice')}>
                <span>Итого</span>
                <span>{formatPrice(props.totalPrice)}</span>
              </div>
            </>
            :
            <div className={cn('empty')}>
              Пусто
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  isCartOpen: PropTypes.bool,
  onCloseCart: PropTypes.func,
  goods: PropTypes.array,
  onRemoveFromCart: PropTypes.func,
  totalPrice: PropTypes.number,
}

Cart.defaultProps = {
  isCartOpen: false,
  onCloseCart: () => {},
  onRemoveFromCart: () => {}
}

export default React.memo(Cart);
