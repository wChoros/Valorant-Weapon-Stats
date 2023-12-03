const statBestValues = [0, 0, 0, 0, 0, 0, 0]
const statWorstValues = [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
const statNames = ['Magazine Size','Fire Rate', 'Run Speed Multiplayer', 'First Bullet Accuracy', "Cost", "Equip Time (s)", 'Reload Time (s)']
let i = 0;
/*
--More = better:--
0-weaponStats.magazineSize
1-weaponStats.fireRate
2-weaponStats.runSpeedMultiplier
3-weaponStats.firstBulletAccuracy
--Less = better:--
4-shopData.cost
5-weaponStats.equipTimeSeconds
6-weaponStats.reloadTimeSeconds
--Not comparable--
7-shopData.categoryText
*/
function appendMoreStat(stat)
{
    if(stat > statBestValues[i])
    {
        statBestValues[i] = stat;
    }
    i++;
}



function appendLessStat(stat)
{
    if(stat < statWorstValues[i])
    {
        statWorstValues[i] = stat;
    }
    i++;
}
export const findBestStats = (weapon) =>
{
    i=0;
    appendMoreStat(weapon.weaponStats.magazineSize);
    appendMoreStat(weapon.weaponStats.fireRate);
    appendMoreStat(weapon.weaponStats.runSpeedMultiplier);
    appendMoreStat(weapon.weaponStats.firstBulletAccuracy);
    appendMoreStat(weapon.shopData.cost);
    appendMoreStat(weapon.weaponStats.equipTimeSeconds);
    appendMoreStat(weapon.weaponStats.reloadTimeSeconds);
    i=0;
    appendLessStat(weapon.weaponStats.magazineSize);
    appendLessStat(weapon.weaponStats.fireRate);
    appendLessStat(weapon.weaponStats.runSpeedMultiplier);
    appendLessStat(weapon.weaponStats.firstBulletAccuracy);
    appendLessStat(weapon.shopData.cost);
    appendLessStat(weapon.weaponStats.equipTimeSeconds);
    appendLessStat(weapon.weaponStats.reloadTimeSeconds);
}


function BestPercent(value, statNumber)
{
    return ((value-statWorstValues[statNumber])/(statBestValues[statNumber]-statWorstValues[statNumber]))*100 + "%";
}

function createWeaponStatTile(stat, statNumber)
{
    const weaponStat = document.createElement('div');
    weaponStat.classList.add("weapon-stat")

        const weaponStatName = document.createElement('div');
        weaponStatName.classList.add("weapon-stat-name")

            const weaponStatNameP = document.createElement('p');
            weaponStatNameP.innerText = statNames[statNumber];
            weaponStatName.appendChild(weaponStatNameP);
        
        const weaponStatValue = document.createElement('div');
        weaponStatValue.classList.add("weapon-stat-value")
        weaponStatValue.innerText = stat;

        const weaponStatLvlLeft = document.createElement('div');
        weaponStatLvlLeft.classList.add("weapon-stat-lvl-left")
            weaponStatLvlLeft.innerText = statWorstValues[statNumber]

        const weaponStatLvl = document.createElement('div');
        weaponStatLvl.classList.add("weapon-stat-lvl")

            const weaponStatLvlMarker = document.createElement('div');
            weaponStatLvlMarker.style = "width: " + BestPercent(stat, statNumber);
            weaponStatLvlMarker.classList.add("weapon-stat-lvl-marker");
                
            if(statNumber<4)
            {
                weaponStatLvlMarker.classList.add("good");
            }
            else
            {
                weaponStatLvlMarker.classList.add("bad");
            }

        const weaponStatLvlRight = document.createElement('div');
        weaponStatLvlRight.classList.add("weapon-stat-lvl-right");
            weaponStatLvlRight.innerText = statBestValues[statNumber];

    weaponStatLvl.appendChild(weaponStatLvlMarker);

    weaponStat.appendChild(weaponStatName);
    weaponStat.appendChild(weaponStatValue);
    weaponStat.appendChild(weaponStatLvlLeft);
    weaponStat.appendChild(weaponStatLvl);
    weaponStat.appendChild(weaponStatLvlRight);
    return weaponStat;
}

export const LoadWeaponStats = (item) =>
{
    const statValues = [item.weaponStats.magazineSize, item.weaponStats.fireRate, item.weaponStats.runSpeedMultiplier, item.weaponStats.firstBulletAccuracy, item.shopData.cost, item.weaponStats.equipTimeSeconds, item.weaponStats.reloadTimeSeconds];
    document.querySelector('.home-main').style = "display: none";
    document.querySelector('.weapon-section').style = "display: flex";
    
    const weaponImageDiv = document.createElement('div');
    const weaponImage = document.createElement('img');
    document.querySelector(".weapon-name>h1").innerText = item.displayName;
    document.querySelector(".weapon-image>img").src = item.displayIcon;
    
    const weaponName = document.createElement('div');
    const weaponNameH1 = document.createElement('h1');
    

    weaponNameH1.innerText = item.displayName;
    weaponName.appendChild(weaponNameH1);
    weaponImage.src = item.displayIcon;
    weaponImageDiv.appendChild(weaponImage);
    
    for(let i = 0; i < statBestValues.length; i++) 
    {
        document.querySelector('.weapon-stats').appendChild(createWeaponStatTile(statValues[i], i));
    }    
}