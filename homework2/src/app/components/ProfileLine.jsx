import React from 'react';

class ProfileLine extends React.Component {
    render() {
        return <div><b>{this.props.label}</b>: {this.props.value}</div>
    }
}

export default ProfileLine;