class WeatherActivitySuggester {
    constructor() {
        this.city = '';
        this.isDay = '';
        this.tempC = '';
        this.cityInput = $('.cityInput');
        this.showData = $('.showData');
        this.showActivities = $('.showActivities');
        this.activitiesToWeather = [
            [0, "education", 0, -4, 10],
            [1, "recreational", 1, 1, 5],
            [2, "social", 1, 10, 19],
            [3, "diy", 0, 12, 17],
            [4, "charity", 1, -1, 5],
            [5, "cooking", 0, 10, 15],
            [6, "relaxation", 1, 5, 9],
            [7, "music", 1, 2, 5],
            [8, "busywork", 0, 0, 11]
        ];
        this.initEventListeners();
    }

    initEventListeners() {
        $('.sendRequest').click(() => this.request());
        this.cityInput.keypress((e) => {
            if(e.which == 13) {
                this.request();
            }
        });
    }

    async request() {
        this.city = this.cityInput.val();

        if (this.city) {
            await this.getData(this.city);
            this.cityInput.val('');
            this.cityInput.attr('placeholder', 'Enter city name');
        } else {
            this.cityInput.attr('placeholder', 'It can\'t be empty');
        }
    }

    async getData(city) {
        try {
            const response = await $.getJSON('http://api.weatherapi.com/v1/current.json?key=8738e7cf716d4b90bcb195537230712&q=' + city);
            this.tempC = JSON.stringify(response.current.temp_c);
            const tempF = JSON.stringify(response.current.temp_f);
            const cityApi = JSON.stringify(response.location.name);
            const condition = JSON.stringify(response.current.condition.text);
            this.isDay = JSON.stringify(response.current.is_day);

            this.showData.html(`<span class="dataHeader">The current temperature in ${this.slice(cityApi)} is ${this.tempC}C/${tempF}F</span>`);

            if (this.isDay == 1) {
                this.showData.append(`<span class="dataTime day"><i class="fa-regular fa-sun"></i><span>It's daytime, ${this.slice(condition)}</span></span>`);
            } else {
                this.showData.append(`<span class="dataTime night"><i class="fa-regular fa-moon"></i><span>It's night, ${this.slice(condition)}</span></span>`);
            }

            this.getActivities();
        } catch (error) {
            this.showData.html('<span class="error">API ERROR</span>');
            this.showActivities.html('');
        }
    }

    getActivities() {
        let suitableActivities = this.activitiesToWeather.filter(activity => 
            activity[2] == this.isDay && this.tempC >= activity[3] && this.tempC <= activity[4]
        ).map(activity => activity[1]);

        if (suitableActivities.length > 0) {
            let randomIndex = Math.floor(Math.random() * suitableActivities.length);

            $.getJSON('http://www.boredapi.com/api/activity?type=' + suitableActivities[randomIndex], (data) => {
                const activitiesReposne = JSON.stringify(data.activity);
                this.showActivities.html('Your random activity: ' + activitiesReposne);
            })
        } else {
            this.showActivities.html('No suitable activities found');
        }
    }

    slice(string) {
        return string.slice(1,-1);
    }
}

new WeatherActivitySuggester();