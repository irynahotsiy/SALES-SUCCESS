import React, { Component } from "react";
import ProductForm from "../ProductForm/ProductForm";
import ProductsTable from "../ProductsTable/ProductsTable";
import ReportForm from "../ReportForm/ReportForm";

import {
  ProductFormWrapper,
  Products,
  ContentWrapper,
  ProductFormSection
} from "./Style";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  handleNewProduct = newProduct => {
    this.setState({
      products: [...this.state.products, newProduct]
    });
  };

  handleClear = date => {
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

  render() {
    const groupedProducts = groupProductsByDate(this.state.products);
    let sortedByDate = groupedProducts.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    return (
      <>
        <ContentWrapper>
          <ProductFormSection>
            <ProductFormWrapper>
              <header>Accounting App</header>
              <ProductForm
                onAddProduct={this.handleNewProduct}
              />
            </ProductFormWrapper>

            <Products>
              <header>Products</header>
              <ProductsTable sortedProducts={sortedByDate} onClearDate={this.handleClear} />
            </Products>
          </ProductFormSection>
        </ContentWrapper>
        <ReportForm
          sortedProducts={sortedByDate}
          products={this.state.products}
        />
      </>
    );
  }
}

export default Main;

function groupProductsByDate(products) {
  let groups = {};
  for (let product of products) {
    let date = product.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(product);
  }
  const groupedProducts = [];
  for (let date in groups) {
    groupedProducts.push({ date: date, items: groups[date] });
  }
  return groupedProducts;
}
