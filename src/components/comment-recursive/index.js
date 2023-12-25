import React, {memo} from "react";
import AddCommentForm from "../add-comment-form";
import AddCommentFormFallback from "../add-comment-form-fallback";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import localizedDateFormat from "../../utils/localized-date-format";

function CommentRecursive(props) {
  const cn = bem('CommentRecursive');

  let padding;
  if (props.nestingLevel === 0)
    padding = props.nestingStartPadding;
  else
    padding = (props.nestingLevel > props.nestingLimit) ? 0 : props.nestingPadding;

  return (
    props.childComments.map(comment => {
      if (!comment.parent) {
        return (
          <React.Fragment key={'fragment'}>
            {
              comment.children &&
              <CommentRecursive
                {...props}
                childComments={comment.children}
              />
            }
            {
              props.selectedComment === props.parentArticle ?
                props.authorized ?
                  <AddCommentForm
                    replyMode={false}
                    replyIndent={props.nestingPadding}
                    defaultIndent={props.nestingStartPadding}
                    t={props.t}
                    onCancel={props.onCancel}
                    onSubmit={(text) => props.onSubmit(props.parentArticle, text, 'article')}
                  />
                  :
                  <AddCommentFormFallback
                    replyMode={false}
                    replyIndent={props.nestingPadding}
                    defaultIndent={props.nestingStartPadding}
                    t={props.t}
                    onCancel={props.onCancel}
                    link={'/login'}
                  />
                :
                null
            }
          </React.Fragment>
        )
      }

      return (
        <div style={{paddingLeft: `${padding}px`}} key={comment._id} className={cn()}>
          <div className={cn('head')}>
            <span className={cn('username', {highlighted: comment.author._id === props.authorizedUserId})}>{comment.author.profile.name}</span>
            <span className={cn('date')}>{localizedDateFormat(comment.dateCreate, props.t)}</span>
          </div>
          <div className={cn('text')}>
            {comment.text}
          </div>
          {
            props.selectedComment === comment._id ||
            <button onClick={() => props.onSelect(comment._id)} className={cn('replyBtn')}>{props.t('comment.reply')}</button>
          }
          {
            comment.children &&
            <CommentRecursive
              {...props}
              childComments={comment.children}
              nestingLevel={props.nestingLevel + 1}
            />
          }
          {
            props.selectedComment === comment._id && (
              props.authorized ?
                <AddCommentForm
                  replyIndent={props.nestingPadding}
                  defaultIndent={props.nestingStartPadding}
                  replyMode={true}
                  t={props.t}
                  onCancel={props.onCancel}
                  username={comment.author.profile.name}
                  onSubmit={(text) => props.onSubmit(comment._id, text, 'comment')}
                />
                :
                <AddCommentFormFallback
                  replyIndent={props.nestingPadding}
                  defaultIndent={props.nestingStartPadding}
                  replyMode={true}
                  t={props.t}
                  onCancel={props.onCancel}
                  username={comment.author.profile.name}
                  link={'/login'}
                />
            )
          }
        </div>
      )
    })
  )
}

export default memo(CommentRecursive);
