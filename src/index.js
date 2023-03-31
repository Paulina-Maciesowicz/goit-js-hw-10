import Notiflix from 'notiflix';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;
const fetchUsersBtn = document.querySelector('.btn');
const countryBox = document.querySelector('#search-box');
const listCountris = document.querySelector('.country-list');
const userCountry = document.querySelector('.country-info');

fetchUsersBtn.addEventListener('click', () => {
  fetchCountries(countryBox.value)
    .then(users => renderCountries(users))
    .catch(error => console.log('Oops, there is no country with that name'));
  Notiflix.Notify.failure('Oops, there is no country with that name');
});

function fetchCountries(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

countryBox.addEventListener('input', event => {
  console.log(countryBox.value);
});

function renderCountries(country) {
  if (country.length > 10) {
    console.log('Too many matches found. Please enter a more specific name.');
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  console.log(country);
  if (country.length === 1) {
    const markup = country
      .map(country => {
        return `
          <ul><li>
            <p><b>Name</b>: ${country.name.official}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Flags</b>: <img src="${country.flags.svg}" alt="Flag ${
          country.name.official
        }" width="100" height="300"></p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>
          </li></ul>
      `;
      })
      .join('');
    listCountris.innerHTML = markup;
    return;
  } else {
    const markup = country
      .map(country => {
        return `
          <ul><li>
            <p><b>Name</b>: ${country.name.official}</p>
            <p><b>Flags</b>: <img src="${country.flags.svg}" alt="Flag ${country.name.official}" width="100" height="300"></p>
      
          </li></ul>
      `;
      })
      .join('');
    listCountris.innerHTML = markup;
    return;
  }
}
