window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var content = document.getElementById('main');
    var contentRect = content.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollMiddle = scrollTop + window.innerHeight / 2;
    
    // Se il punto medio del contenuto è sopra il punto medio dello schermo
    if (contentRect.top + contentRect.height / 2 < scrollMiddle) {
        navbar.classList.add('navbar-white');
    } else {
        navbar.classList.remove('navbar-white');
    }
});
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var button = document.getElementById('Get');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > window.innerHeight / 2) {
        navbar.classList.add('btn');
        button.classList.add('green');
    } else {
        navbar.classList.remove('btn');
        button.classList.remove('green');
    }
});