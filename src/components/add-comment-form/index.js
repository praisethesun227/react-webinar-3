import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AddCommentForm(props) {
  const [comment, setComment] = useState('');
  const cn = bem('AddCommentForm');

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      if (comment.trim() === '') return;
      props.onSubmit(comment);
    },
    onCancel: props.onCancel
  }

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <div className={cn('head')}>{props.t('addCommentForm.head')}</div>
      <textarea
        name={'comment'}
        value={comment}
        placeholder={props.replyMode ? `${props.t('addCommentForm.reply')} ${props.username}` : props.t('addCommentForm.comment')}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      >
      </textarea>
      <div className={cn('actions')}>
        <button type={'submit'}>{props.t('addCommentForm.submit')}</button>
        {props.replyMode && <button onClick={callbacks.onCancel} type={'submit'}>{props.t('addCommentForm.cancel')}</button>}
      </div>
    </form>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
  t: PropTypes.func,
  onCancel: PropTypes.func,
  replyMode: PropTypes.bool,
  username: PropTypes.string
}

AddCommentForm.defaultProps = {
  t: (text) => text,
  onSubmit: () => {},
  onCancel: () => {}
}

export default memo(AddCommentForm);
