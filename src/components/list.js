import React from "react";
import MaterialTableDemo from "./simpleTable";
import io from "socket.io-client";
const axios = require("axios");

class List extends React.Component {
  state = {
    data: ""
  };

  componentDidMount() {
    this.server = "http://127.0.0.1:5000/";
    this.socket = io.connect(this.server);
    this.socket.on("message", message => {
      console.log(message);
      this.getProducts();
    });

    this.getProducts();
  }
  getProducts() {
    axios({
      method: "get",
      url: "http://localhost:5000/products",
      responseType: "json",
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(response => {
        // handle success
        this.setState({
          data: response.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        {(() => {
          if (data.length !== 0) return <MaterialTableDemo data={data} />;
        })()}
      </>
    );
  }
}

export default List;
