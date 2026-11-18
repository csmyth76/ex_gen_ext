// Determine the backend URL based on the environment
var backendUrl = 'http://localhost:5000/generate'; // Default to development
// Adjust the URL based on the environment for production use
//if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1" && location.hostname !== "") {
//    backendUrl = 'https://your-production-domain.com/generate'; // Update this with your production URL}

document.addEventListener('DOMContentLoaded', function() {
    var generateButton = document.getElementById('generate');
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            var conceptInput = document.getElementById('concept').value;
            var interestInput = document.getElementById('interest').value;
            console.log("Concept Input: ", conceptInput); // Log the concept input
            console.log("Interest Input: ", interestInput); // Log the interest input
            
            // Send concept and interest as separate fields to the backend
            sendPromptToBackend(conceptInput, interestInput, backendUrl);
        });
    }
});

function sendPromptToBackend(concept, interest, url) {
    console.log("Sending request to URL: ", url); // Log the URL being requested
    console.log("Request payload: ", { concept: concept, interest: interest }); // Log the request payload
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept: concept, interest: interest }), // Send as separate fields
    })
    .then(response => {
        console.log("Raw response: ", response); // Log the raw response
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data); // Log the success data
        var summaryDisplay = document.getElementById('summary');
        if (summaryDisplay) {
            summaryDisplay.textContent = data.choices[0]; // Adjust based on the actual structure of your response
        }
    })
    .catch((error) => {
        console.error('Error during fetch operation:', error.message); // Log detailed error message
    });
    
}
