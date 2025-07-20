const navbar = document.getElementById("navbar1");

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add("bg-solid");
        navbar.classList.remove("bg-transparent");
    } else {
        navbar.classList.add("bg-transparent");
        navbar.classList.remove("bg-solid");
    }
});
