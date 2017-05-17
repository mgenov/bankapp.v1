import React from 'react';

export default class CreateAccount extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: 'USD', isSelected: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Open new account in: 
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="BGN">Bulgarian Lev</option>
            <option value="GBP">British Pound</option>
          </select>
        </label>
        <input type="submit" value="Create Account" />
      </form>
    );
  }
  
  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      const currency = this.state.value;
      const iban = currency.slice(0, 2)
                           .concat(Math.random().toString().slice(2,12))
                           .concat(Math.random().toString().slice(2,12));
      this.props.createAccount(iban, currency);
      console.log(`Created Bank Account ${iban} in ${currency}`);
  }
}