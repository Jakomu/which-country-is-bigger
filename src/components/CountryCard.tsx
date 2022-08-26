import { Country } from "../interfaces";

interface CountryProps {
  info: Country | null;
}

const CountryCard = ({ info }: CountryProps) => {
  if (info) {
    return (
      <div>
        <h2>{info.name}</h2>
        <p>Population: {info.population}</p>
        <img src={info.flag} alt="flag"></img>
      </div>
    );
  } else return <div></div>;
};

export default CountryCard;
