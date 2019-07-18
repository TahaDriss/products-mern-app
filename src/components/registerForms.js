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

class register extends Component {
  state = {
    email: "",
    password: "",
    nom: ""
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
  handleSubmit(event, context) {
    event.preventDefault();
    let object = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    axios
      .post("http://localhost:5000/auth/register", this.state)
      .then(response => {
        // handle success
        console.log(response);
        alert("Account added ! ");
        this.props.history.push("/");
      })
      .catch(function(error) {
        // handle error
        alert("Error");
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
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="name"
                label="Name"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                onChange={this.handleChange}
                type="password"
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
            <Link to="/">Login</Link>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(register);
