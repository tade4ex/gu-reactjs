import React, {Component} from 'react';
import {Media} from 'react-bootstrap';
import {Link} from 'react-router';

export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Media>
                 <Media.Left className="media-top">
                     <a>
                         <img className="media-object" src={this.props.img.src} alt={this.props.img.alt}/>
                     </a>
                 </Media.Left>
                 <Media.Body>
                     <h4 className="media-heading">{this.props.post.title}<br/><span className="label label-default">{this.props.createDateTime}</span>
                     </h4>
                     <p>{this.props.post.shortText}</p>
                     <p><b>Author:</b> <Link to={`/profile/${this.props.author._id}`}>{this.props.author.title}</Link></p>
                     <p>
                         <b>Comments({this.props.commentsCount})</b>, <Link to={`/post/${this.props._id}`}>Read more</Link>
                     </p>
                 </Media.Body>
                 <hr/>
            </Media>
    }
}