document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');
  
    searchButton.addEventListener('click', async () => { // Make the event handler async
      const query = searchInput.value.trim(); // Get the query and trim whitespace
  
      if (!query) {
        resultsDiv.textContent = 'Please enter a search query.';
        return; // Don't proceed if query is empty
      }
  
      // Display loading message
      resultsDiv.textContent = 'Searching...';
      resultsDiv.classList.remove('error'); // Remove error class if present
  
      try {
        // Send the query to the backend API endpoint
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: query }), // Send query in the request body
        });
  
        // Check if the backend response is successful
        if (!response.ok) {
            // Try to parse the error message from the backend
            let errorData;
            try {
                errorData = await response.json();
            } catch (parseError) {
                // If parsing fails, use the status text
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            // Throw an error with the message from the backend
            throw new Error(errorData.error || `Backend request failed with status ${response.status}`);
        }
  
        // Parse the JSON response from the backend
        const data = await response.json();
  
        // --- Display the result ---
        if (data.answer) {
          // Display the answer received from the backend
          resultsDiv.textContent = data.answer;
        } else if (data.error) {
          // Display error message received from the backend
          resultsDiv.textContent = `Error: ${data.error}`;
          resultsDiv.classList.add('error'); // Optional: style errors differently
        } else {
          // Handle unexpected response format from backend
          resultsDiv.textContent = 'Received an unexpected response from the server.';
          resultsDiv.classList.add('error');
        }
        // --- End Display the result ---
  
      } catch (error) {
        // Handle network errors or errors thrown during fetch/processing
        console.error('Error during fetch:', error);
        resultsDiv.textContent = `An error occurred: ${error.message}`;
        resultsDiv.classList.add('error'); // Optional: style errors differently
      }
    });
  
      // Optional: Allow pressing Enter in the input field to trigger search
      searchInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
              searchButton.click(); // Trigger the button click event
          }
      });
  
  });
