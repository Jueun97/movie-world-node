window.addEventListener('scroll', (e) => {
    scrollHeight = window.scrollY;
    const navbar = document.querySelector('#navbar');

    if (scrollHeight > 0)
        navbar.classList.add('active');
    else
        navbar.classList.remove('active');
});
const moreInfoBtn = document.querySelector('.infoBtn');
moreInfoBtn.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block'; 
    const body = document.querySelector('.body')
    body.classList.add('not-scroll');
});

const cancleBtn = document.querySelector('.modal__cancle');
cancleBtn.addEventListener('click', () => {
    console.log('hihi');
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    const body = document.querySelector('.body');
    body.classList.remove('not-scroll');
});