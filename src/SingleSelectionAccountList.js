import _ from 'lodash';
import React from 'react';
import AccountList from './AccountList';

export default class SingleSelectionAccountList extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props;

        this.toggleItem = this.toggleItem.bind(this);
    }

    render() {
        return (
            <AccountList data={this.props.data} toggleItem={this.toggleItem} />                           
        );
    }

    toggleItem(iban) {
        console.log(`Selected [${iban}]`);
        // const toggle = (data, item) => {
        //     return data.map((v, i) => {
        //         let selected = false;
        //         if (v.iban === item) {
        //             selected = true;
        //         }
        //         return Object.assign({}, v, {
        //             isSelected: selected
        //         })
        //     })
        // }

        // this.setState({ data: toggle(this.props.data, iban) });   

        //------------ WITH MUTATION -------------
        const foundItem = _.find(this.props.data, data => data.iban === iban);
        foundItem.isSelected = !foundItem.isSelected;
        this.setState({ data: this.props.data });      

        console.log(this.props.data[0].isSelected);
        console.log(this.props.data[1].isSelected);
        console.log(this.props.data[2].isSelected);
    }
}

// this.setState({actionButtonsVisibility: this.props.actionButtonsVisibility})
// console.log(this.props.actionButtonsVisibility)