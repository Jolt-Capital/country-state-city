import { transliterate } from 'transliteration';
import { ICountry } from '../interface';

export const findEntryByCode = (source: any, code: string) => {
	if (code && source != null) {
		const codex = source.findIndex((c: any) => {
			return c.isoCode === code;
		});
		return codex !== -1 ? source[codex] : undefined;
	}
	return undefined;
};

export const findStateByCodeAndCountryCode = (source: any, code: string, countryCode: string) => {
	if (code && countryCode && source != null) {
		const codex = source.findIndex((c: any) => {
			return c.isoCode === code && c.countryCode === countryCode;
		});
		return codex !== -1 ? source[codex] : undefined;
	}
	return undefined;
};

export const compare = (a: any, b: any) => {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	return 0;
};

function _removeDiacritics(str: string): string | undefined {
	if (!str?.length) return undefined;

	return str.normalize('NFD').replace(/\p{M}/gu, '');
}

export type Hash = string;
export function localizedHashKey(s: string, country?: ICountry['isoCode']): Hash | undefined {
	const transliteration = transliterate(s);
	const withoutDiacritics = transliteration ? _removeDiacritics(transliteration) : undefined;

	const locales: string | string[] = country ? ['US', country] : 'US'; // add US as default locale...
	const result = withoutDiacritics
		? withoutDiacritics
				.toLocaleLowerCase(locales)
				.replace(/[^\p{L}]/gu, '')
				.replace(/\s+/g, ' ')
				.trim()
		: undefined;

	return result?.length ? result : undefined;
}
