// Get Quote from Api
async function getQuote() {
    const proxy = "https://fast-eyrie-79953.herokuapp.com/";
    const url =
        "https://api.forismatic.com/api/1.0/method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxy + url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error, No Quote"), error;
    }
}

getQuote();
