import Day from './Day'
const Forecast = ({forecastData}) => {
    if (!forecastData) {
        return <></>
    };

    const data = forecastData;
    const timezone = data.timezone_offset;
    const days = data.daily;

    return (
        <section className="forecast">
            <Day forecastData={days[1]} modTimezone={timezone} />
            <Day forecastData={days[2]} modTimezone={timezone} />
            <Day forecastData={days[3]} modTimezone={timezone} />
            <Day forecastData={days[4]} modTimezone={timezone} />
            <Day forecastData={days[5]} modTimezone={timezone} />
            <Day forecastData={days[6]} modTimezone={timezone} />
            <Day forecastData={days[7]} modTimezone={timezone} />
        </section>
    );
};

export default Forecast;