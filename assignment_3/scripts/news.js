const newsDiv = document.getElementById('news');
const form = document.getElementById('add-article-form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const article = {
        title,
        content,
        date: new Date().toISOString().slice(0, 16) + ':00'
    };

    fetch('data/add_item.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    })
        .then(() => {
            form.reset();
            loadArticles();
        });
});

function loadArticles() {
    fetch('data/articles.json')
        .then(response => response.json())
        .then(articles => {
            newsDiv.innerHTML = '';
            articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');
                articleDiv.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.content}</p>
          <small>${new Date(article.date).toLocaleString()}</small>
        `;
                newsDiv.appendChild(articleDiv);
            });
        });
}

loadArticles();