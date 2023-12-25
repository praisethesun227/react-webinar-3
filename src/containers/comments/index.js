import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {default as useSelectorStore} from '../../hooks/use-selector';
import listToTree from "../../utils/list-to-tree";
import CommentsTitle from "../../components/comments-title";
import useTranslate from "../../hooks/use-translate";
import commentsActions from '../../store-redux/comments/actions';
import CommentRecursive from "../../components/comment-recursive";
import Spinner from "../../components/spinner";

function Comments() {
  const selectStore = useSelectorStore(state => ({
    authorized: state.session.exists,
    authorizedUserId: state.session.user?._id
  }))

  const select = useSelector(state => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
    parentId: state.comments.parentId,
    justPostedUserComment: state.comments.justPostedUserComment
  }))

  const dispatch = useDispatch();

  const [selectedComment, setSelectedComment] = useState(select.parentId);
  useEffect(() => {
    setSelectedComment(select.parentId);
  }, [select.parentId]);

  const {t, lang} = useTranslate();

  const callbacks = {
    onSelect: useCallback((id) => {
      setSelectedComment(id);
    }, [setSelectedComment]),

    onSubmit: useCallback((parentId, comment, parentType) => {
      dispatch(commentsActions.post(parentId, comment, parentType));
      setSelectedComment(select.parentId);
    }, [dispatch, select.parentId]),

    onCancel: useCallback(() => {
      setSelectedComment(select.parentId);
    }, [select.parentId, setSelectedComment])
  }

  const commentsTree = useMemo(() => listToTree(select.comments), [select.comments, lang])

  return (
    <>
      <CommentsTitle title={t('comments.title')} count={select.count}/>
      <Spinner active={select.waiting}>
        <CommentRecursive
          childComments={commentsTree}
          nestingLevel={0}
          nestingLimit={15}
          nestingPadding={30}
          nestingStartPadding={40}
          authorized={selectStore.authorized}
          onSelect={callbacks.onSelect}
          selectedComment={selectedComment}
          t={t}
          parentArticle={select.parentId}
          onCancel={callbacks.onCancel}
          onSubmit={callbacks.onSubmit}
          authorizedUserId={selectStore.authorizedUserId}
        />
      </Spinner>
    </>
  )
}

export default memo(Comments);
