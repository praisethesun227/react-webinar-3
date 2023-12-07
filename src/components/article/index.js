import {memo} from 'react';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";

function Article(props) {
  const cn = bem('Article');
  const info = props.info;

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {info.description}
      </div>
      <br/>
      <div className={cn('manufacturer')}>
        <span>Страна производитель: </span>
        <span className={cn('country')}>{info.madeIn.title} ({info.madeIn.code})</span>
      </div>
      <br/>
      <div className={cn('category')}>
        <span>Категория: </span>
        <span className={cn('categoryTitle')}>{info.category.title}</span>
      </div>
      <br/>
      <div className={cn('issueYear')}>
        <span>Год выпуска: </span>
        <span className={cn('year')}>{info.edition}</span>
      </div>
      <br/>
      <div className={cn('price')}>
        <span className={cn('priceTitle')}>Цена: </span>
        <span className={cn('priceValue')}>{numberFormat(info.price)} ₽</span>
      </div>
      <br/>
      <button className={cn('addBtn')} onClick={() => props.onAdd(info._id)}>
        Добавить
      </button>
    </div>
  )
}

export default memo(Article);
