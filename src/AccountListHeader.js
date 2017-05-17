import React from 'react';

export default class AccountListHeader extends React.Component {
  render() {
    return (
    <thead>
      <tr>
        <th>Account</th>
        <th>Currency</th>
        <th>Balance</th>
      </tr>
    </thead>
    );
  }
}