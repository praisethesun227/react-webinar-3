import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {default as useSelectorStore} from '../../hooks/use-selector';
import Spinner from "../../components/spinner";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentsTitle from "../../components/comments-title";
import useTranslate from "../../hooks/use-translate";
import CommentsList from "../../components/comments-list";
import localizedDateFormat from "../../utils/localized-date-format";
import commentsActions from '../../store-redux/comments/actions';

function Comments() {
  const selectStore = useSelectorStore(state => ({
    authorized: state.session.exists,
    authorizedUserId: state.session.user?._id
  }))

  const select = useSelector(state => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
    parentId: state.comments.parentId
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

  const comments = useMemo(() => treeToList(listToTree(select.comments), (comment, level) => ({
    ...comment,
    nestingLevel: level - 1,
    formattedDate: localizedDateFormat(comment.dateCreate, t),
    highlighted: comment.author?._id === selectStore.authorizedUserId
  })).slice(1), [select.comments, lang, localizedDateFormat, selectStore.authorizedUserId]);

  return (
    <>
      <CommentsTitle title={t('comments.title')} count={select.count}/>
      <Spinner active={select.waiting}>
        <CommentsList
          parent={select.parentId}
          selectedComment={selectedComment}
          comments={comments}
          authorized={selectStore.authorized}
          onSelect={callbacks.onSelect}
          onSubmit={callbacks.onSubmit}
          onCancel={callbacks.onCancel}
          fallbackLink={'/login'}
          t={t}
        />
      </Spinner>
    </>
  )
}

export default memo(Comments);
