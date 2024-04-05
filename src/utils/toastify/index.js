import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

export const toast = {
    info(message) {
        Toastify({
            text: message,
            duration: 2000,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            style: {
                background: '#367FA9',
            },
        }).showToast();
    },
    success(message) {
        Toastify({
            text: message,
            duration: 2000,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            style: {
                background: '#4caf50',
            },
        }).showToast();
    },
    error(message) {
        Toastify({
            text: message,
            duration: 2000,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            style: {
                background: '#ef5350',
            },
        }).showToast();
    },
};
