// This script is quite convoluted, might rework later
// but it's likely it never needs to be run again
// so I might just not waste time on it and leave it as is


// @ts-nocheck

import { log, timeEnd } from 'console';
import * as fs from 'fs';

let global = {}

// #region --- Data-in ---

// Spring Fish
global.springOcean = [
	{ fish: "aquaculture:atlantic_herring", weight: 16 },
	{ fish: "aquaculture:atlantic_herring", weight: 16, night: true },
	{ fish: "minecraft:pufferfish", weight: 9, night: true, requiresClear: true },
	{ fish: "aquaculture:jellyfish", weight: 9, night: true },
	{ fish: "minecraft:tropical_fish", weight: 8 },
	{ fish: "minecraft:tropical_fish", weight: 8, night: true },
	{ fish: "unusualfishmod:raw_drooping_gourami", weight: 6 },
	{ fish: "aquaculture:atlantic_halibut", weight: 4, requiresRain: true },
	{ fish: "unusualfishmod:raw_spindlefish", weight: 3, night: true },
];
global.springRiver = [
	{ fish: "aquaculture:minnow", weight: 11 },
	{ fish: "aquaculture:bluegill", weight: 11, night: true },
	{ fish: "aquaculture:smallmouth_bass", weight: 9 },
	{ fish: "aquaculture:smallmouth_bass", weight: 9, night: true },
	{ fish: "minecraft:cod", weight: 10 },
	{ fish: "minecraft:cod", weight: 10, night: true },
	{ fish: "aquaculture:pink_salmon", weight: 9, night: true },
	{ fish: "aquaculture:catfish", weight: 8, night: true, requiresRain: true },
	{ fish: "aquaculture:bayad", weight: 5, night: true, requiresRain: true },
	{ fish: "unusualfishmod:raw_blind_sailfin", weight: 5 },
];
global.springFresh = [
	{ fish: "aquaculture:minnow", weight: 11 },
	{ fish: "aquaculture:bluegill", weight: 11, night: true },
	{ fish: "aquaculture:perch", weight: 9 },
	{ fish: "aquaculture:carp", weight: 9, requiresRain: true },
	{ fish: "unusualfishmod:raw_beaked_herring", weight: 8 },
	{ fish: "unusualfishmod:raw_hatchetfish", night: true, weight: 5 },
	{
		fish: "unusualfishmod:raw_eyelash",
		weight: 3,
		night: true,
		requiresClear: true,
	},
];

// Summer fish
global.summerOcean = [
	{ fish: "unusualfishmod:raw_sneep_snorp", weight: 32 },
	{
		fish: "minecraft:pufferfish",
		weight: 30,
		night: true,
		requiresClear: true,
	},
	{ fish: "aquaculture:jellyfish", weight: 24, night: true },
	{ fish: "minecraft:tropical_fish", weight: 22 },
	{ fish: "minecraft:tropical_fish", weight: 22, night: true },
	{ fish: "aquaculture:red_grouper", weight: 19, night: true },
	{ fish: "aquaculture:tuna", weight: 15 },
	{ fish: "aquaculture:capitaine", weight: 10 },
	{ fish: "aquaculture:goldfish", weight: 4, requiresClear: true },
];
global.summerRiver = [
	{ fish: "aquaculture:minnow", weight: 28 },
	{ fish: "aquaculture:bluegill", weight: 28, night: true },
	{ fish: "minecraft:salmon", weight: 25 },
	{ fish: "aquaculture:leech", weight: 23, night: true },
	{ fish: "aquaculture:smallmouth_bass", weight: 22 },
	{ fish: "aquaculture:smallmouth_bass", weight: 22, night: true },
	{ fish: "aquaculture:synodontis", weight: 18, requiresClear: true },
	{ fish: "aquaculture:tambaqui", weight: 18, night: true },
	{
		fish: "aquaculture:box_turtle",
		weight: 5,
		night: true,
		requiresRain: true,
	},
];
global.summerFresh = [
	{ fish: "aquaculture:minnow", weight: 11 },
	{ fish: "aquaculture:bluegill", weight: 11, night: true },
	{ fish: "aquaculture:carp", weight: 9 },
	{ fish: "aquaculture:leech", weight: 9, night: true },
	{ fish: "aquaculture:piranha", weight: 9, night: true, requiresRain: true },
	{ fish: "aquaculture:boulti", weight: 5, night: true },
	{ fish: "crittersandcompanions:koi_fish", weight: 3, requiresClear: true },
	{ fish: "aquaculture:arapaima", weight: 3, requiresRain: true },
	{ fish: "unusualfishmod:raw_circus_fish", weight: 2 },
];

