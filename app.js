const searchBtn = document.getElementById('search-btn');
const animeList = document.getElementById('anime');

searchBtn.addEventListener('click', getanimeList);

function getanimeList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.jikan.moe/v3/search/anime?q=${searchInputTxt}&page=1`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.results) {
            data.results.forEach(results => {
                html += `
                <div class="anime-item" data-id="${results.mal_id}">
                        <div class="anime-img">
                            <img src="${results.image_url}" alt="anime">
                        </div>
                        <div class="anime-name">
                            <h3>${results.title}</h3>
                            <blockquote>${results.synopsis}</blockquote>
                            <a href="${results.url}" class="anime-btn">More info</a>
                        </div>
                    </div>
                `;
            });
            animeList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any anime!";
            animeList.classList.add('notFound');
        }

        animeList.innerHTML = html;
    })
}