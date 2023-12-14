type SplitToChars<S extends string> = S extends `${infer F}${infer R}`
  ? F | SplitToChars<R>
  : never;

type Continent =
  | "Africa"
  | "Asia"
  | "North America"
  | "South America"
  | "Europe"
  | "Antarctica"
  | "Oceania";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type CapitalLetter = SplitToChars<"ABCDEFGHIJKLMNOPQRSTUVWXYZ">;
type LowerCaseLetter = SplitToChars<"abcdefghijklmnopqrstuvwxyz">;

type ThreeDigitAllCapsAcronym =
  `${CapitalLetter}${CapitalLetter}${CapitalLetter}`;

type TimeZoneHour =
  | "00"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14";

type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface NameSub {
  common: string;
  official: string;
}

type Suffix =
  | `${Digit}`
  | `${Digit}${Digit}`
  | `${Digit}${Digit}${Digit}`
  | `${Digit}${Digit}${Digit}${Digit}`;

type UTCTimeZone =
  | `UTC+${TimeZoneHour}:00`
  | `UTC-${TimeZoneHour}:00`
  | `UTC+${TimeZoneHour}:30`
  | `UTC-${TimeZoneHour}:30`
  | `UTC+${TimeZoneHour}:45`
  | `UTC-${TimeZoneHour}:45`;

interface IDD {
  root: `+${Digit}` | `+${Digit}${Digit}` | `+${Digit}${Digit}${Digit}`;
  suffixes: Suffix[];
}

interface Name extends NameSub {
  nativeName: Record<string, Name>;
}

interface Currency {
  name: string;
  symbol: string;
}

interface PostalCode {
  format: string;
  regex: string;
}

export interface Country {
  [k: string]: any;
  name: Name;
  status: string;
  continents: Continent[];
  timezones: UTCTimeZone[];
  region: Continent;
  subregion: string;
  languages: Record<string, string>;
  translations: Record<string, NameSub>;
  independent: boolean;
  unMember: boolean;
  landlocked: boolean;
  borders: ThreeDigitAllCapsAcronym[];
  population: number;
  currencies: Record<ThreeDigitAllCapsAcronym, Currency>;
  capital?: string[];
  altSpellings: string[];
  latlng: [number, number];
  area: number;
  idd: IDD;
  tld: string[];
  startOfWeek: DayOfWeek;
  postalCode: PostalCode;
  flags: {
    png: `https://${string}.png`;
    svg: `https://${string}.svg`;
    alt?: string;
  };
  coatOfArms: {
    png: `https://${string}.png`;
    svg: `https://${string}.svg`;
  };
  maps: {
    googleMaps: `https://goo.gl/maps/${string}`;
    openStreetMaps: `https://www.openstreetmap.org/${string}`;
  };
  fifa: ThreeDigitAllCapsAcronym;
}
