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
    }
  
  });