'use strict';

const face=document.querySelector('.js-face');
const page=document.querySelector('.js-page');

function wink (){
    face.innerHTML=';)';
};


function handleclick (event){
    event.preventDefault();
    wink();
};

face.addEventListener('click', handleclick);
