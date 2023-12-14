import { createHTTPObservable } from "./utils";
import { map, shareReplay } from "rxjs";
import type { Country } from "./types";

// Create Observable
const http$ = createHTTPObservable<Country[]>(
  "https://restcountries.com/v3.1/all"
);

const countries$ = http$.pipe(
  map((res) => res.slice(0, 5)),
  shareReplay({ refCount: true })
);

const europeanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Europe")))
);

const africanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Africa")))
);

/**
[
  'Islamic Republic of Mauritania',
  'State of Eritrea',
  'Commonwealth of Puerto Rico',
  'Romania',
  'Antigua and Barbuda'
]
*/
