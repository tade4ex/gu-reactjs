import {EventEmitter} from 'events'
import {
    ADD_POST,
    FETCH_POSTS_START,
    FETCH_POSTS_END,
    FETCH_POST_ADD,
    GET_POST,
    FETCH_POST_GET
} from "../constants/postsConstatns";
import dispatcher from '../dispatcher';
import axios from 'axios';

class PostsStore extends EventEmitter {
    constructor() {
        super(...arguments);

        this.data = {
            posts: [],
            lastPage: 0
        };

        this.post = {
            get: null,
            add: null,
            update: null,
            remove: null
        };

        this.fetchPostsStart = this.fetchPostsStart.bind(this);
        this.fetchPostsEnd = this.fetchPostsEnd.bind(this);
        this.addPost = this.addPost.bind(this);
        this.getPost = this.getPost.bind(this);
        this.fetchPostAdd = this.fetchPostAdd.bind(this);
        this.fetchPostGet = this.fetchPostGet.bind(this);

        this.change = this.change.bind(this);
        this.changeGet = this.changeGet.bind(this);
        this.changeAdd = this.changeAdd.bind(this);
        this.changeUpdate = this.changeUpdate.bind(this);
        this.changeRemove = this.changeRemove.bind(this);
        this.handleActions = this.handleActions.bind(this);
    }

    fetchPostsStart(params) {
        let data = {
            posts: [],
            lastPage: 0,
            page: 1
        };
        axios.post('/api/posts-all', {
            page: params.page,
            limit: params.limitPerPage,
        })
            .then((response) => {
                if (response.data.posts != null) {
                    data = response.data;
                }
                dispatcher.dispatch({
                    type: FETCH_POSTS_END,
                    payload: data
                });
            });
    }

    fetchPostsEnd(data) {
        this.data = data;
        this.change();
    }

    getPost(postId) {
        axios.get(`/api/post/${postId}`)
            .then((response) => {
                dispatcher.dispatch({
                    type: FETCH_POST_GET,
                    payload: response.data
                });
            });
    }

    addPost(post) {
        axios.post('/api/post-add', {
            createDateTime: post.createDateTime,
            img: post.img,
            post: post.post,
            author: post.author,
            commentsCount: post.commentsCount
        })
            .then((response) => {
                console.log(response);
                if (response.data.result.ok === 1) {
                    dispatcher.dispatch({
                        type: FETCH_POST_ADD,
                        payload: response.data.ops[0]
                    });
                }
                /* todo aler bootstrap this email exists */
                return false;
            });
    }

    fetchPostAdd(post) {
        this.post.add = post;
        this.changeAdd();
    }

    fetchPostGet(post) {
        this.post.get = post;
        this.changeGet();
    }

    change() {
        this.emit('change', this.data);
    }

    changeGet() {
        this.emit('change-get', this.post.get);
    }

    changeAdd() {
        this.emit('change-add', this.post.add);
    }

    changeUpdate() {
        this.emit('change-update', this.post.update);
    }

    changeRemove() {
        this.emit('change-remove', this.post.remove);
    }

    handleActions(action) {
        switch (action.type) {
            case FETCH_POSTS_START: {
                this.fetchPostsStart(action.payload);
                break;
            }
            case FETCH_POSTS_END: {
                this.fetchPostsEnd(action.payload);
                break;
            }
            case ADD_POST: {
                this.addPost(action.payload);
                break;
            }
            case FETCH_POST_ADD: {
                this.fetchPostAdd(action.payload);
                break;
            }
            case GET_POST: {
                this.getPost(action.payload);
                break;
            }
            case FETCH_POST_GET: {
                this.fetchPostGet(action.payload);
                break;
            }
        }
    }
}

const postStore = new PostsStore;
dispatcher.register(postStore.handleActions);
export default postStore;