import React from "react";
import MaterialTable from "material-table";
const axios = require("axios");

function addProduct(prod) {
  axios
    .post("http://localhost:5000/products/add", prod, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(response => {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}
function editProduct(prod) {
  axios
    .post("http://localhost:5000/products/edit/" + prod._id, prod, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(response => {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}
function deleteProduct(prod) {
  axios({
    method: "post",
    url: "http://localhost:5000/products/delete/" + prod._id,
    responseType: "json",
    headers: { Authorization: localStorage.getItem("token") }
  })
    .then(response => {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}
export default function SimpleTable(props) {
  const { data, ...rest } = props;
  console.log("Simple Table ");
  console.log(rest);

  const columns = [
    { title: "Id", field: "_id", type: "numeric" },
    { title: "Name", field: "name" },
    { title: "Type", field: "type" },
    { title: "Price", field: "price", type: "numeric" },
    { title: "Rating", field: "rating", type: "numeric" },
    { title: "Warranty years", field: "warranty_years", type: "numeric" },
    { title: "available", field: "available", type: "boolean" }
  ];

  return (
    <MaterialTable
      title="Products List"
      columns={columns}
      data={[]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              //const data = [...state.data];
              //data.push(newData);
              // setState({ ...state, data });
              console.log(newData);
              addProduct(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              // const data = [...data];
              // data[data.indexOf(oldData)] = newData;
              //setState({ ...state, data });
              editProduct(newData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              deleteProduct(oldData);
            }, 600);
          })
      }}
    />
  );
}
