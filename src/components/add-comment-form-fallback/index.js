import {memo, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function AddCommentFormFallback(props) {
  const cn = bem('AddCommentFormFallback');

  const callbacks = {
    onCancel: props.onCancel,
  }

  const formRef = useRef(null);

  useEffect(() => {
    const rect = formRef.current.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight && props.replyMode === true) {
      formRef.current.scrollIntoView({behavior: "smooth", block: 'center'});
    }
  }, []);

  return (
    <div
      ref={formRef}
      style={{
        paddingLeft: props.replyMode ? `${props.replyIndent}px` : `${props.defaultIndent}px`,
        paddingBottom: !props.replyMode ? `${props.replyIndent}px` : `${props.defaultIndent}px`
    }}
      className={cn()}>
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
            <button type={'button'} className={cn('cancel')} onClick={callbacks.onCancel}>{props.t('addCommentFormFallback.replyCancel')}</button>
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
  indent: PropTypes.number,
  t: PropTypes.func
}

AddCommentFormFallback.defaultProps = {
  onCancel: () => {},
  t: (text) => text
}

export default memo(AddCommentFormFallback);
