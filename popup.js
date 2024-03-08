document.getElementById('generate').addEventListener('click', function() {
    // Retrieve user inputs
    const concept = document.getElementById('concept').value;
    const interest = document.getElementById('interest').value;

    // Construct the request payload
    const data = { concept: concept, interest: interest };

    // Send the data to your Python backend
    fetch('https://your-backend-url.com/generate-summary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        // Display the generated summary
        document.getElementById('summary').textContent = data.summary;
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors or show a message to the user
        document.getElementById('summary').textContent = 'Failed to generate summary.';
    });
});
