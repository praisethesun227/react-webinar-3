import {memo, useCallback} from "react";
import Comment from "../comment";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import AddCommentForm from "../add-comment-form";
import AddCommentFormFallback from "../add-comment-form-fallback";

function CommentsList(props) {
  const cn = bem('CommentsList')

  const callbacks = {
    submitArticleComment: useCallback((comment) => {
      props.onSubmit(props.parent, comment, 'article');
    }, [props.parent])
  }

  return (
    <div className={cn()}>
      {
         props.comments.map(comment => (
          <Comment
            key={comment._id}
            selected={comment._id === props.selectedComment}
            comment={comment}
            authorized={props.authorized}
            onSubmit={props.onSubmit}
            onSelect={props.onSelect}
            onCancel={props.onCancel}
            fallbackLink={props.fallbackLink}
            t={props.t}
          />
        ))
      }
      {
        props.parent === props.selectedComment ?
          props.authorized ?
            <AddCommentForm t={props.t} replyMode={false} onSubmit={callbacks.submitArticleComment}/>
            :
            <AddCommentFormFallback t={props.t} replyMode={false} link={props.fallbackLink}/>
          :
          null
      }
    </div>
  )
}

CommentsList.propTypes = {
  onSubmit: PropTypes.func,
  parent: PropTypes.string,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
  selectedComment: PropTypes.string,
  authorized: PropTypes.bool,
  fallbackLink: PropTypes.string,
  t: PropTypes.func,
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string
  })).isRequired
}

CommentsList.defaultProps = {
  t: (text) => text,
  onSelect: () => {},
  onCancel: () => {},
  onSubmit: () => {}
}

export default memo(CommentsList);
