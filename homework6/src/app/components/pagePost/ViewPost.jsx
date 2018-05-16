import React, {Component} from 'react';
import {Media} from 'react-bootstrap';
import Comments from "../Comments";

let imageEmpty = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNjM0MTFkMjY4YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2MzQxMWQyNjhjIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy4xNzk2ODc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==";

export default class ViewPost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let img = null;
        if (this.props.img === null) {
            img = {
                src: imageEmpty,
                alt: ''
            };
        } else {
            img = this.props.img;
        }
        let comments = <Comments postId={this.props._id} user={this.props.user} authorization={this.props.authorization}/>;
        return <Media>
            <Media.Left className="media-top">
                <a>
                    <img className="media-object" src={img.src} alt={img.alt}/>
                </a>
            </Media.Left>
            <Media.Body>
                <h4 className="media-heading">{this.props.post.title} <span className="label label-default">{this.props.createDateTime}</span>
                </h4>
                <p>{this.props.post.longText}</p>
                <p><b>Author:</b> <a>{this.props.author.title}</a></p>
                <p>
                    <b>Comments ({this.props.commentsCount})</b>
                </p>
                <hr/>
                {comments}
            </Media.Body>
        </Media>
    }
}