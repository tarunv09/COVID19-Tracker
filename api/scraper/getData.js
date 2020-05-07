const request = require("request-promise");
const cheerio = require("cheerio");
const url = "https://www.worldometers.info/coronavirus/";

async function getData() {
  const result = await request.get(url);
  const $ = cheerio.load(result);

  const array = [];         //initialise an empty array to store data
  const tableColumns = [    
    "Country",
    "Total Cases",
    "New Cases",
    "Total Deaths",
    "New Deaths",
    "Total Recovered",
    "Acive Cases",
    "Serious, Critical",
    "Total Cases/1M Population",
    "Deaths/ 1M Population",
    "Total Tests",
    "Tests/1M Population",
    "Continent",
  ];
  
  $("tbody > tr").each((index, element) => {
    const tds = $(element).find("td");
    const tableRow = {};
    $(tds).each((index, element) => {   

      //remove unwanted characters -- inspect element to know more
      tableRow[tableColumns[index]] = $(element).text().trim().replace("\n", "");  

    });
    array.push(tableRow);
  });
    console.log(array);
}

module.exports = getData;