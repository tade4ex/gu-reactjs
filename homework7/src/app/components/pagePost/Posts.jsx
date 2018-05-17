import React, {Component} from 'react';
import Post from "./Post";
import {Link} from 'react-router';

import PostsStore from "../../flux/store/PostsStore";
import {fetchPosts} from "../../flux/actions/postsActions";

let imageEmpty = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNjM0MTFkMjY4YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2MzQxMWQyNjhjIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy4xNzk2ODc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            lastPage: 0
        };

        this.page = parseInt(this.props.page);
        this.limitPerPage = 5;

        this.onPostsChange = this.onPostsChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.page = parseInt(nextProps.page);
        fetchPosts(this.page, this.limitPerPage);
    }

    onPostsChange(data) {
        this.setState({
            posts: data.posts,
            lastPage: data.lastPage
        });
    }

    componentWillMount() {
        PostsStore.on('change', this.onPostsChange);
    }

    componentDidMount() {
        fetchPosts(this.page, this.limitPerPage);
    }

    componentWillUnmount() {
        PostsStore.removeListener('change', this.onPostsChange);
    }

    render() {
        let posts = this.state.posts.map((post) => {
            if (post.img === null) {
                post.img = {
                    src: imageEmpty,
                    alt: ''
                };
            }
            return <Post {...post} key={post._id}/>
        });
        return (
            <div>
                {posts}
                <nav aria-label="">
                    <ul className="pager">
                        {this.page > 1 ? <li className="previous">
                            <Link to={`/posts/${this.page - 1}`}><span
                                aria-hidden="true">&larr;</span> Newer</Link>
                        </li> : ''}
                        {this.state.lastPage > this.page ? <li className="next">
                            <Link to={`/posts/${this.page + 1}`}>Older <span
                                aria-hidden="true">&rarr;</span></Link>
                        </li> : ''}
                    </ul>
                </nav>
            </div>
        );
    }
}