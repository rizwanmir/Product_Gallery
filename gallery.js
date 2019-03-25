"use strict";



let startIndex = 0;
let currentIndex;
let smallImages;
window.addEventListener("load", function() {
    smallImages = document.querySelectorAll(".small-images > img");
    for (let i = 0; i < smallImages.length; i++) {
        smallImages[i].addEventListener("click", smallImagesClickListener);
        smallImages[i].setAttribute("data-index", i);
    }
    document.querySelector("#nextImg").addEventListener("click", function(myEvent) {
        myEvent.stopPropagation();
        displayNextImg();
    });
    document.querySelector("#prevImg").addEventListener("click", function(myEvent) {
        myEvent.stopPropagation();
        displayPreviousImg();
    });
    document.querySelector(".big-image").addEventListener("click", bigImageClickListner);
    document.querySelector(".overlay").addEventListener("click", removeOverlay);

    document.addEventListener("keydown", keyListener);

    document.querySelector(".big-image").addEventListener("mouseover", mouseOver);
    document.querySelector(".big-image").addEventListener("mouseout", mouseOut);

    currentIndex = startIndex;
    displayImgFromIndex(currentIndex);
});

function mouseOver() {
    document.querySelector("#zoom").style.display = "block";
}

function mouseOut() {
    document.querySelector("#zoom").style.display = "none";
}

function keyListener(e) {
    if (e.key == "ArrowLeft") {
        displayPreviousImg();
    }

    if (e.key == "ArrowRight") {
        displayNextImg();
    }
}

function displayNextImg() {
    currentIndex = currentIndex + 1;
    if (currentIndex >= smallImages.length) {
        currentIndex = 0;
    }
    displayOverlayImageFromIndex(currentIndex);
}

function displayPreviousImg() {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
        currentIndex = smallImages.length - 1;
    }
    displayOverlayImageFromIndex(currentIndex);
}

function displayImgFromIndex(index) {
    document.querySelector(".big-image").src = "imgs/" + smallImages[index].getAttribute("data-bigimgsrc");
}

function displayOverlayImageFromIndex(index) {
    document.querySelector(".overlay .overlay-image").src = "imgs/" + smallImages[index].getAttribute("data-bigimgsrc");
}

function smallImagesClickListener() {

    currentIndex = parseInt(this.dataset.index);
    document.querySelector(".big-image").src = "imgs/" + this.dataset.bigimgsrc;

    document.querySelector(".small-images > img").classList.add('selected');
}

function bigImageClickListner() {
    let elem = document.querySelector(".overlay .overlay-image");
    elem.src = this.src;
    showOverlay();
}

function showOverlay() {
    document.querySelector(".overlay").classList.add("visible");
}

function removeOverlay() {
    document.querySelector(".overlay").classList.remove("visible");
}