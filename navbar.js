// get the navbar element from the DOM
const navbar = document.getElementById("navbar1");

// Change the navbar background color attribute from transparent to solid when the user has scrolled
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add("bg-solid");
        navbar.classList.remove("bg-transparent");
    } else {
        navbar.classList.add("bg-transparent");
        navbar.classList.remove("bg-solid");
    }
});
