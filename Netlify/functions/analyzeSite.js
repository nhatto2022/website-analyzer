const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { websiteURL } = JSON.parse(event.body);

    const API_KEY = process.env.PAGESPEED_API_KEY;  // Store your API key in Netlify's environment variables
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${websiteURL}&key=${API_KEY}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    // Extract necessary information from the data object and send it back

    return {
        statusCode: 200,
        body: JSON.stringify(data)  // Modify this to extract only necessary details
    };
}
