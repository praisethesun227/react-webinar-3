import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function AddCommentFormFallback(props) {
  const cn = bem('AddCommentFormFallback');

  const callbacks = {
    onCancel: props.onCancel,
  }

  return (
    <div className={cn()}>
      <Link
        className={cn('link')}
        to={props.link}
        state={{
          back: location.pathname
        }}
      >
        {props.t('addCommentFormFallback.loginLink')}
      </Link>
      {
        props.replyMode ?
          <>
            <span className={cn('prompt')}>{props.t('addCommentFormFallback.replyPrompt')}</span>
            <span> </span>
            <button className={cn('cancel')} onClick={callbacks.onCancel}>{props.t('addCommentFormFallback.replyCancel')}</button>
          </>
          :
          <span className={cn('prompt')}>{props.t('addCommentFormFallback.commentPrompt')}</span>
      }
    </div>
  )
}

AddCommentFormFallback.propTypes = {
  onCancel: PropTypes.func,
  link: PropTypes.string,
  replyMode: PropTypes.bool,
  t: PropTypes.func
}

AddCommentFormFallback.defaultProps = {
  onCancel: () => {},
  t: (text) => text
}

export default memo(AddCommentFormFallback);
