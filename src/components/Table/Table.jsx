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
            {this.props.sortedProducts.map(el => (
              <>
                <DateStyle>
                  <td colSpan={3}>
                    <CurrentDate>
                      <div>{el.date}</div>
                      <a
                        href="#"
                        onClick={() => {
                          this.props.onClear(el.date);
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
                ))}
              </>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Table;