// Autumn Fish
global.autumnOcean = [
	{ fish: "aquaculture:blackfish", weight: 22, night: true },
	{ fish: "aquaculture:blackfish", weight: 22 },
	{
		fish: "minecraft:pufferfish",
		weight: 22,
		night: true,
		requiresClear: true,
	},
	{
		fish: "unusualfishmod:raw_picklefish",
		weight: 22,
		night: true,
		requiresRain: true,
	},
	{ fish: "unusualfishmod:raw_forkfish", weight: 20 },
	{ fish: "unusualfishmod:raw_forkfish", weight: 20, night: true },
	{ fish: "unusualfishmod:raw_sailor_barb", weight: 18 },
	{ fish: "unusualfishmod:raw_demon_herring", weight: 16, night: true },
	{
		fish: "unusualfishmod:raw_copperflame_anthias",
		weight: 11,
		night: true,
		requiresClear: true,
	},
	{ fish: "aquaculture:red_shrooma", weight: 8, requiresRain: true },
];
global.autumnRiver = [
	{ fish: "aquaculture:minnow", weight: 27 },
	{ fish: "aquaculture:bluegill", weight: 27, night: true },
	{ fish: "minecraft:salmon", weight: 26 },
	{ fish: "aquaculture:brown_trout", weight: 26 },
	{ fish: "aquaculture:smallmouth_bass", weight: 24 },
	{ fish: "aquaculture:muskellunge", weight: 18, night: true },
	{
		fish: "aquaculture:arrau_turtle",
		weight: 8,
		night: true,
		requiresRain: true,
	},
];
global.autumnFresh = [
	{ fish: "aquaculture:minnow", weight: 11 },
	{ fish: "aquaculture:bluegill", weight: 11, night: true },
	{ fish: "aquaculture:perch", weight: 9 },
	{ fish: "aquaculture:carp", weight: 10 },
	{ fish: "aquaculture:gar", weight: 5, requiresRain: true },
	{ fish: "unusualfishmod:raw_bark_angelfish", weight: 4 },
	{
		fish: "unusualfishmod:raw_amber_goby",
		weight: 1,
		night: true,
		requiresClear: true,
	},
];

// Winter Fish
global.winterOcean = [
	{ fish: "aquaculture:atlantic_herring", weight: 27 },
	{ fish: "aquaculture:atlantic_herring", weight: 27, night: true },
	{ fish: "aquaculture:blackfish", night: true, weight: 26 },
	{ fish: "aquaculture:blackfish", weight: 26 },
	{ fish: "aquaculture:pollock", weight: 25, requiresRain: true },
	{ fish: "aquaculture:atlantic_cod", weight: 22 },
	{ fish: "unusualfishmod:raw_triple_twirl_pleco", night: true, weight: 20 },
	{
		fish: "unusualfishmod:raw_copperflame_anthias",
		weight: 15,
		night: true,
		requiresClear: true,
	},
	{ fish: "aquaculture:pacific_halibut", weight: 10 },
	{ fish: "aquaculture:brown_shrooma", weight: 8, requiresRain: true },
];
global.winterRiver = [
	{ fish: "aquaculture:minnow", weight: 28 },
	{ fish: "aquaculture:bluegill", weight: 28, night: true },
	{ fish: "minecraft:cod", weight: 27 },
	{ fish: "minecraft:cod", weight: 27, night: true },
	{ fish: "aquaculture:brown_trout", weight: 25 },
	{ fish: "aquaculture:pink_salmon", weight: 22 },
	{
		fish: "unusualfishmod:raw_duality_damselfish",
		weight: 16,
		night: true,
		requiresClear: true,
	},
	{ fish: "aquaculture:rainbow_trout", weight: 10, requiresRain: true },
	{
		fish: "aquaculture:starshell_turtle",
		weight: 8,
		night: true,
		requiresRain: true,
	},
];
global.winterFresh = [
	{ fish: "aquaculture:minnow", weight: 11 },
	{ fish: "aquaculture:bluegill", weight: 11, night: true },
	{ fish: "aquaculture:perch", weight: 9, night: true },
	{ fish: "aquaculture:carp", weight: 8, night: true },
	{ fish: "unusualfishmod:raw_snowflake", weight: 8, requiresRain: true },
	{
		fish: "unusualfishmod:raw_snowflake",
		weight: 8,
		night: true,
		requiresRain: true,
	},
	{ fish: "unusualfishmod:raw_aero_mono", weight: 4 },
	{ fish: "unusualfishmod:raw_hatchetfish", night: true, weight: 2 },
];

