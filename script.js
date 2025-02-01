let images = ["h6.jpg", "h7.jpg"];
let index = 0;
let bg1 = document.querySelector(".bg1");
let bg2 = document.querySelector(".bg2");
let isBg1Visible = true;

// Preload images before switching to avoid flickering
function preloadImages(images) {
    images.forEach((image) => {
        let img = new Image();
        img.src = image;
    });
}
preloadImages(images);

function changeBackground() {
    let nextImage = `url('${images[index]}')`;

    if (isBg1Visible) {
        bg2.style.backgroundImage = nextImage;
        bg2.style.opacity = "1";
        setTimeout(() => {
            bg1.style.opacity = "0";
        }, 400); // Delay to prevent flashing
    } else {
        bg1.style.backgroundImage = nextImage;
        bg1.style.opacity = "1";
        setTimeout(() => {
            bg2.style.opacity = "0";
        }, 500);
    }

    isBg1Visible = !isBg1Visible;
    index = (index + 1) % images.length;
}

setInterval(changeBackground, 7000); // Change every 4 seconds
