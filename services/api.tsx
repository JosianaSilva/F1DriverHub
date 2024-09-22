import axios from 'axios';

const API_HOST = 'v1.formula-1.api-sports.io';
const API_KEY = '98867071f98e52fcd27d4d7a8439b621';


export default function fetchDrivers(searchTerm: string) {
    console.log('fetchDrivers', searchTerm);
    console.log('apiHost', API_HOST);
    console.log('apiKey', API_KEY);

    const options = {
        method: 'GET',
        url: `https://${API_HOST}/drivers`,
        params: { search: searchTerm },
        headers: {
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY
        }
    };


    return axios.request(options)
        .then(response => {
            const drivers = response.data.response.map((driver: { id: any; name: any; image: any; world_championships: any; podiums: any; nationality: any; }) => ({
                id: driver.id,
                nome: driver.name,
                img: driver.image,
                world_championships: driver.world_championships,
                podiums: driver.podiums,
                nationality: driver.nationality
            }));
            console.log('drivers', drivers);
            return drivers;
        })
        .catch(error => {
            console.error('error', error);
            throw error;
        });
}