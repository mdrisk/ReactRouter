import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
  renderField(field) {
    const className = `form-group ${
      field.meta.touched && field.meta.error ? 'has-danger' : ''
    }`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" component={this.renderField} label="Title" />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field
          name="content"
          component={this.renderField}
          label="Post Content"
        />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  // values is object that has (in this case) three properties
  // values.title, values.categories, and values.content
  //ie {title: "askdbnoaiwhd", categories:"oaihwdoqwbhd", content:"doihawoidh"}
  const errors = {};

  //validation occurs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter Content';
  }

  //if errors is empty, form is good to submit
  //if errors has any properties, no good
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostNew));
