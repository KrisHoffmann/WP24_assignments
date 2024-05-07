/Task 1/
document.addEventListener("DOMContentLoaded", function() {
    var current = window.location.pathname;

    if (current.includes("index.html")) {
        document.title = "Webprogramming (LIX018P05) - Index";
    } else if (current.includes("second.html")) {
        document.title = "Webprogramming (LIX018P05) - Second";
    }
});

/Task 2/
document.addEventListener("DOMContentLoaded", function() {
    var current = window.location.pathname;

    if (current.includes("index.html")) {
        var newArticle = document.createElement("article");

        var heading = document.createElement("h1");
        heading.textContent = "New Article Heading";

        var paragraph = document.createElement("p");
        paragraph.textContent = "This is a new article paragraph.";

        newArticle.appendChild(heading);
        newArticle.appendChild(paragraph);

        var mainColumn = document.querySelector(".col-md-12");

        mainColumn.appendChild(newArticle);
    }
});


/Task 3/
document.addEventListener("DOMContentLoaded", function() {
    var thirdLi = document.querySelector("#links li:nth-child(3) a");

    thirdLi.href = "https://google.com";
});

/Task 4/
document.addEventListener("DOMContentLoaded", function() {
    var thirdLi = document.querySelector("#links li:nth-child(3) a");

    thirdLi.href = "https://google.com";

    thirdLi.setAttribute("target", "_blank");
});

/Task 5/
document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll(".nav-item > .nav-link");

    navLinks.forEach(function(navLink) {
        navLink.style.color = "red";
    });
});

/Task 6/
document.addEventListener("DOMContentLoaded", function() {
    var current = window.location.pathname;

    if (current.includes("index.html")) {
        var schedule = {
            'Week 1': 'Assignment 1',
            'Week 2': 'Assignment 1',
            'Week 3': 'Assignment 2',
            'Week 4': 'Assignment 2',
            'Week 5': 'Assignment 3',
            'Week 6': 'Assignment 3',
            'Week 7': 'Final Project'
        };

        var newArticle = document.createElement("article");

        var scheduleList = document.createElement("ul");

        for (var week in schedule) {
            if (schedule.hasOwnProperty(week)) {
                var assignment = schedule[week];
                var listItem = document.createElement("li");
                listItem.textContent = week + ': ' + assignment;
                scheduleList.appendChild(listItem);
            }
        }

        newArticle.appendChild(scheduleList);

        var mainColumn = document.querySelector(".col-md-12");
        mainColumn.appendChild(newArticle);
    }
});


/Task 7/
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("second.html")) {
        var mainColumn = document.querySelector(".col-md-12");
        mainColumn.classList.remove("col-md-12");
        mainColumn.classList.add("col-md-8");

        var sidebar = document.createElement("div");
        sidebar.classList.add("col-md-4");

        var sidebarHeading = document.createElement("h2");
        sidebarHeading.textContent = "Sidebar";

        var paragraph = document.createElement("p");
        paragraph.textContent = "This is the sidebar content.";

        sidebar.appendChild(sidebarHeading);
        sidebar.appendChild(paragraph);

        mainColumn.parentNode.insertBefore(sidebar, mainColumn.nextSibling);
    }
});