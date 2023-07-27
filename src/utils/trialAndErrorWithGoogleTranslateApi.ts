// import { translate } from '@vitalets/google-translate-api';

// export const translateContent = async () => {

// // const { text } = await translate('Привет, мир! Как дела?', { to: 'en' });
// const resp = await translate('Привет, мир! Как дела?', { to: 'en' })

// const text = resp.text

// console.log(text) // => 'Hello World! How are you?'

// }

// const { text } = await translate('Привет, мир! Как дела?', { to: 'en' });

// console.log(text) // => 'Hello World! How are you?'


// import translate from 'translate-google-api';
// const result = await translate(`I'm fine.`, {
//   tld: "cn",
//   to: "vi",
// });


// Or of course
// import translate from 'google-translate-api-x';
// Or deconstruct all the exposed variables as
// import { translate, Translator, speak } from 'google-translate-api-x';

// export const translateContent = async (qStr:string) => {
//     const res = await translate(qStr, {to: 'bn'});

//     console.log(res.text); //=> I speak English
//     console.log(res.from.language.iso);  //=> nl 
// }

// const res = await translate('Ik spreek Engels', {to: 'en'});

// console.log(res.text); //=> I speak English
// console.log(res.from.language.iso);  //=> nl


// import translate from 'google-translate-api';

// import { setCORS } from "google-translate-api-browser";
// // setting up cors-anywhere server address
// const translate = setCORS("http://cors-anywhere.herokuapp.com/");
// /*
// // or
// import translate, { setCORS } from "google-translate-api-browser";
// setCORS("http://cors-anywhere.herokuapp.com/");
// */
// translate("Je ne mangé pas six jours", { to: "en" })
//   .then(res => {
//     // I do not eat six days
//     console.log(res.text)
//   })
//   .catch(err => {
//     console.error(err);
//   });

// export const translateContent = (str, updater) => {
//     translate(str, {from: 'en', to: 'bn'}).then((res) => {
//         console.log(res.text);
//         //=> I speak English
//         console.log(res.from.language.iso);
//         //=> nl
//     }).catch((err) => {
//         console.error(err);
//     });
// }

// export const translateContent = (str: string, updater: (data:string) => void) => {
//     translate(str, {from: 'en', to: 'bn'}).then((res:any) => {
//         console.log(res.text);
//         //=> I speak English
//         console.log(res.from.language.iso);
//         //=> nl
//     }).catch((err:any) => {
//         console.error(err);
//     });
// }