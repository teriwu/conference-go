function createCard(name, description, pictureUrl, location, starts, ends) {
    return `
        <div class="col">
            <div class="card shadow-sm p-0 mb-5 bg-body rounded">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">
                    ${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">${starts} - ${ends}</small>
                </div>
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/conferences/";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Figure out what to do when the response is bad
        } else {
          const data = await response.json();
          // Placeholder when loading cards
          for (let conference of data.conferences) {
          const newHtml = `<div class="card" aria-hidden="true">
                
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                    </p>
                </div>
                <div class="card-footer placeholder-glow">
                    <span class="placeholder"></span>
                </div>
            </div>
            `
            const loading = document.querySelector(".row");
            console.log(loading);
            loading.innerHTML += newHtml;
          }
        
          for (let conference of data.conferences) {
              const detailUrl = `http://localhost:8000${conference.href}`;
              const detailResponse = await fetch(detailUrl);
              if (detailResponse.ok) {
                  const loaded = document.querySelector(".card");
                  loaded.remove();
                  const details = await detailResponse.json();
                  const title = details.conference.name;
                  const description = details.conference.description;
                  const pictureUrl = details.conference.location.picture_url;
                  const location = details.conference.location.name;
                  const start = new Date(details.conference.starts);
                  const end = new Date(details.conference.ends);
                //   const starts = details.conference.starts;
                //   const ends = details.conference.ends;
                  const starts = start.toLocaleDateString();
                  const ends = end.toLocaleDateString();
                  const html = createCard(title, description, pictureUrl, location, starts, ends);
                  const column = document.querySelector(".row");
                  column.innerHTML += html;
                }
            /*
                const conference = data.conferences[0];
                const nameTag = document.querySelector(".card-title");
                nameTag.innerHTML = conference.name;
                
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    console.log(details);
                    const detailTag = document.querySelector(".card-text");
                    detailTag.innerHTML = details.conference.description;
                    
                    const imageTag = document.querySelector(".card-img-top");
                    imageTag.src = details.conference.location.picture_url;
                    imageTag.innerHTML;
                }
            */
          }
        }

    } catch (e) {
        // Figure out what to do if an error is raised
        console.error(`Error: ${e}`);
    }

});
