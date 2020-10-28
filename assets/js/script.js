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
        quoteText.innerText = data.quoteText;

        // if author is empty set it to 'Someone'
        if (!quoteAuthor.innerText) {
            quoteAuthor.innerText = "Someone";
        }
        // if quote is long transform it into a lower font-size
        if (quoteText.innerText.length > 100) {
            quoteText.classList.add("quote-be-smaller");
        } else {
            quoteText.classList.remove("quote-be-smaller");
        }
    } catch (error) {
        getQuote();
        console.log("Error, No Quote"), error;
    }
}

function TweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const url = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(url, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", TweetQuote);

getQuote();
