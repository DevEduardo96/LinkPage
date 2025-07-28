const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Content-Type": "application/json",
  };

  // Lidar com preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // URL do seu Google Apps Script (substitua pela sua URL)
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/1RSVXEOBKBearJ-5QNo2nHSLeboLo1IwWJa9H1g6P8hry3p6e7iu-3mvV/exec";

    let response;

    if (event.httpMethod === "GET") {
      // Para requisições GET
      response = await fetch(GOOGLE_SCRIPT_URL);
    } else if (event.httpMethod === "POST") {
      // Para requisições POST
      const body = JSON.parse(event.body || "{}");

      response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }

    const data = await response.text();

    // Tentar parsear como JSON, se falhar retornar como texto
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      jsonData = { data: data, rawResponse: true };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(jsonData),
    };
  } catch (error) {
    console.error("Erro na função:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Erro interno do servidor",
        message: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
