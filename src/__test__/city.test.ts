/* eslint-disable no-shadow */
import { City, ICity, ICountry, IState } from '../index';

function expectedParis(cities: ICity[] | undefined) {
	expect(cities).toBeDefined();
	expect(cities!.length).toBeGreaterThan(0);
	const parisFR = cities!.find((city) => {
		return city.countryCode === 'FR';
	});
	expect(parisFR).toBeDefined();
	expect(parisFR!.countryCode).toEqual('FR');
	expect(parisFR!.name).toEqual('Paris');
	expect(parisFR!.stateCode).toEqual('IDF');
}

function expectedThessaloniki(cities: ICity[] | undefined) {
	expect(cities).toBeDefined();
	expect(cities!.length).toBeGreaterThan(0);
	const thessalonikiGR = cities!.find((city) => {
		return city.countryCode === 'GR';
	});
	expect(thessalonikiGR).toBeDefined();
	expect(thessalonikiGR!.countryCode).toEqual('GR');
	expect(thessalonikiGR!.name).toEqual('Thessaloníki');
	expect(thessalonikiGR!.stateCode).toEqual('B');
}

const executeAllTests = (City: Partial<ICity>) => {
	describe('Check for City Module', () => {
		test('Check Cities for Delhi', () => {
			const countryCode = 'IN';
			const stateCode = 'DL';
			const cities = City.getCitiesOfState!(countryCode, stateCode);
			const names = cities.map((city: ICity) => {
				return city.name;
			});
			expect(names).toEqual([
				'Alipur',
				'Bawana',
				'Central Delhi',
				'Delhi',
				'Deoli',
				'East Delhi',
				'Karol Bagh',
				'Najafgarh',
				'Nangloi Jat',
				'Narela',
				'New Delhi',
				'North Delhi',
				'North East Delhi',
				'North West Delhi',
				'Pitampura',
				'Rohini',
				'South Delhi',
				'South West Delhi',
				'West Delhi',
			]);
		});

		test('Check Cities for undefined Country', () => {
			let countryCode: ICountry['isoCode'];
			const stateCode = 'DL';
			const cities = City.getCitiesOfState!(countryCode!, stateCode);

			expect(cities.length).toEqual(0);
		});

		test('Check Cities for undefined State', () => {
			const countryCode = 'IN';
			let stateCode: IState['isoCode'];
			const cities = City.getCitiesOfState!(countryCode, stateCode!);
			expect(cities.length).toEqual(0);
		});

		test('Lookup for exact match', () => {
			const cities = City.lookupCity!('Paris');
			expectedParis(cities);
		});

		test('Lookup for ignore cases', () => {
			const cities = City.lookupCity!('PARIS');
			expectedParis(cities);
		});

		test('Lookup for within Country', () => {
			const cities = City.lookupCity!('Paris', 'FR');
			expect(cities?.length).toEqual(1);
			expectedParis(cities);
		});

		test('Lookup for ignore diacritics', () => {
			const cities = City.lookupCity!('Thessaloniki');
			expect(cities?.length).toEqual(1);
			expectedThessaloniki(cities);
		});

		test('Lookup for transliteration', () => {
			const cities = City.lookupCity!('Θεσσαλονίκη');
			expect(cities?.length).toEqual(1);
			expectedThessaloniki(cities);
		});
	});
};
export default executeAllTests;
executeAllTests(City);
