exports.handler = async function(event, context) {
    // Your function logic will go here
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from analyzeSite function!" })
    };
}
