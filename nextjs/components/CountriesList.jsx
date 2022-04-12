import Country from './Country';
import tableStyles from '../styles/Table.module.css';

const CountriesList = ({ countries }) => {
    const columns = ["Name", "Population", "Capital", "Flag"];
    return (
        <table className={tableStyles.table}>
            <thead>
                {columns.map(column => <th key={column.toLowerCase()}>{column}</th>)}
            </thead>
            <tbody>
                {countries.map((country, i) => {
                    return <Country key={i} 
                        name={country.name.common} 
                        href={`/countries/${country.name.common}`}
                        population={country.population} 
                        capital={country?.capital?.join(", ")} 
                        flag={country.flags.png} />
                })}
            </tbody>
        </table>
    )
}

export default CountriesList