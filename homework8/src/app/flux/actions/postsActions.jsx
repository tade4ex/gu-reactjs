import dispacher from '../dispatcher';
import {ADD_POST, FETCH_POSTS_START, GET_POST} from "../constants/postsConstatns";

export function addPost(createDateTime, img, post, author, commentsCount) {
    let _post = {
        createDateTime,
        img,
        post,
        author,
        commentsCount
    };

    dispacher.dispatch({
        type: ADD_POST,
        payload: _post
    });
}

export function getPost(postId) {
    setTimeout(() => {
        dispacher.dispatch({
            type: GET_POST,
            payload: postId
        });
    }, 1)
}

export function fetchPosts(page, limitPerPage) {
    let params = {
        page,
        limitPerPage
    };

    dispacher.dispatch({
        type: FETCH_POSTS_START,
        payload: params
    });
}