import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      props.list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item}
                onAddToCart={props.onAddToCart}
                onRemoveFromCart={props.onRemoveFromCart}
                cartDisplay={props.cartDisplay}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
  })).isRequired,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  cartDisplay: PropTypes.bool.isRequired
}

List.defaultProps = {
  onAddToCart: () => {},
  onRemoveFromCart: () => {},
}

export default React.memo(List);
