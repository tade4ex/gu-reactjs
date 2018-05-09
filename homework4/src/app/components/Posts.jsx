import React, {Component} from 'react';
import {Media} from 'react-bootstrap';

let imageEmpty = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNjM0MTFkMjY4YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2MzQxMWQyNjhjIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy4xNzk2ODc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==";

let postItems = [
    {
        img: {
            src: imageEmpty,
            href: '#',
            alt: ''
        },
        post: {
            title: 'Middle aligned media',
            createDateTime: '2018-05-05 19:01',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur delectus eligendi explicabo hic odit recusandae. A ab beatae facere laborum laudantium mollitia officiis, possimus ratione tempore velit? Ea, quam.'
        },
        author: {
            title: 'Tadeus Tunkevic',
            href: '#'
        },
        comments: {
            count: 12,
            href: '#'
        },
        href: '#'
    },
    {
        img: {
            src: imageEmpty,
            href: '#',
            alt: ''
        },
        post: {
            title: 'Middle aligned media',
            createDateTime: '2018-05-05 19:01',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur delectus eligendi explicabo hic odit recusandae. A ab beatae facere laborum laudantium mollitia officiis, possimus ratione tempore velit? Ea, quam.'
        },
        author: {
            title: 'Tadeus Tunkevic',
            href: '#'
        },
        comments: {
            count: 12,
            href: '#'
        },
        href: '#'
    },
    {
        img: {
            src: imageEmpty,
            href: '#',
            alt: ''
        },
        post: {
            title: 'Middle aligned media',
            createDateTime: '2018-05-05 19:01',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur delectus eligendi explicabo hic odit recusandae. A ab beatae facere laborum laudantium mollitia officiis, possimus ratione tempore velit? Ea, quam.'
        },
        author: {
            title: 'Tadeus Tunkevic',
            href: '#'
        },
        comments: {
            count: 12,
            href: '#'
        },
        href: '#'
    },
    {
        img: {
            src: imageEmpty,
            href: '#',
            alt: ''
        },
        post: {
            title: 'Middle aligned media',
            createDateTime: '2018-05-05 19:01',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur delectus eligendi explicabo hic odit recusandae. A ab beatae facere laborum laudantium mollitia officiis, possimus ratione tempore velit? Ea, quam.'
        },
        author: {
            title: 'Tadeus Tunkevic',
            href: '#'
        },
        comments: {
            count: 12,
            href: '#'
        },
        href: '#'
    },
];

export default class Posts extends Component {
    render() {
        let posts = postItems.map((post, key) => <Media key={key}>
            <div className="media-left media-top">
                <a href={post.img.href}>
                    <img className="media-object" src={post.img.src} alt={post.img.alt}/>
                </a>
            </div>
            <div className="media-body">
                <h4 className="media-heading">{post.post.title} <span className="label label-default">{post.post.createDateTime}</span>
                </h4>
                <p>{post.post.text}</p>
                <p><b>Author:</b> <a href={post.author.href}>{post.author.title}</a></p>
                <p>
                    <a href={post.comments.href}>Comments({post.comments.count})</a>, <a href={post.href}>Read more</a>
                </p>
            </div>
            <hr/>
        </Media>);
        return (
            <div>{posts}</div>
        );
    }
}