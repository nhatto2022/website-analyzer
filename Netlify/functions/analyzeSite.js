const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "https://websitebrush.com",
                "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: "" // No body for an OPTIONS request
        };
    }

    const { websiteURL } = JSON.parse(event.body);

    const API_KEY = process.env.PAGESPEED_API_KEY;
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${websiteURL}&key=${API_KEY}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify({ error: "Failed fetching data from Google PageSpeed Insights." })
        };
    }
     return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "https://websitebrush.com", // Make sure CORS header is set
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  // Modify this to extract only necessary details
    };
};
