import Dashboard from "./container/dashboard";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import SignIn from "./components/Login/SignIn";
import { Component } from "react";

require('dotenv').config()
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  PrivateRouter = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signIn" />
        )
      }
    />
  );
  // componentDidMount() {
  //   const expiresIn = new Date(localStorage.getItem('expiresIn'))
  //   console.log('expiresIn : ', expiresIn)
  //   console.log(new Date())
  //   if (expiresIn <= new Date()) {
  //     localStorage.clear();
  //   }
  //   else {
  //     setTimeout(() => {
  //       localStorage.clear();
  //       window.location.reload();
  //     },((expiresIn.getTime() - new Date().getTime()) / 1000))
  //   }
  // }
  render() {
    return (
      <Router>
        <Route path="/signIn" component={SignIn} />
        <this.PrivateRouter path="/" component={Dashboard} />
      </Router>
    )
  }
}

