import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //inputChecks
    if (name === "") {
      this.setState({
        errors: {
          name: "Name is required"
        }
      });
      return;
    }

    if (email === "") {
      this.setState({
        errors: {
          email: "email is required"
        }
      });
      return;
    }

    if (phone === "") {
      this.setState({
        errors: {
          Phone: "Phone is required"
        }
      });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/users`, newContact)
      .then(res => dispatch({ type: "ADD_CONTACT", payload: res.data }));

    //Clear
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    //redirect
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-3'>
              <div className='card-header'>
                <h1>Add contact</h1>
              </div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='Enter email...'
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label='Phone'
                    name='phone'
                    placeholder='Enter phone...'
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type='submit'
                    value='Add Contact'
                    className='btn btn-light btn-block'
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
