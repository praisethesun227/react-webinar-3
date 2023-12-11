import {memo} from 'react';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom";

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id),
    onCloseModal: () => props.closeModal()
  };

  return (
    <div className={cn()}>
      {props.link ?
        <Link className={cn('title')} onClick={callbacks.onCloseModal} to={props.link}>{props.item.title}</Link>
        :
        <div className={cn('title')}>{props.item.title}</div>
      }
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.translate('item_pcs', 'pcs')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.translate('item_remove', 'Remove')}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  link: PropTypes.string,
  onRemove: PropTypes.func,
  closeModal: PropTypes.func,
  translate: PropTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {},
  translate: (key, defaultVal) => defaultVal
}

export default memo(ItemBasket);
