const cityInput = $('.cityInput');
const showData = $('.showData');
const sendRequest = $('.sendRequest');

const slice = string => string.slice(1, -1);

const getData = city => {
    const url = `http://api.weatherapi.com/v1/current.json?key=8738e7cf716d4b90bcb195537230712&q=${city}`;

    $.getJSON(url, data => {
        const tempC = JSON.stringify(data.current.temp_c);
        const tempF = JSON.stringify(data.current.temp_f);
        const cityApi = JSON.stringify(data.location.name);
        const condition = JSON.stringify(data.current.condition.text);
        const isDay = JSON.stringify(data.current.is_day);

        showData.html(`<span class="dataHeader">The current temperature in ${slice(cityApi)} is ${tempC}C/${tempF}F</span>`);

        const timeClass = isDay == 1 ? 'day' : 'night';
        const timeIcon = isDay == 1 ? 'sun' : 'moon';

        showData.append(`<span class="dataTime ${timeClass}"><i class="fa-regular fa-${timeIcon}"></i><span>It's ${timeClass}, ${slice(condition)}</span></span>`);
    })
    .fail(() => {
        showData.html('<span class="error">NO city named: '+ city +' found</span>');
    });
};

const request = () => {
    const city = cityInput.val();

    if (city) {
        getData(city);
        cityInput.val('');
        cityInput.attr('placeholder', 'Enter city name');
    } else {
        cityInput.attr('placeholder', 'It can\'t be empty');
    }
};

sendRequest.click(request);
cityInput.keypress(e => {
    if(e.which == 13) {
        request();
    }
});