import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import { debounce } from 'debounce';
const DEBOUNCE_DELAY = 300;
// const fetchUsersBtn = document.querySelector('.btn');
const countryBox = document.querySelector('#search-box');
const listCountries = document.querySelector('.country-list');
const userCountry = document.querySelector('.country-info');

countryBox.addEventListener('input', debounce(searchCountris, DEBOUNCE_DELAY));
function searchCountris() {
  const abc = countryBox.value.trim();
  listCountries.innerHTML = '';
  if (abc === '') return;
  {
    fetchCountries(abc)
      .then(users => renderCountries(users))
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

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
          <div class="flagNameTwo">
          <img src="${country.flags.svg}" alt="Flag ${country.name.official}">
            <b>${country.name.official}</b></p></div>
            <div class="anotherInformations"><p><b>Capital</b>: ${
              country.capital
            }</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p></div>
          </li></ul>
      `;
      })
      .join('');
    listCountries.innerHTML = markup;
    return;
  } else {
    const markup = country
      .map(country => {
        return `
          <ul><li>
          <div class="flagName">
           <img src="${country.flags.svg}" alt="Flag ${country.name.official}" >
           ${country.name.official}
          </div></li></ul>
      `;
      })
      .join('');
    listCountries.innerHTML = markup;
    return;
  }
}
