import {memo} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function Pagination(props) {
  if (props.itemsPerPage >= props.itemsTotal) {
    return null;
  }

  const currentPage = props.activePage;
  const cn = bem('Pagination')

  const callbacks = {
    onLoadPage: (page) => {
      props.loadPage(props.itemsPerPage, page);
    }
  }

  const pageCount = Math.ceil(props.itemsTotal / props.itemsPerPage);
  let pages = [];
  let ellipsisCode = -1;

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  switch (true) {
    case (currentPage < 3):
      pages = [...pages.slice(0, 3), ellipsisCode, pageCount];
      break;

    case (currentPage === 3):
      pages = [...pages.slice(0, 4), ellipsisCode, pageCount];
      break;

    case (currentPage > 3 && currentPage <= pageCount - 3):
      pages = [1, ellipsisCode, ...pages.slice(currentPage - 2, currentPage + 1), ellipsisCode - 1, pageCount];
      break;

    case (currentPage === pageCount - 2):
      pages = [1, ellipsisCode, ...pages.slice(-4)];
      break;

    case (currentPage > pageCount - 2):
      pages = [1, ellipsisCode, ...pages.slice(-3)];
      break;
  }

  return (
    <div className={cn()}>
      {pages.map(page => {
        if (page < 0) {
          return (
            <div key={page} className={cn('ellipsis')}>
              ...
            </div>
          )
        }
        else {
          return (
            <div key={page} className={currentPage === page ? cn('pageButton', {selected: true}) : cn('pageButton')}
                 onClick={() => {
                   callbacks.onLoadPage(page);
                 }}
            >
              {page}
            </div>
          )
        }
      })}
    </div>
  )
}

export default memo(Pagination)

Pagination.propTypes = {
  itemsTotal: PropTypes.number,
  itemsPerPage: PropTypes.number,
  loadPage: PropTypes.func
}

Pagination.defaultProps = {
  loadPage: () => {}
}
