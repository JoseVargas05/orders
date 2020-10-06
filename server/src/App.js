import React, {Component} from 'react';
import './App.css';


class App extends Component{
  api_orders = 'http://localhost:4000/orders';
  api_customer = 'http://localhost:4000/customers?id=';
  i = 0;
  state = {
    orders: [],
    customers:[[]]
  }

  componentDidMount(){
    this.getOrders();
  }

  getOrders = _ =>{
    fetch(this.api_orders)
      .then(response => response.json())
      .then(response => this.setState({ orders: response.orders }))
      .catch(err => console.error(err));
  }
  getCustomer = (id) =>{
    fetch(this.api_customer+id)
      .then(response => response.json())
      .then(response => this.setState({ customers: response.customer }))
      .catch(err => console.error(err));
  }

  renderOrder = ({id, reference, date_add, payment, total_paid, id_customer, id_address_delivery, current_state, id_currency}) => {
    return (<div className="headers">
            <div>{id}</div>
            <div>{reference}</div>
            <div>{id_currency}</div>
            <div>{id_address_delivery}</div>
            <div>{id_customer}</div>
            <div>${total_paid.substring(0,5)}</div>
            <div>{payment}</div>
            <div>{current_state}</div>
            <div>{date_add}</div>
            </div>
          );
  } 

  render(){
    const { orders } = this.state;
    return(
      <div className="App">
        <div className="headers">
          <div>Id</div>
          <div>Reference</div>
          <div>New client</div>
          <div>Delivery</div>
          <div>Customer</div>
          <div>Total</div>
          <div>Payment</div>
          <div>Status</div>
          <div>Date</div>
        </div>
        {orders.map(this.renderOrder)}
      </div>
    );
  }
}


export default App;

