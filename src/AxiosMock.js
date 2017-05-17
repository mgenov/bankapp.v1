import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// var axios = require('axios');
// var MockAdapter = require('axios-mock-adapter');

export default class AxiosMock extends React.Component {
  constructor(props) {
    super(props);
    
    var mock = new MockAdapter(axios);
    mock.onGet('/data').reply(200, {
      data: [{
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
        isSelected: false
      }],
      actionButtonsVisibility: true
    });

    axios.get('/data')
            .then(function (res) {
              console.log(res.status);
              console.log(res.data.data[0]);
              const demo = res.data;
              console.log(demo);
              this.setState({ demo });
            });
  }

  render() {
    return (
      <div className='mockData'>
        <button onClick={this.test}>mock me</button>
        <p>{this.test}</p>
      </div>
    );
  }
  test() {
    axios.get('/data')
            .then(function (response) {
            console.log(response.data.data[0]);
         });
  }
}


