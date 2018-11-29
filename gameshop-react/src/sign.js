import Web3 from 'web3';

let web3 = new Web3();
web3.setProvider(
    new Web3.providers.WebsocketProvider(
        'ws://localhost:8546'
    )
);

export const login = (address, password) => {
    return dispatch => {
        web3.eth.personal.unlockAccount(address, password, 600)
            .then((response) => {
                console.info('Login successful:', response)
                dispatch({ type: LOGIN_SUCCESSFUL, payload: address });
            }).catch(error => {
                console.log('Login Error:', error)
                dispatch({ type: LOGIN_FAILED, payload: null });
            })

    }
}