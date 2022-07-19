function createCard(name, description, pictureUrl) {
    return `
        <div class="card shadow-sm p-0 mb-5 bg-body rounded">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">
                ${name}</h5>
                <p class="card-text">${description}</p>
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

          let i = 3;
          for (let conference of data.conferences) {
              const detailUrl = `http://localhost:8000${conference.href}`;
              const detailResponse = await fetch(detailUrl);
              if (detailResponse.ok) {
                  const details = await detailResponse.json();
                  const title = details.conference.name;
                  const description = details.conference.description;
                  const pictureUrl = details.conference.location.picture_url;
                  const html = createCard(title, description, pictureUrl);
                  const column = document.querySelector(`.col.num${i % 3}`);
                  column.innerHTML += html;
                  i++;
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
