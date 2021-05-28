import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./components/Login/SignIn";
import Dashboard from "./container/dashboard";
import { authCheckState } from "./store/actions/authenticate";

require('dotenv').config()
function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.authenticate.token);

  useEffect(() => {
    dispatch(authCheckState())
  }, [])

  let router = (
    <Switch>
      <Route exact path="/signIn" component={SignIn} />
      <Redirect to="/signIn" />
    </Switch>
  )
  if (token) {
    router = (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <Router>
      {router}
    </Router>
  )
}

export default App;

