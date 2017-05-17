import React from 'react';

export default class ActionButtons extends React.Component {
  constructor(props) {
      super(props);
      
      this.onWithdrawClick = this.onWithdrawClick.bind(this);
      this.onDepositClick = this.onDepositClick.bind(this);
      this.onHistoryClick = this.onHistoryClick.bind(this);
      this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  render() {
    return (
    <div className='ActionButtons'>
        <button onClick={this.onDepositClick}>Deposit</button>
        <button onClick={this.onWithdrawClick}>Withdraw</button>
        <button onClick={this.onHistoryClick}>History</button>
        <button onClick={this.onDeleteClick}>Delete</button>
    </div>  
    );
  }

  onDeleteClick() {
    this.props.deleteAccount();
  }

  onHistoryClick() {
    this.props.accountHistory();
  }

  onDepositClick() {
    let promptInput = prompt(`Please enter the amount you want to deposit:`);
    this.isNumber(promptInput) && promptInput != null && promptInput > 0 ? this.props.depositAccount(Number(promptInput)) : console.log(`Invalid amount: ${promptInput}`);
  }

  onWithdrawClick() {
    let promptInput = prompt(`Please enter the amount you want to withdraw:`);
    this.isNumber(promptInput) && promptInput != null && promptInput > 0 ? this.props.withdrawAccount(Number(promptInput)) : console.log(`Invalid amount: ${promptInput}`);
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
    
