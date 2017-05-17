import _ from 'lodash';
import React from 'react';
import AccountListItem from './AccountListItem';
import AccountListHeader from './AccountListHeader';

export default class AccountList extends React.Component {
  renderItems() {
    return _.map(this.props.data, (data, index) => 
    <AccountListItem 
      key={index} {...data} 
      onToggleItem={this.props.toggleItem}
    />)
  }
  
  render() {
    return (
      <table>
        <AccountListHeader />
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}