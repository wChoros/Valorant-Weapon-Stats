import { getAgents, getWeapons } from "./api.js";
import { addSliderIndexTilesToSlider, addSliderItemToSlider, decrementSliderIndex, incrementSliderIndex } from './utils.js';
import {findBestStats} from './weaponStats.js'
const weaponSlider = document.querySelector(".weapon-slider");
const agentSlider = document.querySelector(".agent-slider");
const sliders = document.querySelectorAll(".slider");

function agentFilter(el1, el2, el3, agent)
{
    if(agent.isPlayableCharacter)
    {
        addSliderItemToSlider(el1, el2, el3, agent)
    }
}

const loadHomePage = () => {
    weaponSlider.querySelector('.slider-content').innerHTML = '';
    agentSlider.querySelector('.slider-content').innerHTML = '';
    agentSlider.querySelector('.slider-index-indicator').innerHTML = '';
    weaponSlider.querySelector('.slider-index-indicator').innerHTML = '';

    getWeapons()
        .then((weapons) => {
            addSliderIndexTilesToSlider(weaponSlider, weapons);
            weapons.forEach((weapon) => addSliderItemToSlider(weaponSlider, weapon.displayIcon, weapon.displayName, weapon));         
            weapons.forEach((weapon) => findBestStats(weapon));
        });

    getAgents()
        .then((agents) => {
            addSliderIndexTilesToSlider(agentSlider, agents);
            agents.forEach((agent) => agentFilter(agentSlider, agent.displayIcon, agent.displayName, agent));
        });

    sliders.forEach((slider) => {
        const nextButton = slider.querySelector(".next-page-button");
        const prevButton = slider.querySelector(".prev-page-button");

        nextButton.addEventListener("click", () => incrementSliderIndex(slider));
        prevButton.addEventListener("click", () => decrementSliderIndex(slider));
    });

    window.addEventListener("resize", () => sliders.forEach((slider) => {
        addSliderIndexTilesToSlider(slider, slider.querySelectorAll(".slider-item"));
        slider.style.setProperty("--slider-index", "0");
    }));    
    document.querySelector('.logo-container').addEventListener('click', function()
    {
        let element = document.querySelector('.weapon-stats');
        while (element.firstChild) 
        {
            element.removeChild(element.firstChild);
        }
        document.querySelector(".agent-image>img").src = "#";
        document.querySelector('.weapon-section').style = "display: none";
        document.querySelector('.agent-section').style = "display: none";
        document.querySelector('.home-main').style = "display: flex";
    });
}

loadHomePage();