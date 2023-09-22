const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Ensure you're dealing with a POST request
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    let websiteURL;
    try {
        const body = JSON.parse(event.body);
        websiteURL = body.websiteURL;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid input format' })
        };
    }

    const API_KEY = process.env.PAGESPEED_API_KEY;  // Fetch the API key from Netlify's environment variables
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${websiteURL}&key=${API_KEY}`;

    let data;
    try {
        const response = await fetch(endpoint);
        data = await response.json();
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching data from PageSpeed Insights API' })
        };
    }

    // Check if the API returned an error
    if (data.error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: data.error.message })
        };
    }

    // Extract the necessary information from the data object
    const score = data.lighthouseResult.categories.performance.score * 100;

    return {
        statusCode: 200,
        body: JSON.stringify({ score })
    };
}
