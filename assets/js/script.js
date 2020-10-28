const quoteBox = document.getElementById("quote-box");
const quoteAuthor = document.getElementById("author-name");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get Quote from Api
async function getQuote() {
    const proxy = "https://fast-eyrie-79953.herokuapp.com/";
    const url =
        "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxy + url);
        const data = await response.json();

        quoteAuthor.innerText = data.quoteAuthor;

        if (!quoteAuthor.innerText) {
            quoteAuthor.innerText = "Someone";
        }

        quoteText.innerText = data.quoteText;
        console.log(data);
    } catch (error) {
        getQuote();
        console.log("Error, No Quote"), error;
    }
}

getQuote();
