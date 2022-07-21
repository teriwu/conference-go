window.addEventListener("DOMContentLoaded", async () => {
    const selectTag = document.getElementById("conference");
  
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
  
      for (let conference of data.conferences) {
        const option = document.createElement("option");
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

      // Add "d-none" class to the loading icon
      const loadingTag = document.getElementById("loading-conference-spinner");
      loadingTag.classList.add("d-none");

      // Remove "d-none" class from the conference tag (selectTag)
      selectTag.classList.remove("d-none");

      //
      const formTag = document.getElementById("create-attendee-form");
        formTag.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const attendeeUrl = "http://localhost:8001/api/attendees/";
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await fetch(attendeeUrl, fetchConfig);
            if (response.ok) {
                const successTag = document.getElementById("success-message");
                successTag.classList.remove("d-none");
                formTag.classList.add("d-none");
                const newAttendee = await response.json();
                console.log(newAttendee);
            }
        })
    }
    
});
