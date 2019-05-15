import React, { Component } from "react";
import { Sum, Report, Submit } from "../Main/Style";

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: " ",
      curr: " ",
      report: " "
    };
  }

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

  onReport = () => {
    let year = parseInt(this.state.year);
    let products = this.props.products.filter(el => parseInt(el.date) === year);
    let url =
      "https://cors.io/?http://data.fixer.io/api/latest?access_key=5e2e34b6141b185a648f1be0c2a84530&symbols=UAH,PLN,USD";
    fetch(url)
      .then(response => response.json())
      .then(
        result => {
          let sum = 0;
          for (let i = 0; i < products.length; i++) {
            let price = parseFloat(products[i].price);
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
  };

  render() {
    let getYears = () => {
      let years = [];
      let products = this.props.sortedProducts;
      for (let i = 0; i < products.length; i++) {
        let date = parseInt(products[i].date);
        if (!years.includes(date)) {
          years.push(date);
        }
      }
      return years;
    };

    let years = getYears();

    return (
      <>
        <Report>
          <header>Get data for choosen year</header>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              this.onReport();
            }}
          >
            <select defaultValue={""} onChange={this.updateYear} required>
              <option value="" disabled>
                Chose Year
              </option>
              {years.map(el => (
                <option key={el} value={el}>{el}</option>
              ))}
            </select>
            <select defaultValue={""} onChange={this.updateCurrency} required>
              <option value="" disabled>
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

export default ReportForm;
