import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

List.defaultProps = {
}

export default React.memo(List);
