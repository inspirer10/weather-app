import Icons from './Icons'

const Day = ({forecastData, modTimezone}) => {

    if (!forecastData) {
        return <></>
    };

    const data = forecastData;
    const timezone = modTimezone;
    const day = data.dt;
    const min = Math.round(data.temp.min);
    const max = Math.round(data.temp.max);
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    const date = x => {
        const d = new Date((x * 1000) + (timezone * 1000));
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']

        const day = days[d.getDay()];
        const time = `${day}`;
        return time;
    };

    return (
        <div className='day hide display'>
            <h4>
                {date(day)}
            </h4>
            <Icons iconInfo={icon} />
            <p><span>{max}°C</span> <span>{min}°C</span></p>
            <p className="description">{description}</p>
        </div>
    );
};

export default Day;