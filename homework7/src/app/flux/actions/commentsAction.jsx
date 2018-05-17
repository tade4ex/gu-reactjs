import dispacher from '../dispatcher';
import {ADD_COMMENT, FETCH_COMMENTS_START} from "../constants/commentsConstants";

export function addComment(userId, postId, userTitle, comment, createDateTime) {
    let _comment = {
        userId,
        postId,
        userTitle,
        comment,
        createDateTime
    };

    dispacher.dispatch({
        type: ADD_COMMENT,
        payload: _comment
    });
}

export function fetchComments(postId) {
    setTimeout(() => {
        dispacher.dispatch({
            type: FETCH_COMMENTS_START,
            payload: postId
        });
    }, 1);
}