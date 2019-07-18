import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

const axios = require("axios");

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
      .spacing.unit * 5}px`
  },
  container: {
    maxWidth: "200px"
  }
});

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(this.state);
  }
  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", this.state)
      .then(response => {
        // handle success
        console.log(response);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem("token"));
        this.props.action();
      })
      .catch(function(error) {
        // handle error
        alert("Incorrect login or password");
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
    console.log(this.state);
  }

  render() {
    const classes = this.props;
    return (
      <React.Fragment>
        <div
          className={classes.container}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh"
          }}
        >
          <Paper elevation={1} className={classes.paper}>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="email"
                label="Email"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                type="password"
                onChange={this.handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
            <Link to="/register">Register</Link>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LogIn);
