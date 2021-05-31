import countriesPL from './countriesPL'
import Icons from './Icons'

const Current = ({currentData}) => {
    if (!currentData.timezone) {
        return <></>
    };

    const data = currentData;
    const description = data.weather[0].description;
    const city = data.name;
    const temp = data.main.temp.toFixed();
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const feelsLike = data.main.feels_like.toFixed(0);
    const wind = (data.wind.speed * 3.6).toFixed(1);
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const icon = data.weather[0].icon;
    const country = data.sys.country;


    const countryFullName = () => {
        for (const key in countriesPL) {
            if (countriesPL.hasOwnProperty(key)) {
                if (country === key) {
                    return countriesPL[key];
                }
            };
        };
    };

    const formatTime = daytime => {
        const time = new Date((daytime * 1000) + (data.timezone * 1000)).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(11, -3);

        return time;
    };

    const currentDate = () => {
        const a = new Date((data.dt * 1000) + (data.timezone * 1000));
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']

        const months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia'];

        const day = days[a.getDay()];
        const month = months[a.getMonth()];
        const time = `${day} ${a.getDate()} ${month}`;
        return time;
    };


    return (
        <section className="current-forecast hide">
            <div className="city">
                <h2>{city}, <span>{countryFullName()}</span></h2>
                <p>{currentDate()}</p>
            </div>
            <div className="current-temp">
                <Icons iconInfo={icon} />
                <div className="description">
                    <h2>{temp}°C</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="current-others">
                <div className="temp">
                    <p>Odczuwalna temperatura</p>
                    <h3>{feelsLike}°C</h3>
                </div>
                <div className="wind">
                    <p>Prędkość wiatru</p>
                    <h3>{wind} km/h</h3>
                </div>
                <div className="sunrise">
                    <p>Wschód</p>
                    <h3>{formatTime(sunrise)}</h3>
                </div>
                <div className="pressure">
                    <p>Ciśnienie</p>
                    <h3>{pressure} hPa</h3>
                </div>
                <div className="humidity">
                    <p>Wilgotność</p>
                    <h3>{humidity}%</h3>
                </div>
                <div className="sunset">
                    <p>Zachód</p>
                    <h3>{formatTime(sunset)}</h3>
                </div>
            </div>
        </section>
    );
};

export default Current;