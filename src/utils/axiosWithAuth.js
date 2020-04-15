import axios from 'axios';

export const axiosWithAuth = () => {
    const token = sessionStorage.getItem('token');
    return axios.create({
        baseURL: 'https://educationflashcards.herokuapp.com/api/',
        headers: {
            Authorization: token
        }
    })
}