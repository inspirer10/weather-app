const Input = ({checkForm, cityName}) => {
    return (
        <section className="city-input">
            <form onSubmit={checkForm}>
                <div className='input-wrap'>
                    <input type="text" name="name" placeholder='Wpisz nazwę miasta!' onChange={cityName} />
                    <button type="submit" className="wi wi-solar-eclipse"></button>
                </div>
                <p className='error-msg'></p>
            </form>
        </section>
    );
};

export default Input;