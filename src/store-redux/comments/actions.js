export default {
  /**
   * Загрузка комментариев
   * @param parentId
   * @return {Function}
   */
  load: (parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start', payload: {parentId: parentId}});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),
          count&limit=*&search[parent]=${parentId}`
        });

        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
      } catch (e) {
        dispatch({type: 'comments/load-error', payload: {error: e.message}});
      }
    }
  },

  post: (parentId, comment, parentType) => {
    return async (dispatch, getState, services) => {
      dispatch({type: "comments/post-start"});

      try {
        const res = await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify({
            text: comment,
            parent: {
              _id: parentId,
              _type: parentType,
            },
          }),
        });

        const username = services.store.actions.session.getState().user.profile.name;
        const post = {
          ...res.data.result,
          author: {
            ...res.data.result.author,
            profile: {
              name: username
            }
          }
        }

        dispatch({
          type: "comments/post-success",
          payload: {data: post},
        });
      } catch (e) {
        dispatch({type: "comments/post-error", payload: {error: e.message}});
      }
    }
  }
}
