import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import SingleSelectionAccountList from './SingleSelectionAccountList';
import ActionButtons from './ActionButtons';
import CreateAccount from './CreateAccount';
import './index.css';

import axios from 'axios';
import './Axios';

class BankAccounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    this.createAccount = this.createAccount.bind(this);
    this.depositAccount = this.depositAccount.bind(this);
    this.withdrawAccount = this.withdrawAccount.bind(this);
    this.accountHistory = this.accountHistory.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    console.log('component mounted');
    axios.get('/v1/accounts')
        .then( res => {
          console.log(res.status);
          const mockedData = res.data;
          this.setState({ data: mockedData.data });
        })
        .catch(err => {
          // error handling here
        })
  }

  render() {
    return (
      <div className="BankContainer">
        <h2>Welcome to your Virtual Bank</h2>
        <SingleSelectionAccountList data={this.state.data} />
        <ActionButtons
          depositAccount={this.depositAccount}
          withdrawAccount={this.withdrawAccount}
          accountHistory={this.accountHistory}
          deleteAccount={this.deleteAccount}
        />
        <CreateAccount createAccount={this.createAccount} />
        <button onClick={this.test}>mock</button>
      </div>
    );
  }

  test() {
    axios.get('/v1/accounts')
      .then( res => {
        console.log(res.status);
        const mockedData = res.data;
        console.log(mockedData);
        this.setState({ data: mockedData.data });
      })
      .catch(err => {
          // error handling here
      })
  }

  createAccount(newIban, currency) {
    this.state.data.push({
      iban: newIban,
      currency: currency,
      amount: 0,
      isSelected: false
    });
    this.setState({ data: this.state.data });
  }

  deleteAccount() {
    const foundItem = _.find(this.state.data, data => data.isSelected === true);
    if (foundItem) {
      _.remove(this.state.data, data => data.isSelected === true);
      console.log(`Deleted [${foundItem.iban}]`);
      this.setState({ data: this.state.data });
    } else {
      this.noSelection();
    }
  }

  depositAccount(depositAmount) {
    const foundItem = _.find(this.state.data, data => data.isSelected === true);
    if (foundItem) {
      foundItem.amount += depositAmount;
      console.log(`${depositAmount} ${foundItem.currency} added to [${foundItem.iban}]`);
      this.setState({ data: this.state.data });
    } else {
      this.noSelection();
    }
  }

  withdrawAccount(withdrawAmount) {
    const foundItem = _.find(this.state.data, data => data.isSelected === true);
    if (foundItem) {
      if (foundItem.amount >= withdrawAmount) {
        foundItem.amount -= withdrawAmount;
        console.log(`${withdrawAmount} ${foundItem.currency} withdrawed from [${foundItem.iban}]`);
        this.setState({ data: this.state.data });
      } else {
        console.log(`Not enough funds!`);
      }
    } else {
      this.noSelection();
    }
  }

  accountHistory() {
    const foundItem = _.find(this.state.data, data => data.isSelected === true);
    if (foundItem) {
      console.log(`Show account history of ${foundItem.iban}`);
    } else {
      console.log(`No selection`);
    }
  }

  noSelection() {
    console.log(`No selection`);
  }
}

ReactDOM.render(
  <BankAccounts />,
  document.getElementById('root')
);

    
    // this.state = {
    //   data: [{
    //     iban: 'US12345678900987654321',
    //     currency: 'USD',
    //     amount: 1024,
    //     isSelected: false
    //   },
    //   {
    //     iban: 'BG33245678901234567890',
    //     currency: 'BGN',
    //     amount: 2234,
    //     isSelected: false
    //   },
    //   {
    //     iban: 'GB32456744301234567890',
    //     currency: 'GBP',
    //     amount: 159,
    //     isSelected: false
    //   }],
    //   actionButtonsVisibility: true
    // };