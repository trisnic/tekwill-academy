
  const createCountryContainer = (country) => {
    const container = document.createElement('div');
    container.className = 'country-container';
    container.id = 'country-details';

    const flagImg = document.createElement("img");
    flagImg.src = country.flags.png;
    flagImg.alt = country.flags.alt;
    container.appendChild(flagImg);

    const name = document.createElement("h2");
    name.textContent = 'Name: ' + country.name.common;
    container.appendChild(name);

    const population = document.createElement("h4");
    population.textContent = 'Population: ' + country.population;
    container.appendChild(population);
      
    const currencies = document.createElement("h3");
    currencies.textContent = 'Currency: ';
    for (const currencyKey in country.currencies) {
      const currency = country.currencies[currencyKey];
      const currencyInfo = `${currencyKey} - ${currency.name} (${currency.symbol})`;
      currencies.textContent += currencyInfo;
    }
    container.appendChild(currencies);
    
    const capital = document.createElement("h3");
    capital.textContent = 'Capital: ' + country.capital;
    container.appendChild(capital);
    
    const continents = document.createElement("h3");
    continents.textContent = 'Continent: ' + country.continents;
    container.appendChild(continents);

    return container;
  }

  const fetchData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
        countries.forEach(country => {
          const countriesContainer = document.getElementById('countries');
          const countryContainer = createCountryContainer(country);
          countriesContainer.appendChild(countryContainer);
        })
      })
      .catch(error => console.log(error));
  }

  fetchData();
