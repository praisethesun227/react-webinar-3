import {memo, useCallback} from "react";
import PropTypes, {shape} from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import AddCommentForm from "../add-comment-form";
import AddCommentFormFallback from "../add-comment-form-fallback";

function Comment(props) {
  const NESTING_INDENT = 30;
  const NESTING_LIMIT = 15;
  const cn = bem('Comment');

  const callbacks = {
    onSelect: useCallback(() => {
      props.onSelect(props.comment._id)
    }, [props.comment._id]),

    onCancel: props.onCancel,

    onSubmit: useCallback((comment) => {
      props.onSubmit(props.comment._id, comment, 'comment')
    }, [props.comment._id])
  }

  const nestingLevel = props.comment.nestingLevel > NESTING_LIMIT ? NESTING_LIMIT : props.comment.nestingLevel;

  return (
    <div className={cn()} style={{paddingLeft: `${nestingLevel * NESTING_INDENT}px`}}>
      <div className={cn('head')}>
        <span className={cn('username', {highlighted: props.comment.highlighted})}>{props.comment.author.profile.name}</span>
        <span className={cn('date')}>{props.comment.formattedDate}</span>
      </div>
      <div className={cn('text')}>
        {props.comment.text}
      </div>
      {
        props.selected ?
          props.authorized ?
            <AddCommentForm
              parentId={props.comment._id}
              onSubmit={callbacks.onSubmit}
              onCancel={callbacks.onCancel}
              replyMode={true}
              username={props.comment.author.profile.name}
              t={props.t}
            />
            :
            <AddCommentFormFallback
              t={props.t}
              link={props.fallbackLink}
              onCancel={callbacks.onCancel}
              replyMode={true}/>
          :
          <button onClick={callbacks.onSelect} className={cn('replyBtn')}>{props.t('comment.reply')}</button>
      }
    </div>
  )
}

Comment.propTypes = {
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  selected: PropTypes.bool,
  authorized: PropTypes.bool,
  fallbackLink: PropTypes.string,
  t: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string,
    nestingLevel: PropTypes.number,
    author: shape({
      profile: shape({
        name: PropTypes.string
      })
    }),
    formattedDate: PropTypes.string,
    text: PropTypes.string,
    highlighted: PropTypes.bool
  }).isRequired
}

Comment.defaultProps = {
  t: (text) => text,
  onSelect: () => {},
  onCancel: () => {},
  onSubmit: () => {}
}

export default memo(Comment);
