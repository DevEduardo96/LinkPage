// Se estiver rodando localmente com Netlify CLI, instale o node-fetch: `npm install node-fetch`
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const url =
    "https://script.google.com/macros/s/1RSVXEOBKBearJ-5QNo2nHSLeboLo1IwWJa9H1g6P8hry3p6e7iu-3mvV/dev"; // Substitua pelo seu URL correto do Apps Script

  try {
    const response = await fetch(url);

    // Aqui, você pode usar .json() se o conteúdo for JSON
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Libera CORS
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Erro ao acessar Apps Script",
        details: error.message,
      }),
    };
  }
};
