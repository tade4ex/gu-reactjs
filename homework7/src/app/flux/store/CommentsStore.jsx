import {EventEmitter} from 'events'
import {
    ADD_COMMENT,
    FETCH_COMMENTS_START,
    FETCH_COMMENTS_END,
    FETCH_COMMENT_ADD,
} from "../constants/commentsConstants";
import dispatcher from '../dispatcher';
import axios from 'axios';

class CommentsStore extends EventEmitter {
    constructor() {
        super(...arguments);

        this.data = {
            comments: []
        };

        this.comment = {
            get: null,
            add: null,
            update: null,
            remove: null
        };

        this.fetchCommentsStart = this.fetchCommentsStart.bind(this);
        this.fetchCommentsEnd = this.fetchCommentsEnd.bind(this);
        this.addComment = this.addComment.bind(this);
        this.fetchCommentAdd = this.fetchCommentAdd.bind(this);

        this.change = this.change.bind(this);
        this.changeGet = this.changeGet.bind(this);
        this.changeAdd = this.changeAdd.bind(this);
        this.changeUpdate = this.changeUpdate.bind(this);
        this.changeRemove = this.changeRemove.bind(this);
        this.handleActions = this.handleActions.bind(this);
    }

    fetchCommentsStart(postId) {
        let data = null;
        axios.post('/api/comments-all', {
            postId
        })
            .then((response) => {
                if (response.data.comments != null) {
                    data = response.data;
                }
                dispatcher.dispatch({
                    type: FETCH_COMMENTS_END,
                    payload: data
                });
            });
    }

    fetchCommentsEnd(data) {
        this.data = data;
        this.change();
    }

    addComment(comment) {
        axios.post('/api/comment-add', comment)
            .then((response) => {
                if (response.data.result.ok === 1) {
                    dispatcher.dispatch({
                        type: FETCH_COMMENT_ADD,
                        payload: response.data.ops[0]
                    });
                }
                return false;
            }).then((err) => {
        });
    }

    fetchCommentAdd(comment) {
        this.comment.add = comment;
        this.changeAdd();
    }

    change() {
        this.emit('change', this.data);
    }

    changeGet() {
        this.emit('change-get', this.comment.get);
    }

    changeAdd() {
        this.emit('change-add', this.comment.add);
    }

    changeUpdate() {
        this.emit('change-update', this.comment.update);
    }

    changeRemove() {
        this.emit('change-remove', this.comment.remove);
    }

    handleActions(action) {
        switch (action.type) {
            case FETCH_COMMENTS_START: {
                this.fetchCommentsStart(action.payload);
                break;
            }
            case FETCH_COMMENTS_END: {
                this.fetchCommentsEnd(action.payload);
                break;
            }
            case ADD_COMMENT: {
                this.addComment(action.payload);
                break;
            }
            case FETCH_COMMENT_ADD: {
                this.fetchCommentAdd(action.payload);
                break;
            }
        }
    }
}

const commentStore = new CommentsStore;
dispatcher.register(commentStore.handleActions);
export default commentStore;