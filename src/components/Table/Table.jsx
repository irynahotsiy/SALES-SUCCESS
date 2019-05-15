import React, { Component } from "react";
import { CurrentDate, DateStyle, ProductStyle } from "../Main/Style";

class Table extends Component {
  
  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sortedProducts.map((el, idx) => (
              <React.Fragment key={idx}>
                <DateStyle >
                  <td colSpan={3}>
                    <CurrentDate>
                      <div>{el.date}</div>
                      <div
                        onClick={() => {
                          this.props.onClear(el.date);
                        }}
                      >
                        Clear all of this date
                      </div>
                    </CurrentDate>
                  </td>
                </DateStyle>
                {el.items.map((item, idx)=> (
                  <ProductStyle key={idx}>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>{item.currency}</td>
                  </ProductStyle>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Table;
