// save inputted username to a variable when form is submitted
document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault(); // prevent form submission
    
    var username = document.getElementById('username').value;

    // Fetching Github user account using github api
    fetch('https://api.github.com/users/' + username)
    .then(response => {
        // Check if response is OK (status code 200)
        if (response.ok) {
            // user found
            return response.json();
        } else if (response.status === 404) {
            // user not found
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = "Not found on Earth!\n Sorry..";
            throw new Error('User not found');
        }
    })
    // .then(response => response.json())
    .then(data => {
        // handle the response data
        var resultDiv = document.getElementById('result');
        
        // formatting some data
        var location = data.location;
        var bio = data.bio;
        if (!location) location = "Knowhere 💀";
        if (!bio) bio = "...";
        var created_at = data.created_at;
        var updated_at = data.updated_at;
        var date1 = new Date(created_at);
        var date2 = new Date(updated_at);

        // Options for formatting the date
        var options = { day: 'numeric', month: 'short', year: 'numeric' };

        // Format the date using the toLocaleDateString method
        var formattedDate1 = date1.toLocaleDateString('en-US', options);
        var formattedDate2 = date2.toLocaleDateString('en-US', options);
        // upto this

        resultDiv.innerHTML = `
            <img src="${data.avatar_url}" alt="Profile Picture">
            <h2>${data.login}</h2>
            <p>Name: ${data.name}</p>
            <p>Status: ${bio}</p>
            <p>Location: ${location}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Since: ${formattedDate1}</p>
            <p>Last Online: ${formattedDate2}</p>
            <p>Repos: ${data.public_repos}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = "Not found on Earth!\n Sorry..";
    });
});