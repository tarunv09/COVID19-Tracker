const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'COVID19 Tracker'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':mask:'
    }

    bot.postMessageToChannel(
        'general',
        'Track the current cases of COVID19 (Novel Coronavirus Strain), Use *@COVID19 Tracker* with *help* to get started',
        params
    );

})

// Error Handler
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if(message.includes(' global')) {
        globalStats();
    } else if(message.includes(' random')) {
        randomStats();
    } else if(message.includes(' help')) {
        getHelp();
    }
}

function globalStats() {

    axios.get('https://corona.lmao.ninja/v2/all?yesterday')
      .then(res => {
            const value = res.data;
            const totalCases = value.cases;
            const todayCases = value.todayCases;
            const totalDeaths = value.deaths;
            const todayDeaths = value.todayDeaths;
            const totalRecovered = value.recovered;
            const activeCases = value.active;
            const criticalCases = value.critical;

            const params = {
                icon_emoji: ':mask:'
            }
        
            bot.postMessageToChannel(
                'general',
                `*Total Cases:* ${totalCases} {
                        *New Cases:* ${todayCases},
                        *Total Deaths:* ${totalDeaths},
                        *New Deaths:* ${todayDeaths},
                        *Total Recovered:* ${totalRecovered},
                        *Active Cases:* ${activeCases},
                        *Serious & Critical Cases:* ${criticalCases} }`,
                params
            );

        }
    )
}

function randomStats() {

    axios.get('https://corona.lmao.ninja/v2/countries?yesterday&sort')
      .then(res => {
        const list = res.data;
        const random = Math.floor(Math.random() * list.length);
        const countryName = list[random].country;
        const continentName = list[random].continent;
        const totalCases = list[random].cases;
        const todayCases = list[random].todayCases;
        const totalDeaths = list[random].deaths;
        const todayDeaths = list[random].todayDeaths;
        const totalRecovered = list[random].recovered;
        const activeCases = list[random].active;
        const criticalCases = list[random].critical;

        const params = {
            icon_emoji: ':mask:'
        }

        bot.postMessageToChannel(
            'general',
            `*${countryName}* {
                    *Total Cases:* ${totalCases} 
                    *New Cases:* ${todayCases},
                    *Total Deaths:* ${totalDeaths},
                    *New Deaths:* ${todayDeaths},
                    *Total Recovered:* ${totalRecovered},
                    *Active Cases:* ${activeCases},
                    *Serious & Critical Cases:* ${criticalCases} 
                    *Continent:* ${continentName} }`,
            params
        );
    }
    
    )
}

function getHelp() {

    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'general',
        `Type *@COVID19 Tracker* with command *global* to get current worldwide stats, *random* to get shuffled-up country specific stats and *help* to get this instruction again.`,
        params
    );
}



