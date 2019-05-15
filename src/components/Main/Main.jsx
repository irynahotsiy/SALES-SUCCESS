import React, { Component } from "react";
import AddProduct from "../AddProduct/AddProduct";
import Table from "../Table/Table";
import ReportForm from "../ReportForm/ReportForm";

import { Form, Products, Content, FormProduct } from "./Style";

function groupByDate(products) {
  let groups = {};
  for (let i = 0; i < products.length; i++) {
    let date = products[i].date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(products[i]);
  }
  const groupedProducts = [];
  for (let date in groups) {
    groupedProducts.push({ date: date, items: groups[date] });
  }
  return groupedProducts;
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      newItem: "",
      newPrice: "",
      newCurrency: "UAH",
      dateOfSale: "",
    };
  }

  updateVal = e => {
    this.setState({
      newItem: e.target.value
    });
  };

  updatePrice = e => {
    this.setState({
      newPrice: e.target.value
    });
  };

  updateCurr = e => {
    this.setState({
      newCurrency: e.target.value
    });
  };

  updateDate = e => {
    this.setState({
      dateOfSale: e.target.value
    });
  };


  handleSubmit = e => {
    let products = this.state.products;
    for (let i = 0; i < products.length; i++) {
      products[i].visible = false;
    }
    this.setState({
      products: products
    });
    this.setState({
      products: [
        ...this.state.products,
        {
          date: this.state.dateOfSale,
          product: this.state.newItem,
          price: this.state.newPrice,
          currency: this.state.newCurrency
        }
      ],
      newItem: "",
      newPrice: "",
      newCurrency: "UAH",
      dateOfSale: ""
    });
    e.preventDefault();
  };

  onClearClick = date => {
    console.log(date);
    this.setState({
      products: this.state.products.filter(el => el.date !== date)
    });
  };


  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  hydrateStateWithLocalStorage() {
    if (localStorage.hasOwnProperty("products")) {
      let value = localStorage.getItem("products");
      value = JSON.parse(value);
      this.setState({
        products: value
      });
    }
  }

  saveStateToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(this.state.products));
  }

  /*render*/

  render() {
    const groupedProducts = groupByDate(this.state.products);
    let sortByDate = groupedProducts.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    /*return */
    return (
      <>
        <Content>
          <FormProduct>
            <Form>
              <header>Sales success</header>
              <AddProduct
                onHandleSubmit={this.handleSubmit}
                product={this.state.newItem}
                onAddProduct={this.updateVal}
                price={this.state.newPrice}
                onAddPrice={this.updatePrice}
                curr={this.state.newCurrency}
                onEddCurr={this.updateCurr}
                date={this.state.dateOfSale}
                onEddDate={this.updateDate}
              />
            </Form>

            <Products>
              <header>Products</header>
              <Table 
              sortedProducts={sortByDate} 
              onClear={this.onClearClick} />
            </Products>
          </FormProduct>
        </Content>
        <ReportForm
          sortedProducts={sortByDate}
          products={this.state.products}
        />
      </>
    );
  }
}
export default Main;
