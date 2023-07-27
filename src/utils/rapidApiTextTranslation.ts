// const url = 'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=%3CREQUIRED%3E&api-version=3.0&profanityAction=NoAction&textType=plain';
// export const translateOptions = {
//     method: 'POST',
//     headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524',
//         'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
//     },
//     body: new URLSearchParams({
// 		q: 'Hello, world!',
// 		target: 'es',
// 		source: 'en'
// 	})
// };

// const translateOptions = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'X-RapidAPI-Key': '16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524',
// 		'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
// 	},
// 	body: new URLSearchParams({
// 		Text: 'I would really like to drive your car around the block a few times.',
// 		target: 'es',
// 		source: 'en'
// 	})
// 	// body: [
// 	// 	{
// 	// 		Text: 'I would really like to drive your car around the block a few times.'
// 	// 	}
// 	// ]
// };


const url = 'https://text-translator2.p.rapidapi.com/translate';
export const translateOptions = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
		'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
	},
	body: new URLSearchParams({
		source_language: 'en',
		target_language: 'id',
		text: 'What is your name?'
	})
};

export const translateContent = async () => {
    try {
        const response = await fetch(url, translateOptions);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }
}