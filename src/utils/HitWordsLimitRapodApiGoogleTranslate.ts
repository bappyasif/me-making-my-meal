export const translateUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2';

export const translateOptions = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
    body: new URLSearchParams({
		q: 'Hello, world!',
		target: 'es',
		source: 'en'
	})
};
// url:string, options: typeof translateOptions
export const translateContent = async () => {
    try {
        const response = await fetch(translateUrl, translateOptions);
        // const result = await response.text();
        const result = await response.json();
        console.log(result, "translate!!");
        return result?.data?.translations[0]
    } catch (error) {
        console.log(error);
    }
}