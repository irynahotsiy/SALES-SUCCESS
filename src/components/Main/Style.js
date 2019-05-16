import styled from 'styled-components';

export const Content = styled.section `
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
`
export const FormProduct = styled.section `
    display: flex;
    flex-direction: column;
    width: 100%;
    `
export const  Form = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 250px;
    @media (max-width: 809px) {
        padding-right: 0px;
        padding: 15px;
    }
    header {
        padding: 30px 0; 
        color: #497552;
        font-size: 2.5rem;
        text-align: center;
        text-transform: uppercase;
        @media (max-width: 809px) {
            padding: 10px 0;
            font-size: 2rem;
        }
    }
    form{
        padding: 15px;
        background: rgba(255, 166, 0, 1);
        display: flex;
        flex-direction: column;
        border-radius: 0.3rem;
        @media (max-width: 809px) {
            box-sizing: border-box;
            width: 100%;
    }
        input, select, label {
            margin: 1px 5px;
            padding: 10px 5px;
            border: none;
            @media (max-width: 809px) {
                margin: 0;
            }
        }
        input[type=date] {
            padding: 7.5px; 
        }
        select {
            padding: 9px 5px;
        }
        label {
            font-weight: 600;
            color:  #000000;
            text-transform: capitalize;
        }
    }
`
export const Submit = styled.input `
    cursor: pointer;
    margin: 20px 0;
    background: #ca8601;
    width: 100px;
    padding: 10px 5px;
    border-radius: 0.2rem;
    border: none;
    text-transform: uppercase;
`
export const Button = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  `
export const InputBox = styled.div `
    display: flex;
    flex-direction: column;
    margin: 10px 0;
       @media (max-width: 809px) {
           width: 100%;
           margin: 0;
         }
 
 `

export const Report = styled.div `
    border-left: 1px solid #ffa600;
    background: white;
    position: fixed;
    top: 0;
    left: 100;
    right:  0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    @media (max-width: 809px) {
        position: relative;
        top: 0;
        left: 0;
        right:  0;
        bottom: 0;
        border: none;
        width: 100%;
    }
    header { 
        text-align: center;
        font-size: 1.8rem;
        text-transform: capitalize;
        color: #497552;
        padding: 30px 0;
        @media (max-width: 809px) {
            width: 100%;
        }
    }
    
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @media (max-width: 809px) {
            flex-direction: row;
            width: 100%;
        }
       
        input, select {
            width: 110px;
            margin: 20px 5px;
            padding: 10px 5px;
            border: 1px solid rgba(255, 166, 0, 1);
        }
    }
`

export const Sum = styled.div `
    margin: 20px 0;
    font-size: 2.5rem;
    color: #497552;
    text-align: center;
    height: 64px;
    @media (max-width: 809px) {
        font-size: 2rem;
    }
`




export const Products = styled.div `
@media (max-width: 809px) {
        padding-right: 0px;
    }
    padding: 100px 250px 100px 0;
    
    header {
        margin-left: 15px;
        text-transform: capitalize;
        text-align: start;
        font-size: 1.8rem;
        color: #497552;
    }
    table {
        width: calc(100% - 30px);
        margin: 15px;
        border-spacing: 0;
        border-collapse: collapse;
        border: 1px solid #ded5d5a6;
        th {
            border: 1px solid #ded5d5a6;
        }
        td {
            border-bottom: 1px solid #ded5d5a6;
        }
        tr th {
            background: #f7f6f6;
            font-weight: 500;
            padding-left: 10px;
            height: 50px;
            text-align: start;
        }
        tr td {
            padding: 0 10px;
        }
    
    }
`

export const DateStyle = styled.tr `
    background: #ca860108;
    td {
        height: 25px;
        color: #497552;
}   
`
export const ProductStyle = styled.tr `
    td {
        height: 40px;
    }
    td:first-child{
        font-weight: 600;
    }
    td:nth-of-type(even) {
        color: #497552;
    }
`
export const CurrentDate = styled.div `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 20px;
    font-size: 0.9rem;
    div:last-child {
        padding-left: 20px;
        color: #497552;
        &:hover {
            color: blue;
            text-decoration: underline;
        }
    }
`
export const Data = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
`
export const DateButton = styled.button `
    cursor: pointer;
    margin: 0 5px;
    background: none;
    padding: 5px;
    border-radius: 0.2rem;
    border: none;
    border: 1px solid rgba(255, 166, 0, 1);
    text-transform: uppercase;
`

export const Load  = styled.div `
    color: official;
    display: inline-block;
    position: relative;
    text-align: center;
    width: 64px;
    height: 64px;
    
    div {
        transform-origin: 32px 32px;
        animation: load 2s linear infinite;
    }
    div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 3px;
        left: 29px;
        width: 5px;
        height: 14px;
        border-radius: 20%;
        background: #497552;
    }
    div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
    }
    div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
    }
    div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
    }
    div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
    }
    div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
    }
    div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
    }
    div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
    }
    div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
    }
    div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
    }
    div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
    }
    div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
    }
    div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
    }
    @keyframes load {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

`

   


    