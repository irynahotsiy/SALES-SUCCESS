import React, { Component } from "react";
import { Sum, Report, Submit } from "../Main/Style";
import Loading from "../Loading/Loading";

import { prepareReport } from "../../services/Report";

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: " ",
      targetCurrency: " ",
      report: " ",
      isLoading: false
    };
  }

  updateYear = e => {
    this.setState({
      year: e.target.value
    });
  };
  updateCurrency = e => {
    this.setState({
      targetCurrency: e.target.value
    });
  };

  onReport = async () => {
    let year = parseInt(this.state.year);
    let products = this.props.products.filter(el => parseInt(el.date) === year);
    let curr = this.state.targetCurrency;

    this.setState({
      isLoading: true
    });

    try {
      let finalSum = await prepareReport(products, curr);
      this.setState({
        report: finalSum.toFixed(2) + " " + curr,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({ error, isLoading: false });
    }
  };

  render() {
    let years = [];
    for (let product of this.props.sortedProducts) {
      let date = parseInt(product.date);
      if (!years.includes(date)) {
        years.push(date);
      }
    }

    return (
      <>
        <Report>
          <header>Report</header>
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
                <option key={el} value={el}>
                  {el}
                </option>
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

          <Sum>{this.state.isLoading ? <Loading /> : this.state.report}</Sum>
        </Report>
      </>
    );
  }
}

export default ReportForm;
