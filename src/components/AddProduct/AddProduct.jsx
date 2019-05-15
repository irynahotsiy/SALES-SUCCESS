import React, { Component } from "react";
import { InputBox, Data, Button, Submit } from "../Main/Style";

class AddProduct extends Component {
  render() {
    return (
      <>
        <form
          method="send"
          onSubmit={this.props.onHandleSubmit}
          autoComplete="off"
        >
          {/*Text */}
          <InputBox>
            <label htmlFor="product"> Add new product: </label>
            <input
              type="text"
              value={this.props.product}
              onChange={this.props.onAddProduct}
              placeholder="Enter your product"
              name="product"
              required
            />
          </InputBox>
          {/*Price */}
          <Data>
            <InputBox>
              <label htmlFor="price">Price:</label>
              <input
                value={this.props.price}
                onChange={this.props.onAddPrice}
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
              <label htmlFor="currency">¤</label>
              <select
                name="currency"
                value={this.props.curr}
                onChange={this.props.onEddCurr}
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
              <label htmlFor=""> Date: </label>
              <input
                type="date"
                value={this.props.date}
                onChange={this.props.onEddDate}
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
      </>
    );
  }
}

export default AddProduct;
