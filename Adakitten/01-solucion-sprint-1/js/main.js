'use strict';

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const inputRace = document.querySelector('.js-input-race');
const input_search_race = document.querySelector('.js_in_search_race');

//Objetos con cada gatito
const kittenData_1 = {
  image: 'https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg',
  name: 'Anastacio',
  desc: 'Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!',
  race: 'British Shorthair',
};
const kittenData_2 = {
  image:
    'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg',
  name: 'Fiona',
  desc: 'Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!',
  race: 'British Shorthair',
};
const kittenData_3 = {
  image:
    'https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg',
  name: 'Cielo',
  desc: 'Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!',
  race: 'British Shorthair',
};
const newKittenDataObject = {
  valueDesc: inputDesc.value,
  valuePhoto: inputPhoto.value,
  valueName: inputName.value,
  valueRace: inputRace.value,
};

// const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];
let kittenDataList = [];

//Funciones
function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}

renderKittenList(kittenDataList);

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
  newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains('collapsed')) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;

  const newKittenDataObject = {
    image: newImage,
    name: newName,
    desc: newDescription,
    race: newRace,
  };

  fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newKittenDataObject),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        kittenDataList = newKittenDataObject.push();
        localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
        renderKittenList(kittenDataList);
        inputDesc.value = '';
        inputName.value = '';
        inputPhoto.value = '';
        inputRace.value = '';
        //Completa y/o modifica el código:
        //Agrega el nuevo gatito al listado
        //Guarda el listado actualizado en el local stoarge
        //Visualiza nuevamente el listado de gatitos
        //Limpia los valores de cada input
      } else {
        console.log('error');
      }
    });

  if (valueDesc === '' && valuePhoto === '' && valueName === '') {
    labelMesageError.innerHTML = 'Debe rellenar todos los valores';
  } else {
    if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
      labelMesageError.innerHTML = '';

      const newKittenDataObject = {
        image: valuePhoto,
        name: valueName,
        desc: valueDesc,
        race: valueRace,
      };
      kittenDataList.push(newKittenDataObject);
      inputDesc.value = '';
      inputName.value = '';
      inputPhoto.value = '';
      inputRace.value = '';

      labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';

      renderKittenList(kittenDataList);
    }
  }
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add('collapsed');
  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';
}

//Filtrar por descripción
function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value;
  const raceSearchText = input_search_race.value;

  listElement.innerHTML = '';
  //   for (const kittenItem of kittenDataList) {
  //     if (kittenItem.desc.includes(descrSearchText)) {
  //       listElement.innerHTML += renderKitten(kittenItem);
  //     }
  //   }
  const kittenDescription = kittenDataList.filter((kitten) =>
    kitten.desc.includes(descrSearchText)
  );
  const kittenRace = kittenDataList.filter((kitten) =>
    kitten.race.includes(raceSearchText)
  );
  renderKittenList(kittenDescription, kittenRace);
  // renderKittenList(kittenRace);
}

//Mostrar el litado de gatitos en ell HTML
// renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener('click', handleClickNewCatForm);
searchButton.addEventListener('click', filterKitten);
buttonAdd.addEventListener('click', addNewKitten);
buttonCancelForm.addEventListener('click', cancelNewKitten);

//fetch Ejercico 1 peticiones al servidor

const GITHUB_USER = 'nayraromero';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

//LOCAL STORAGE

let kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

if (kittenListStored !== null) {
  kittenDataList = kittenListStored;
  renderKittenList(kittenDataList);
} else {
  fetch(SERVER_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((dataList) => {
      kittenDataList = dataList.results;
      localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
      renderKittenList(kittenDataList);
    })
    .catch((error) => {
      console.error(error);
    });
}

// fetch('https://dev.adalab.es/api/kittens/nayraromero', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     image: 'https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg',
//     name: 'Anastacio',
//     desc: 'Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!',
//     race: 'British Shorthair',
//   }),
// }).then((response) => response.json());
// then((data) => {
//   kittenDataList += data.results;
//   localStorage.setItem('newKittenList', JSON.stringify(kittenDataList));
// });
