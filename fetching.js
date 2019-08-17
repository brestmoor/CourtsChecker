const axios = require('axios');

const getSessId = () => {
   return axios.get('https://www.twojtenis.pl/pl/kontakt.html')
       .then(resp => resp.headers['set-cookie'][0].split(';')[0]);
};

const login = (cookie) => {
    return axios.post('https://www.twojtenis.pl/pl/login.html',
        'login=caramelpanel8%40gmail.com&pass=hotbaldtennisball&back_url=%2Fpl%2Fkontakt.html&action=login',
        {
            headers: {
                'Cookie': cookie
            }
        })
        .then(() => cookie);
};

const fetchTable = (cookie, date) => {
    return axios.post('https://www.twojtenis.pl/ajax.php?load=courts_list',
        `date=${date}&club_url=fame_sport_club&page=NaN&spr=3&zsh=0&tz=0`,
        {
            headers: {
                'Cookie': `club_14_sport=sprtch_3; CooAcc=1; ${cookie}`
            }
        })
        .then(resp => resp.data);
};

module.exports = {
    'getSessId': getSessId,
    'login': login,
    'fetchTable': fetchTable
};