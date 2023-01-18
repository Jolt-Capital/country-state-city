import cityList from './assets/city.json';
import { compare, Hash, localizedHashKey } from './utils';
import { ICity, ICountry } from './interface';

// Get a list of all cities.
function getAllCities(): ICity[] {
	return cityList as ICity[];
}

// Get a list of cities belonging to a specific state and country.
function getCitiesOfState(countryCode: string, stateCode: string): ICity[] {
	if (!stateCode) return [];
	if (!countryCode) return [];

	const cities = getAllCities().filter((value: { countryCode: string; stateCode: string }) => {
		return value.countryCode === countryCode && value.stateCode === stateCode;
	});

	return cities.sort(compare);
}

// Get a list of cities belonging to a specific country.
function getCitiesOfCountry(countryCode: string): ICity[] | undefined {
	if (!countryCode) return [];

	const cities = getAllCities().filter((value: { countryCode: string }) => {
		return value.countryCode === countryCode;
	});
	return cities.sort(compare);
}

const cityMapOfName = new Map<Hash, ICity[]>();
function lookupCity(cityToLookup: ICity['name'], country?: ICountry['isoCode']): ICity[] | undefined {
	if (cityMapOfName.size === 0)
		getAllCities().reduce((accumulator, city) => {
			const hash = localizedHashKey(city.name, city.countryCode);
			if (!hash) return accumulator;

			if (!accumulator.has(hash)) accumulator.set(hash, []);
			accumulator.get(hash)!.push(city);
			return accumulator;
		}, cityMapOfName);

	const cityToLookupHash = localizedHashKey(cityToLookup);
	if (!cityToLookupHash?.length || !cityMapOfName.has(cityToLookupHash)) return undefined;

	return country
		? cityMapOfName.get(cityToLookupHash)?.filter((city) => {
				return city.countryCode === country;
		  })
		: cityMapOfName.get(cityToLookupHash);
}

const City: Partial<ICity> = {
	getAllCities,
	getCitiesOfState,
	getCitiesOfCountry,
	lookupCity,
};
export default City;
