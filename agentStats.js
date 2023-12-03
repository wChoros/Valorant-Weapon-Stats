

function createAbilityTile(item, number)
{
    const agentAbility = document.createElement('div');
    agentAbility.classList.add('agent-ability')
    if(number%2==0)
    {
        const agentAbilityImg = document.createElement('div');
        agentAbilityImg.classList.add('agent-ability-img');
        const img = document.createElement('img');
        if(item.displayName=='Uncanny Marksman' || item.displayName=='Toxic' || item.displayName=='Heating Up')
        {
            img.src = "./assets/images/x.png";
        }
        else
        {
            img.src = item.displayIcon;
        }

        img.alt = item.displayName;
        agentAbilityImg.appendChild(img);

        agentAbility.style.backgroundColor = '#262626'; 
        const agentAbilityDescription = document.createElement('div');
        agentAbilityDescription.classList.add('agent-ability-description-right');
        const h3 = document.createElement('h3');
        h3.innerText = item.slot+": "+item.displayName;
        agentAbilityDescription.appendChild(h3);
        const p = document.createElement('p');
        p.innerText = item.description;
        agentAbilityDescription.appendChild(p);

        agentAbility.appendChild(agentAbilityImg);
        agentAbility.appendChild(agentAbilityDescription);
    }
    else
    {
        const agentAbilityDescription = document.createElement('div');
        agentAbilityDescription.classList.add('agent-ability-description-left');

        const h3 = document.createElement('h3');
        h3.innerText = item.slot+": "+item.displayName;
        agentAbilityDescription.appendChild(h3);
        const p = document.createElement('p');
        p.innerText = item.description;
        agentAbilityDescription.appendChild(p);
        const agentAbilityImg = document.createElement('div');
        agentAbilityImg.classList.add('agent-ability-img');
        const img = document.createElement('img');
    
        if(item.displayName=='Uncanny Marksman' || item.displayName=='Toxic' || item.displayName=='Heating Up')
        {
            img.src = "./assets/images/x.png";
        }
        else
        {
            img.src = item.displayIcon;
        }

        img.alt = item.displayName;
        agentAbilityImg.appendChild(img);



        agentAbility.appendChild(agentAbilityDescription);
        agentAbility.appendChild(agentAbilityImg);
    }
    return agentAbility;
}

export const LoadAgentStats = (item) =>
{

    document.querySelector('.home-main').style = "display: none";
    document.querySelector('.agent-section').style = "display: flex";
    
    document.querySelector('.agent-image>img').src = item.fullPortrait;
    document.querySelector('.agent-image>img').alt = item.displayName;
    document.querySelector('.agent-name>h1').innerText = item.displayName;
    document.querySelector('.agent-description').innerText = item.description;

    
    document.querySelector('.agent-role>img').src = item.role.displayIcon;
    document.querySelector('.agent-role>img').alt = item.role.displayName;
    document.querySelector('.agent-description-cont>h3').innerText = item.role.displayName;
    document.querySelector('.agent-description-cont>p').innerText = item.role.description;
    const element = document.querySelector('.agent-abilities');
    while (element.firstChild) 
    {
        element.removeChild(element.firstChild);
    }
    const h2 = document.createElement('h2');
    h2.innerText = "Abilities:";
    element.appendChild(h2);

    for (var i = 0; i < item.abilities.length ;i++) 
    {
        element.appendChild(createAbilityTile(item.abilities[i],i))
    }

    
}