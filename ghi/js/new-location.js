window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/states/";

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        // Getting states into the state dropdown menu
        const selectTag = document.getElementById("state");
        for (let state of data.states) {
            let option = document.createElement("option");
            option.value = state.abbreviation;
            option.innerHTML = state.name;
            selectTag.appendChild(option);
        }
        // Submit event
        const formTag = document.getElementById("create-location-form");
        formTag.addEventListener("submit", async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            // Sending data to the server
            const locationUrl = "http://localhost:8000/api/locations/";
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
            }            
        });
    }
    
});
