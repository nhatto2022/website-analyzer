const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { websiteURL } = JSON.parse(event.body);
    const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;  // Store your PageSpeed API key in Netlify's environment variables

    const pageSpeedEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${websiteURL}&key=${PAGESPEED_API_KEY}`;
    const mobileFriendlyEndpoint = `https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=${PAGESPEED_API_KEY}`; // We're assuming you're using the same API key for both services.

    // Fetch PageSpeed Insights
    const pageSpeedResponse = await fetch(pageSpeedEndpoint);
    const pageSpeedData = await pageSpeedResponse.json();

    // Fetch Mobile Friendly Test
    const mobileFriendlyResponse = await fetch(mobileFriendlyEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: websiteURL
        })
    });
    const mobileFriendlyData = await mobileFriendlyResponse.json();

    // Extract necessary information
    const speedScore = pageSpeedData.lighthouseResult.categories.performance.score * 100; // Score is between 0 and 1, hence multiplied by 100.
    const mobileFriendlyStatus = mobileFriendlyData.mobileFriendliness;

    const result = {
        speedScore: speedScore,
        mobileFriendly: mobileFriendlyStatus
    };

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
};
