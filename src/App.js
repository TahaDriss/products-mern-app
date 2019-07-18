import React from "react";
import io from "socket.io-client";
import List from "./components/list";
import LogIn from "./components/loginForms";
import Register from "./components/registerForms";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    login: false
  };
  constructor() {
    super();
    this.server = "http://127.0.0.1:5000/";
    this.socket = io.connect(this.server);
    console.log(localStorage.getItem("token"));
    this.logout = this.logout.bind(this);
    this.verifLogin = this.verifLogin.bind(this);
    this.childHandler = this.childHandler.bind(this);
  }
  componentDidMount() {
    this.verifLogin();
  }
  childHandler() {
    console.log("child handler");
    this.verifLogin();
  }
  verifLogin() {
    console.log("from verif");
    if (localStorage.getItem("token") === null) {
      console.log("from verif 1 ");

      this.setState({ login: false });
    } else {
      console.log("from verif 2");

      this.setState({ login: true });
    }
  }
  logout() {
    localStorage.removeItem("token");
    this.setState({ login: false });
  }
  render() {
    const log = ({ ...rest }) => (
      <Route
        {...rest}
        render={routeProps =>
          !this.state.login && (
            <LogIn {...routeProps} action={this.childHandler} />
          )
        }
      />
    );
    return (
      <>
        <Router>
          <Switch>
            {this.state.login && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => this.logout()}
                  >
                    Disconnect
                  </Button>
                </div>

                <List />
              </div>
            )}
            <Route exact path="/" component={log} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
