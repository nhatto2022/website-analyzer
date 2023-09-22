const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { websiteURL } = JSON.parse(event.body);
    const API_KEY = process.env.PAGESPEED_API_KEY;  
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${websiteURL}&key=${API_KEY}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://websitebrush.com", 
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error("Error fetching from PageSpeed Insights:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "https://websitebrush.com",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
}
