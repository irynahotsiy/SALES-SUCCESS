import React, { Component } from "react";
import ProductForm from "../ProductForm/ProductForm";
import ProductsTable from "../ProductsTable/ProductsTable";
import ReportForm from "../ReportForm/ReportForm";
import { getRates } from "../../services/Report";
import Loading  from "../Loading/Loading";
import { LoadBox } from "./Style";
import Error from "../Error/Error";

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
      currencyRates: [],
      isLoading: true,
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

 async componentDidMount() {
  try {
    let rates = await getRates();
    console.log(rates);
    let keys = Object.keys(rates.rates);
    this.setState ({
      currencyRates: keys,
      isLoading: false,
    });
  } catch (error) {
    console.log(error);
    this.setState({ error, isLoading: false });
  }
    
    console.log(this.state.currencyRates);
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

    if (this.state.isLoading) {
      return (
        <LoadBox>
          <Loading />
        </LoadBox>
      )
    }
    else if (this.state.error) {
      return (
      <Error />
      )
    }

    return (
      <>
        <ContentWrapper>
          <ProductFormSection>
            <ProductFormWrapper>
              <header>Accounting App</header>
              <ProductForm
                onAddProduct={this.handleNewProduct}
                currTypes={this.state.currencyRates}
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
          currTypes={this.state.currencyRates}
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
