import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/textFieldGroups'


 class Register extends Component {
  constructor () {
    super();
    this.state ={
      name:'',
      email:'',
      password:'',
      password2:'',
      errors:{}
    };
  
  this.onChange=this.onChange.bind(this);
  this.onSubmit=this.onSubmit.bind(this);
  }

  componentDidMount() {

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
}

onSubmit(e) {

  e.preventDefault();

  const newUser ={
    name:this.state.name,
    email:this.state.email,
    password:this.state.password,
    password2:this.state.password2
  };
  this.props.registerUser(newUser);

   // can be done with actions by using withRouter module (done in video)
  //console.log(this.props);
 }
 
  render() {
    const { errors }= this.props;
   const {user}=this.props.auth;

    return (
      <div className="register">
      {user ? user.name : null}
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            
            <form noValidate onSubmit={this.onSubmit}>

            <TextFieldGroup
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
               />
               
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
               />

              <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
               />
             
              
             <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
              //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
               />
              
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  
    )
  }
}

const mapStateToProps =(state)=> {
  console.log(state)
  
return {
  auth : state.auth,
  errors: state.errors
}
}

export default connect(mapStateToProps, { registerUser })(Register)
// have to create routes for these components