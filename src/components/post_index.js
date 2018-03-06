import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <Link to={`/posts/${post.id}`}>
          <li className="list-group-item" key={post.id}>
            {post.title}
          </li>
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPost })(PostIndex);
