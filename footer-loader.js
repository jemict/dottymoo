fetch("footer.html")
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);

    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  });
