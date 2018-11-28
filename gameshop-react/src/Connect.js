import $ from 'jquery';

const url = "http://localhost:8080";

export const login = (address, password) => {
    return new Promise((resolve) => {
        $.post(url + "/login", {address, password}, (res, status) => {
            if (status === "success") {
                resolve(res);
            }
        });
    });
}

export const signup = (password) => {
    return new Promise((resolve) => {
        $.post(url + "/signup", {password}, (res, status) => {
            if (status === "success") {
                resolve(res);
            }
        });
    });
}

export const buyGame = (address, selectedGame) => {
    return new Promise((resolve) => {
        $.post(url + "/purchase", {address, selectedGame}, (res, status) => {
            if (status === "success") {
                resolve(res);
            }
        });
    });
}