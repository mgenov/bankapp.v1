import _ from 'lodash';
import React from 'react';
import CreateAccount from './CreateAccount';
import AccountList from './AccountList';
import ActionButtons from './ActionButtons';

let selectionFilterVisibility = true;
const data = [
    {
        iban: 'US12345678900987654321',
        currency: 'USD',
        amount: 1024,
        isSelected: false
    },
    {
        iban: 'BG33245678901234567890',
        currency: 'BGN',
        amount: 2234,
        isSelected: false
    },
    {
        iban: 'GB32456744301234567890',
        currency: 'GBP',
        amount: 159,
        isSelected: true
    }
];

export default class SingleSelectionAccountList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {data};
        this.toggleItem = this.toggleItem.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.depositAccount = this.depositAccount.bind(this);
        this.withdrawAccount = this.withdrawAccount.bind(this);
        this.accountHistory = this.accountHistory.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    renderButtonsSection() {
        if (this.test()) {
            return (
                <ActionButtons
                    depositAccount={this.depositAccount}
                    withdrawAccount={this.withdrawAccount}
                    accountHistory={this.accountHistory}
                    deleteAccount={this.deleteAccount}
                />
            );
        }
    }

    test() {
        if (selectionFilterVisibility === true) { return true; }
    }

    render() {
        return (
            <div>
                <AccountList
                    data={this.state.data}
                    toggleItem={this.toggleItem}
                />

                {this.renderButtonsSection()}

                <CreateAccount createAccount={this.createAccount} />
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

        this.setState({ data: toggle(this.state.data, iban) });

        // const foundItem = _.find(this.state.data, data => data.iban === iban); // WITHOUT MUTATION - CHANGING STATE
        // foundItem.isSelected = !foundItem.isSelected; // WITHOUT MUTATION - CHANGING STATE
        // this.setState({data: this.state.data}); // WITHOUT MUTATION - CHANGING STATE
        // const index = this.getIbanIndex(iban); // WITHOUT LODASH ;)
        // data[index].isSelected = !data[index].isSelected; // WITHOUT LODASH ;)
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
            // this.setState((prevState, props) => ({
            //   data: prevState.amount + props.depositAmount
            // }));
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

    createAccount(newIban, currency) {
        this.state.data.push({
            iban: newIban,
            currency: currency,
            amount: 0
        });
        this.setState({ data: this.state.data });
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

    getIbanIndex(iban) {
        for (let i in data) {
            if (data[i].iban === iban) { return i; }
        }
    }
}
