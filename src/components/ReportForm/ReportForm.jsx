import React, { Component } from "react"; 
import {
    Sum,
    Report,
    Submit,
  } from "../Main/Style";

class ReportForm extends Component {

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
             this.props.onClickReport();
           }}
         >
           <select onChange={this.props.onUpdateYear} required>
             <option value="" disabled selected>
               Chose Year
             </option>
             {years.map(el => (
               <option>{el}</option>
             ))}
           </select>
           <select onChange={this.props.onUpdateCurrency} required>
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
         <Sum>{this.props.report}</Sum>
       
     </Report>
            </>
        );
    }
}
 
export default ReportForm;  