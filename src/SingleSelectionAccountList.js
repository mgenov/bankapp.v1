import _ from 'lodash';
import React from 'react';
import AccountList from './AccountList';

export default class SingleSelectionAccountList extends React.Component {
    render() {
      const {accounts} = this.props
      return (
            <AccountList data={accounts} toggleItem={this.props.onItemClick} />                           
        );
    }

}

// this.setState({actionButtonsVisibility: this.props.actionButtonsVisibility})
// console.log(this.props.actionButtonsVisibility)
