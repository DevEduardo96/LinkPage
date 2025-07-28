const fetch = require("node-fetch"); // só é necessário se estiver usando localmente com Netlify CLI

exports.handler = async function (event, context) {
  const url =
    "https://script.google.com/macros/s/1RSVXEOBKBearJ-5QNo2nHSLeboLo1IwWJa9H1g6P8hry3p6e7iu-3mvV/dev"; // substitua pelo seu ID

  try {
    const response = await fetch(url);
    const data = await response.text(); // pode ser .json() se você tiver certeza que retorna JSON puro

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // libera CORS
        "Content-Type": "application/json",
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erro ao acessar Apps Script",
        details: error.message,
      }),
    };
  }
};
