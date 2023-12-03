import {LoadWeaponStats} from "./weaponStats.js";
import {LoadAgentStats} from "./agentStats.js";
export const getItemsPerPage = (element) => {
    return parseInt(getComputedStyle(element).getPropertyValue("--slider-items-per-page"));
}

export const getSliderIndex = (element) => {
    return parseInt(getComputedStyle(element).getPropertyValue("--slider-index"));
}

export const getItemCount = (element) => {
    return element.querySelectorAll(".slider-item").length;
}

export const addSliderItemToSlider = (slider, imageUrl, imageAlt, item) => {
    const sliderContent = slider.querySelector('.slider-content');

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");

    const sliderImage = document.createElement("img");
    sliderImage.src = imageUrl;
    sliderImage.alt = imageAlt;
    sliderItem.onclick = function() {
    if(item.isPlayableCharacter)
    {
        LoadAgentStats(item);
    }
    else
    {
        LoadWeaponStats(item);
    }
    };
    sliderImage.setAttribute('draggable', 'false');

    sliderItem.appendChild(sliderImage);
    sliderContent.appendChild(sliderItem);
}

export const addSliderIndexTilesToSlider = (slider, elements) => {
    slider.querySelector('.slider-index-indicator').innerHTML = '';
    const itemsPerPage = getItemsPerPage(slider);
    const pages = Math.ceil(elements.length / itemsPerPage);

    for (let i = 0; i < pages; i++) {
        const tile = document.createElement("div");
        tile.classList.add("slider-index-tile");
        if (i === 0) tile.classList.add("active");
        slider.querySelector('.slider-index-indicator').appendChild(tile);
    }
}

export const incrementSliderIndex = (slider) => {
    const itemCount = getItemCount(slider);
    const currentIndex = getSliderIndex(slider);
    const itemsPerPage = getItemsPerPage(slider);
    let newIndex;

    if (currentIndex * itemsPerPage + itemsPerPage < itemCount) {
        slider.style.setProperty("--slider-index", currentIndex + 1);
        newIndex = currentIndex + 1;
    }
    else {
        slider.style.setProperty("--slider-index", 0);
        newIndex = 0;
    }

    slider.querySelector('.slider-index-indicator').querySelectorAll(".slider-index-tile")[currentIndex].classList.remove("active");
    slider.querySelector('.slider-index-indicator').querySelectorAll(".slider-index-tile")[newIndex].classList.add("active");
}

export const decrementSliderIndex = (slider) => {
    const itemCount = getItemCount(slider);
    const currentIndex = getSliderIndex(slider);
    const itemsPerPage = getItemsPerPage(slider);
    let newIndex;

    if (currentIndex * itemsPerPage - itemsPerPage >= 0) {
        slider.style.setProperty("--slider-index", currentIndex - 1);
        newIndex = currentIndex - 1;
    }
    else {
        slider.style.setProperty("--slider-index", Math.floor(itemCount / itemsPerPage));
        newIndex = Math.floor(itemCount / itemsPerPage);
    }

    slider.querySelector('.slider-index-indicator').querySelectorAll(".slider-index-tile")[currentIndex].classList.remove("active");
    slider.querySelector('.slider-index-indicator').querySelectorAll(".slider-index-tile")[newIndex].classList.add("active");
}
