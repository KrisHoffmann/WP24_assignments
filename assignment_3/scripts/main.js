setInterval(function() {
    fetch("scripts/read_latest_news.php")
        .then(function(response) {
            return response.json();
        })
        .then(function(articles) {
            var news = document.getElementById("news");
            news.innerHTML = "";
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                news.innerHTML += "<h2>" + article.title + "</h2>";
                news.innerHTML += "<p>" + article.content + "</p>";
                news.innerHTML += "<p>" + article.edit_date + "</p>";
            }
        });
}, 5000);