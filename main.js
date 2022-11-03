'use strict';

//VARIABLES

const face=document.querySelector('.js-face');
const page=document.querySelector('.js-page');


//FUNCIONES

function mouseHover (event) { // Este EVENT no es necesario, porque se va a pasar como parámetro en la función manejadora. Lo pongo de forma visual, para que no lo tache.
    if (event.type === 'mouseover'){
        event.target.innerHTML= ';)'
    }else if (event.type === 'mouseout'){
        event.target.innerHTML= ':)'
    };
}

function handleclick (event){
    event.preventDefault();
    mouseHover(event); 
};


//EVENTOS

face.addEventListener('mouseover', handleclick);
face.addEventListener('mouseout', handleclick);
