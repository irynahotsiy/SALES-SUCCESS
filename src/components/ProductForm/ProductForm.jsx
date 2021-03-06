import React, { Component } from "react";
import { InputBox, Data, Button, Submit } from "../Main/Style";
// import { getRates } from "../../services/Report";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      currency: "UAH",
      date: ""
    };
  }
  updateName = e => {
    this.setState({
      name: e.target.value
    });
  };

  updatePrice = e => {
    this.setState({
      price: e.target.value
    });
  };

  updateCurrency = e => {
    this.setState({
      currency: e.target.value
    });
  };

  updateDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddProduct(this.state);
    this.setState({
      name: "",
      price: "",
      date: ""
    });
  };

  getDate = () => {
    let date = new Date();
    let fullMonth = "";
    let month = date.getMonth() + 1;
    if (month < 10) {
      fullMonth = "0" + month;
    } 
    let day = date.getDate();
    let fullDay = "";
    if ( day < 10) {
      fullDay = "0" + day;
    }
     return date.getFullYear() + "-" + fullMonth + "-" + fullDay;
  };

  render() {
    let fullDateNow = this.getDate();
    return (
      <>
        <form method="send" onSubmit={this.handleSubmit} autoComplete="off">
          <InputBox>
            <label htmlFor="product"> Add new product: </label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.updateName}
              placeholder="Enter your product"
              name="product"
              required
            />
          </InputBox>
          <Data>
            <InputBox>
              <label htmlFor="price">Price:</label>
              <input
                value={this.state.price}
                onChange={this.updatePrice}
                type="number"
                step="0.01"
                min="0.01"
                name="price"
                placeholder="Price"
                required
              />
            </InputBox>
            <InputBox>
              <label htmlFor="currency">¤</label>
              <select
                name="currency"
                value={this.state.currency}
                onChange={this.updateCurrency}
                required
              >
              {this.props.currTypes.map((el) => (
                  <option key={el} value={el}>{el}</option>
                ))}

              </select>
            </InputBox>
            <InputBox>
              <label htmlFor=""> Date: </label>
              <input
                type="date"
                value={this.state.date}
                onChange={this.updateDate}
                name="date"
                placeholder="Date"
                min="2017-12-29"
                max={fullDateNow}
                required
              />
            </InputBox>
          </Data>
          <Button>
            <Submit type="submit" value="Submit" />
          </Button>
        </form>
      </>
    );
  }
}

export default ProductForm;
