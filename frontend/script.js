document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    // --- Function to call Backend API ---
    async function performSearch() {
        const query = searchInput.value.trim(); // Get query and remove whitespace

        if (!query) {
            resultsDiv.innerHTML = '<p style="color: orange;">Please enter a search query.</p>';
            return; // Stop if query is empty
        }

        // --- Display Loading State ---
        resultsDiv.innerHTML = '<p>Searching...</p>';
        searchButton.disabled = true; // Disable button during search
        searchInput.disabled = true; // Disable input during search

        try {
            // Determine the backend URL. In Codespaces, localhost usually works for inter-container communication.
            // If accessing the frontend *outside* the Codespace via the forwarded URL,
            // you might need the publicly forwarded backend URL.
            // For simplicity within Codespaces, localhost:PORT should work.
            const backendUrl = `http://localhost:3001/api/search`; // Assuming backend runs on 3001

            // --- Make Fetch API Call to Backend ---
            const response = await fetch(backendUrl, {
                method: 'POST', // Use POST method
                headers: {
                    'Content-Type': 'application/json', // Set content type header
                },
                body: JSON.stringify({ query: query }), // Send query in request body as JSON
            });
            // --- End Fetch API Call ---

            // --- Process Backend Response ---
            if (!response.ok) {
                // Try to get error message from backend response body
                let errorMsg = `Error: ${response.status} ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.error || errorMsg; // Use backend error if available
                } catch (e) {
                    // Ignore if response body isn't valid JSON
                }
                throw new Error(errorMsg); // Throw an error to be caught below
            }

            const data = await response.json(); // Parse the JSON response from backend

            // --- Display Result ---
            // Basic display, consider sanitizing or using a library like Markdown-it if Gemini returns Markdown
            resultsDiv.innerHTML = `<p>${data.answer.replace(/\n/g, '<br>')}</p>`; // Display the answer, replacing newlines with <br>

        } catch (error) {
            console.error('Failed to perform search:', error);
            resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`; // Display error message
        } finally {
             // --- Reset UI State ---
             searchButton.disabled = false; // Re-enable button
             searchInput.disabled = false; // Re-enable input
             searchInput.focus(); // Optional: set focus back to input
        }
    }

    // Attach event listener to the search button
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Optional: Allow search on pressing Enter in the input field
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default form submission if it's inside a form
                performSearch();
            }
        });
    }
});