// Nether
let nether_fish = {
	"Blazefish": {
		biome: "Any",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Bonefish": {
		biome: "Nether Wastes",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Eyeball Fish": {
		biome: "Crimson Forest",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Fortress Grouper": {
		biome: "Any",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Glowdine": {
		biome: "Warped Forest",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Lava Pufferfish": {
		biome: "Any",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Magma Cube Fish": {
		biome: "Basalt Deltas",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Obsidianfish": {
		biome: "Basalt Deltas",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Searing Cod": {
		biome: "Any",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Soul Sucker": {
		biome: "Soul Sand Valley",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
	"Wither Bonefish": {
		biome: "Soul Sand Valley",
		done: false,
		highlighted: false,
		dim: 'nether',
	},
}

// #endregion


// #region --- Data first pass ---
Object.keys(global).forEach(list => {

	global[list].forEach((elem) => {

		elem.name = elem.fish.split(':')[1]
			.split('_')
			.join(' ')
			.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

	})

});


let data = {
	spring: {
		fresh: global.springFresh,
		ocean: global.springOcean,
		river: global.springRiver
	},
	summer: {
		fresh: global.summerFresh,
		ocean: global.summerOcean,
		river: global.summerRiver
	},
	autumn: {
		fresh: global.autumnFresh,
		ocean: global.autumnOcean,
		river: global.autumnRiver
	},
	winter: {
		fresh: global.winterFresh,
		ocean: global.winterOcean,
		river: global.winterRiver
	},

}

// #endregion



// #region --- Data second pass ---

let fishes = {}


Object.keys(data).forEach(season => {
	Object.keys(data[season]).forEach(water => {

		data[season][water].forEach(fish => {

			// Create fish entry if it doesn't exist
			if (!fishes.hasOwnProperty(fish.name)) {

				fishes[fish.name] = {
					dim: 'overworld',
					done: false,
					highlighted: false,
					seasons: {}
				}

			}

			// Create fish->season entry if it doesn't exist
			if (!fishes[fish.name].seasons.hasOwnProperty(season)) {

				fishes[fish.name].seasons[season] = {}

			}

			// Create fish->season->water entry if it doesn't exist
			if (!fishes[fish.name].seasons[season].hasOwnProperty(water)) {

				fishes[fish.name].seasons[season][water] = {
					time: {
						day: false,
						night: false,
					},
					weather: {
						clear: false,
						rain: false,
					}
				}
				// fishes[fish.name].seasons[season][water] = {
				// 	day: false,
				// 	night: false,
				// 	clear: false,
				// 	rain: false,
				// }
				

			}


			fishes[fish.name].seasons[season][water].time.day ||= !fish.night
			fishes[fish.name].seasons[season][water].time.night ||= fish.night
			fishes[fish.name].seasons[season][water].weather.clear ||= fish.requiresClear
			fishes[fish.name].seasons[season][water].weather.rain ||= fish.requiresRain
			// fishes[fish.name].seasons[season][water].day ||= !fish.night
			// fishes[fish.name].seasons[season][water].night ||= fish.night
			// fishes[fish.name].seasons[season][water].clear ||= fish.requiresClear
			// fishes[fish.name].seasons[season][water].rain ||= fish.requiresRain


		})

	})
})

// #endregion


// #region --- Data third pass ---

Object.keys(fishes).forEach(name => {


    let waters = Object.keys(fishes[name].seasons).map(season => JSON.stringify(Object.keys(fishes[name].seasons[season])) )

	// Check water difference
    const waters_same = [...new Set(waters)].length == 1

    if( !waters_same ) throw new Error('Water difference at ' + name)


    // Water data
    fishes[name].water = JSON.parse(waters[0])
	// Water display text
    fishes[name].water_text = JSON.parse(waters[0]).join(', ')
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());


	// Remove water from per season data
	Object.keys(fishes[name].seasons).forEach(season => {

		const first_water = Object.keys(fishes[name].seasons[season])[0]
		const time_weather = fishes[name].seasons[season][first_water]

		fishes[name].seasons[season] = time_weather
	})



	// Group season data by weather and time matching
	const grouped_season_times = {};
	const grouped_season_weathers = {};

	for (const [season, value] of Object.entries(fishes[name].seasons)) {
		const string_time_val = JSON.stringify(value.time);
		const string_weather_val = JSON.stringify(value.weather);
		
		if (!grouped_season_times[string_time_val]) {
			grouped_season_times[string_time_val] = [];
		}
		grouped_season_times[string_time_val].push(season);

		if (!grouped_season_weathers[string_weather_val]) {
			grouped_season_weathers[string_weather_val] = [];
		}
		grouped_season_weathers[string_weather_val].push(season);
	}

	const times = {};
	const weathers = {};

	for (const [string_val, seasons] of Object.entries(grouped_season_times)) {
		times[seasons.join(", ")] = JSON.parse(string_val);
	}
	for (const [string_val, seasons] of Object.entries(grouped_season_weathers)) {
		weathers[seasons.join(", ")] = JSON.parse(string_val);
	}


	// Ungrouped season data
	fishes[name].season_data = fishes[name].seasons
	// Season list
	fishes[name].seasons = Object.keys(fishes[name].seasons)

	// Season display text
	fishes[name].season_text = 
		fishes[name].seasons.length == 4 ? 
			'🔄 Year-Round' :
			fishes[name].seasons.join(', ')
				.replace('spring', '🌼 Spring')
				.replace('summer', '🔥 Summer')
				.replace('autumn', '🍂 Autumn')
				.replace('winter', '⛄ Winter')


	

	// Time and weather display text
	
	let time_texts = Object.entries(times).map( ([seasons, time]) => {

		let season_time = ''

		// Season time
		if( time.day ) {

			if( time.night ) season_time += 'Any'
			else season_time += 'Day'

		} else season_time += 'Night'


		// Add season indicator if not unambiguous 
		if( Object.keys(times).length > 1 ) {
			season_time += ' (' + seasons + ')'
		}

		return season_time
	})

	let weather_texts = Object.entries(weathers).map( ([seasons, weather]) => {

		let season_weather = ''

		// Season weather
		if( weather.rain ) {
			season_weather += 'Rain'

			if(seasons.includes('winter')) season_weather += '/Snow'
		}
		else {
			if( weather.clear ) season_weather += 'Clear'
			else season_weather += 'Any'
		}

		// Add season indicator if not unambiguous 
		if( Object.keys(weathers).length > 1 ) {
			season_weather += ' (' + seasons + ')'
		}

		return season_weather
	})


	fishes[name].time_text = time_texts.join(', ')
		.replace('spring', '🌼 Spring')
		.replace('summer', '🔥 Summer')
		.replace('autumn', '🍂 Autumn')
		.replace('winter', '⛄ Winter')
	fishes[name].weather_text = weather_texts.join(', ')
		.replace('spring', '🌼 Spring')
		.replace('summer', '🔥 Summer')
		.replace('autumn', '🍂 Autumn')
		.replace('winter', '⛄ Winter')
})


// #endregion









// #region --- Data-out ---

fishes = {...fishes, ...nether_fish}


fs.writeFile(
	'src/assets/data.json',
	JSON.stringify(fishes, undefined, 4),
	'utf8',
	() => console.log('processed')
);

// #endregion