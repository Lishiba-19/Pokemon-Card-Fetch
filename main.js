// Pokemon cards

const pokemonForm = document.querySelector(".pokemonForm");
const pokemonInput = document.querySelector(".pokemonInput");
const card = document.querySelector('.card');

//Pokemon Select Hints
const hint = document.querySelector('.hint');
const hint1 = document.querySelector('.opt1');
const hint2 = document.querySelector('.opt2');
const hint3 = document.querySelector('.opt3');
const hint4 = document.querySelector('.opt4');
const hint5 = document.querySelector('.opt5');
const hint6 = document.querySelector('.opt6');
const hint7 = document.querySelector('.opt7');
const hint8 = document.querySelector('.opt8');
const hint9 = document.querySelector('.opt9');
const hint10 = document.querySelector('.opt10');

hint.addEventListener('click', ()=>{
    switch (hint.selectedIndex) {
        case 0: pokemonInput.value = hint1.textContent;
            break;
        case 1: pokemonInput.value = hint2.textContent;
            break;
        case 2: pokemonInput.value = hint3.textContent;
            break;
        case 3: pokemonInput.value = hint4.textContent;
            break;
        case 4: pokemonInput.value = hint5.textContent;
            break;
        case 5: pokemonInput.value = hint6.textContent;
            break;
        case 6: pokemonInput.value = hint7.textContent;
            break;
        case 7: pokemonInput.value = hint8.textContent;
            break;
        case 8: pokemonInput.value = hint9.textContent;
            break;
        case 9: pokemonInput.value = hint10.textContent;
            break;
       
        default: pokemonInput.value = "";
            break;
       }
});
   
// 
pokemonForm.addEventListener("submit", async (event) => {
    
    event.preventDefault();

    const pokemon = pokemonInput.value.toLowerCase();

    if(pokemon){
        try {
            const pokemonData = await getPokemonData(pokemon);
            displayPokemonInfo(pokemonData);
            console.log(pokemonData);
        } catch (error) {
            console.error(error)
            displayError(error);
        }
    }
    else {
        displayError("Please enter a pokemon character.")
    }


});

async function getPokemonData(pokemonName){

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    if(!response.ok){
        throw new Error("Error fetching data.");
    }

    return response.json();
    
}

function displayPokemonInfo(data){

    //Declarations
    const { name: pokemonname,
            stats: [{base_stat: hp}, 
                    {base_stat: attack},
                    {base_stat: defense},
                    {base_stat: special_atk},
                    {base_stat: special_def},
                    {base_stat: speed},],
            types:  [{type: {name: attribute}},
                    
            ],
            weight: lbs,
            height: cms,
            abilities: [{ability: {
                name: pokemonPwr1,
            }}],
            sprites: {front_default: url},
                }= data;

    const topSec = document.createElement("div");
    topSec.classList.add("top")
    const pokemonDisplay = document.createElement("h1");
    const hpDisplay = document.createElement("p");

    const pokeImg = document.createElement("div");
    pokeImg.classList.add("pokeImg");
    const imgDisplay = document.createElement("img");

    //type-desc
    const typeDesc = document.createElement("div");
    typeDesc.classList.add("type-desc");
    const power = document.createElement("p");
    const length = document.createElement("p");
    const pokeWeight = document.createElement("p");

    //powerDesc
    const powerDesc = document.createElement("div");
    powerDesc.classList.add("main");
    const pokePwr = document.createElement("p");

    // Assignments and class inclusion
    imgDisplay.src = `${url}`;

    card.textContent = "";
    card.style.display = "block"; 

    pokemonDisplay.classList.add("p-name");
    pokemonDisplay.textContent = `${pokemonname.charAt(0).toUpperCase()}${pokemonname.slice(1)}`;

    hpDisplay.classList.add("hp");
    hpDisplay.textContent = `${hp}hp`;

    //type-desc
    power.textContent = `${attribute} pokemon`;
    length.textContent = `Height: ${cms}cm`;
    pokeWeight.textContent = `Weight: ${lbs}lbs`;

    //powerDesc
    pokePwr.textContent = `Pokemon Power: ${pokemonPwr1}`;


    //Child Appending
    topSec.appendChild(pokemonDisplay);
    topSec.appendChild(hpDisplay);

    pokeImg.appendChild(imgDisplay);

    typeDesc.appendChild(power);
    typeDesc.appendChild(length);
    typeDesc.appendChild(pokeWeight);

    powerDesc.appendChild(pokePwr);
    

    card.appendChild(topSec);
    card.appendChild(pokeImg);
    card.appendChild(typeDesc);
    card.appendChild(powerDesc);
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}


