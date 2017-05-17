import React from 'react';

export default class AccountListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleItem = this.onToggleItem.bind(this);
  }

  renderItemSection() {
    const { iban, currency, amount, isSelected } = this.props;

    const itemStyle = {
      color: isSelected ? 'white' : 'black',
      background: isSelected ? 'darkgray' : 'silver',
      cursor: 'pointer'
    };

    return (
      <tr style={itemStyle} onClick={this.onToggleItem}>
        <td className="rowdata">{iban}</td>
        <td className="rowdata">{currency}</td>
        <td className="rowdata">{amount}</td>
      </tr>
    );
  }
 
  render() {
    return (
      this.renderItemSection()
    );
  }

  onToggleItem() {
    this.props.onToggleItem(this.props.iban);
  }
}