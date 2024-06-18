// public/js/carousel.js
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.carousel img');
    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 4000); // Change image every 3 seconds
});
