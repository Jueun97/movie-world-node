window.addEventListener('scroll', (e) => {
    scrollHeight = window.scrollY;
    const navbar = document.querySelector('#navbar');

    if (scrollHeight > 0)
        navbar.classList.add('active');
    else
        navbar.classList.remove('active');
})