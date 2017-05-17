
if (process.env.NODE_ENV === 'development') {
    let axios = require('axios')
    let MockAdapter = require('axios-mock-adapter')
    let mock = new MockAdapter(axios);

    let accounts = [
            {
                id: 1,
                iban: 'US12345678900987654321',
                currency: 'USD',
                amount: 1024,
                isSelected: false
            },
            {
                id: 2,
                iban: 'BG33245678901234567890',
                currency: 'BGN',
                amount: 2234,
                isSelected: false
            },
            {
                id: 3,
                iban: 'GB32456744301234567890',
                currency: 'GBP',
                amount: 1234,
                isSelected: false
            }
        ];
    
    
    mock.onGet('/v1/accounts').reply(200, accounts.slice());

    // CRUD - create, retrieve, update, delete
    // GET /v1/accounts -> Get resource accounts
    // POST /v1/accounts -> Create new account 
    // PUT /v1/accounts/1 {id: 1, iban: "US12345678900987654333", currency: 'USD', amount: 1024} -> Update existing account
    // PATCH /v1/accounts/1 {iban: "USNEW_IBAN_NUMBER"} -> Update existing account
    // DELETE /v1/accounts/1 -> deletes account with id 1
    

    mock.onPost('/v1/accounts').reply(function(config) {
      let o = JSON.parse(config.data)
      let newAccount = Object.assign({}, o, {id: accounts.length + 1})
      accounts.push(newAccount)
      return [201, newAccount];
    });

}
