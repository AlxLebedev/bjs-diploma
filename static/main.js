class Profile {
    constructor({username, name: {firstName, lastName}, password}) {
        this.username = username;
        this.name = {firstName, lastName};
        this.password = password;
    }
    createUser(callback) {
        console.log(`Creating user ${this.name.firstName} (username: ${this.username})`);
        return ApiConnector.createUser({
            username: this.username,
            name: this.name,
            password: this.password
        }, (err, data) => {
            console.log(`User ${this.name.firstName} (username: ${this.username}) is successfully created`);
            callback(err, data);
            });
    }
    performLogin(callback) {
        let username = this.username;
        let password = this.password;
        console.log(`Authorizing user ${this.name.firstName} (username: ${this.username})`);
        return ApiConnector.performLogin({
            username,
            password
        }, (err, data) => {
            console.log(`User ${this.name.firstName} (username: ${this.username}) is successfully authorized`);
            callback(err, data);
        });
    }
    addMoney({currency, amount}, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.name.firstName} (username: ${this.username})`);
        return ApiConnector.addMoney({
            currency,
            amount
        }, (err, data) => {
            console.log(`${amount} of ${currency} is successfully added to ${this.name.firstName} (username: ${this.username})`);
            callback(err, data);
        });
    }
    convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
        return ApiConnector.convertMoney({
            fromCurrency,
            targetCurrency,
            targetAmount
        }, (err, data) => {
            console.log(`${fromCurrency} is successfully converted to ${targetAmount} ${targetCurrency} `);
            callback(err, data);
        });
    }
    transferMoney({to, amount}, callback) {
        console.log(`Transfering ${amount} of Netcoins to ${to}`);
        return ApiConnector.transferMoney({
            to,
            amount
        }, (err, data) => {
            console.log(`${amount} of Netcoins is successfully transfered to ${to}`);
            callback(err, data);
        });
    }
}

function getStocks(callback) {
    console.log(`Getting stocks info`);
    return ApiConnector.getStocks((err, data) => {
        console.log(`Stocks info is successfully got`);
        callback(err, data[99]);
    });
}

function main() {

    const steve = new Profile({
        username: 'gaddband',
        name: {firstName: 'Steve', lastName: 'Gadd'},
        password: 'superdrummer',
    });
    const ana = new Profile({
        username: 'freeworld',
        name: {firstName: 'Ana', lastName: 'Free'},
        password: 'lisboagirl'
    });

    ana.createUser((err, data) => {
        if (err) {
            console.log(`Error: Failed to create this user: ${ana.name.firstName} (username: ${ana.username})`);
        } else {
            console.log(`User: ${ana.name.firstName} (username: ${ana.username}) is created`);
            /*
            ana.performLogin((err, data) => {
                if (err) {
                    console.log(`Error: login ${ana.name.firstName} (username: ${ana.username}) failed`);
                } else {
                    console.log(`${ana.name.firstName} (username: ${ana.username}) is autorized`);
                }
            });*/
        }
    });

    getStocks((err, data) => {
        if (err) {
            console.log(`Error: can not getting stocks`);
        }
        const stocksInfo = data;
        const wallet = {currency: 'EUR', amount: 500000};

        steve.createUser((err, data) => {
            if (err) {
                console.log(`Erroer: Failed to create this user: ${steve.name.firstName} (username: ${steve.username})`);
            } else {
                console.log(`User: ${steve.name.firstName} (username: ${steve.username}) is created`);
                steve.performLogin((err, data) => {
                    if (err) {
                        console.log(`Error: login ${steve.name.firstName} (username: ${steve.username}) failed`);
                    } else {
                        console.log(`${steve.name.firstName} (username: ${steve.username}) is authorized`);
                        steve.addMoney(wallet, (err, data) => {
                            if (err) {
                                console.log(`Error: can not adding money to ${steve.name.firstName} (username: ${steve.username})`);
                            } else {
                                console.log(`Added 500000 EUR to ${steve.name.firstName} (username: ${steve.username})`);
                                steve.convertMoney({fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: 36000}, (err, data) => {
                                    if (err) {
                                        console.log(`Error: can not apply convertation`);
                                    } else {
                                        const walletAmount = stocksInfo.NETCOIN_EUR * wallet.amount;
                                        console.log(`Converted to coins `, {name: {firstName: 'Steve', lastName: 'Gadd'}, wallet: {amount: walletAmount, currency: 'NETCOIN'}, username: 'gaddband'});
                                        steve.transferMoney({to: 'freeworld', amount: 36000}, (err, data) => {
                                            if (err) {
                                                console.log(`Error: transfer 36000 NETCOINS failed`);
                                            } else {
                                                console.log(`Ana has got 36000 NETCOINS`);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}

main();