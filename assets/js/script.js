const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author-name");

const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");

let errorCount = 0;

function showLoading() {
    loader.hidden = false;
    quoteBox.hidden = true;
}

function hideLoading(params) {
    loader.hidden = true;
    quoteBox.hidden = false;
}
// Get Quote from Api
async function getQuote() {
    // break recursion to not go into infinite loop if error occurs
    if (errorCount > 10) {
        return;
    }

    showLoading();
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
        hideLoading();
    } catch (error) {
        errorCount++;
        console.log("Error!"), error;
        getQuote();
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
