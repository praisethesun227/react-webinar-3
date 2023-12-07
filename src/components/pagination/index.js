import {memo, useState} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Pagination(props) {
  if (props.itemsPerPage >= props.itemsTotal) {
    return null;
  }

  const cn = bem('Pagination')
  const [currentPage, setCurrentPage] = useState(1);

  const callbacks = {
    onLoadPage: (page) => {
      props.loadPage(props.itemsPerPage, page);
      setCurrentPage(page);
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
                   setCurrentPage(page);
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
