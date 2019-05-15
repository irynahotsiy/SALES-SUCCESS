import React, { Component } from "react";
import {
  Form,
  Products,
  InputBox,
  Data,
  Button,
  Sum,
  Report,
  Submit,
  Content,
  FormProduct,
  CurrentDate,
  DateStyle,
  ProductStyle
} from "./Style";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      newItem: "",
      newPrice: "",
      newCurrency: "UAH",
      dateOfSale: "",
      report: "",
      year: "",
      curr: "",
      isLoaded: false
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
  updateYear = e => {
    this.setState({
      year: e.target.value
    });
  };
  updateCurrency = e => {
    this.setState({
      curr: e.target.value
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

  groupByDate = () => {
    let groups = {};
    let products = this.state.products;
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
  };

  onClearClick = date => {
    console.log(date);
    this.setState({
      products: this.state.products.filter(el => el.date !== date)
    });
  };

  onReport = () => {
    debugger;
    if (this.state.products.length === 0) {
      this.setState({
        report: " "
      });
    } else {
      let year = parseInt(this.state.year);
      let products = this.state.products.filter(
        el => parseInt(el.date) === year
      );
      console.log(products);
      let url =
        "http://data.fixer.io/api/latest?access_key=5e2e34b6141b185a648f1be0c2a84530&symbols=UAH,PLN,USD";
      console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(
          result => {
            let sum = 0;
            for (let i = 0; i < products.length; i++) {
              let price = parseFloat(products[i].price);
              console.log(price);
              if (this.state.curr === "EUR") {
                if (products[i].currency === result.base) {
                  let priceEUR = price;
                  price = priceEUR;
                } else {
                  price = price / result.rates[products[i].currency];
                }
              } else {
                price =
                  (price / result.rates[products[i].currency]) *
                  result.rates[this.state.curr];
              }
              sum += price;
            }
            this.setState({
              report: sum.toFixed(2) + " " + this.state.curr
            });
          },
          error => {
            this.setState({
              error
            });
          }
        );
    }
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
    const groupedProducts = this.groupByDate();
    let sortByDate = groupedProducts.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    let getYears = () => {
      let years = [];
      let products = sortByDate;

      for (let i = 0; i < products.length; i++) {
        let date = parseInt(products[i].date);
        if (!years.includes(date)) {
          years.push(date);
        }
      }
      return years;
    };

    let years = getYears();
    /*return */
    return (
      <>
        <Content>
          <FormProduct>
            <Form>
              <header>Sales success</header>

              <form
                method="send"
                onSubmit={this.handleSubmit}
                autocomplete="off"
              >
                {/*Text */}
                <InputBox>
                  <label forHTML="product"> Add new product: </label>
                  <input
                    type="text"
                    value={this.state.newItem}
                    onChange={this.updateVal}
                    placeholder="Enter your product"
                    name="product"
                    required
                  />
                </InputBox>
                {/*Price */}
                <Data>
                  <InputBox>
                    <label forHTML="price">Price:</label>
                    <input
                      value={this.state.newPrice}
                      onChange={this.updatePrice}
                      type="number"
                      step="0.01"
                      min="0"
                      name="price"
                      placeholder="Price"
                      required
                    />
                  </InputBox>
                  {/*Currency */}
                  <InputBox>
                    <label forHTML="currency">¤</label>
                    <select
                      name="currency"
                      value={this.state.newCurrency}
                      onChange={this.updateCurr}
                      required
                    >
                      <option value="UAH">UAH</option>
                      <option value="USD">USD</option>
                      <option value="PLN">PLN</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </InputBox>
                  <InputBox>
                    {/*Date */}
                    <label forHTML=""> Date: </label>
                    <input
                      type="date"
                      value={this.state.dateOfSale}
                      onChange={this.updateDate}
                      name="date"
                      placeholder="Date"
                      required
                    />
                  </InputBox>
                </Data>
                <Button>
                  <Submit type="submit" value="Submit" />
                </Button>
              </form>
            </Form>

            <Products>
            <header>Products</header>
              <table>
                <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Currency</th>
                </tr>
                </thead>
                <tbody>
                {sortByDate.map(el => (
                  <>
                    <DateStyle >
                      <td colSpan={3}>
                        {" "}
                        <CurrentDate>
                        <div>{el.date}</div>
                        <a href="#"
                          onClick={() => {
                            this.onClearClick(el.date);
                          }}
                        >
                          Clear all of this date
                        </a>
                        </CurrentDate>
                      </td>
                    </DateStyle>
                    {el.items.map(item => (
                      <ProductStyle>
                        <td>{item.product}</td>
                        <td>{item.price}</td>
                        <td>{item.currency}</td>
                      </ProductStyle>
                    ))}{" "}
                  </>
                ))}
                </tbody>
              </table>
             </Products>
            
          </FormProduct>
        </Content>
        <Report>
         
            <header>Get data for choosen year</header>
            <form
              autocomplete="off"
              onSubmit={e => {
                e.preventDefault();
                this.onReport();
              }}
            >
              <select onChange={this.updateYear} required>
                <option value="" disabled selected>
                  Chose Year
                </option>
                {years.map(el => (
                  <option>{el}</option>
                ))}
              </select>
              <select onChange={this.updateCurrency} required>
                <option value="" disabled selected>
                  Currency
                </option>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="PLN">PLN</option>
                <option value="EUR">EUR</option>
              </select>
              <Submit type="submit" value="Report" />
            </form>
            <Sum>{this.state.report}</Sum>
          
        </Report>
      </>
    );
  }
}
export default Main;
