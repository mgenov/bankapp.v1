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
      accounts: []
    }

    this.toggleItem = this.toggleItem.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.depositAccount = this.depositAccount.bind(this);
    this.withdrawAccount = this.withdrawAccount.bind(this);
    this.accountHistory = this.accountHistory.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    axios.get('/v1/accounts')
        .then( res => {
          console.log(res.data)
          this.setState({accounts: res.data });
        })
        .catch(err => {
          console.log("got error", err)
          // error handling here
        })
  }

  render() {
    const {accounts} = this.state
    return (
      <div className="BankContainer">
        <h2>Welcome to your Virtual Bank</h2>
        <SingleSelectionAccountList accounts={accounts} onItemClick={this.toggleItem} />
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


    toggleItem(iban) {
        console.log(`Selected [${iban}]`);
        const toggle = (data, item) => {
            return data.map((v, i) => {
                let selected = false;
                if (v.iban === item) {
                    selected = true;
                }
                return Object.assign({}, v, {
                    isSelected: selected
                })
            })
        }
        this.setState({ accounts: toggle(this.state.accounts, iban) });   

        //------------ WITH MUTATION -------------
        // const foundItem = _.find(this.props.data, data => data.iban === iban);

        // foundItem.isSelected = !foundItem.isSelected;
        // this.setState({ selections: this.props.data });      

        // console.log(this.props.data[0].isSelected);
        // console.log(this.props.data[1].isSelected);
        // console.log(this.props.data[2].isSelected);
    }


  createAccount(newIban, currency) {
    axios.post('/v1/accounts', {
          iban: newIban,
          currency: currency,
          amount: 0
        })
      .then( res => {
        let {accounts} = this.state
        console.log("Before: ", accounts)
        accounts.push(res.data)
        console.log("After: ", accounts)
        this.setState({accounts: accounts});
      })
      .catch(err => {
        console.log("got error", err)
        // error handling here
      })

  }

  deleteAccount() {
    const foundItem = _.find(this.state.accounts, account => account.isSelected === true);
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
