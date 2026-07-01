const textInput =
document.getElementById("text-input");

const analyzeBtn =
document.getElementById("analyze-btn");

const copyBtn =
document.getElementById("copy-btn");

const downloadBtn =
document.getElementById("download-btn");

const removeSpaceBtn =
document.getElementById("remove-space-btn");

const clearBtn =
document.getElementById("clear-btn");

const charCount =
document.getElementById("char-count");

const wordCount =
document.getElementById("word-count");

const sentenceCount =
document.getElementById("sentence-count");

const paragraphCount =
document.getElementById("paragraph-count");

const readingTime =
document.getElementById("reading-time");

const speakingTime =
document.getElementById("speaking-time");

const longestWord =
document.getElementById("longest-word");

const averageWord =
document.getElementById("average-word");

const numberCount =
document.getElementById("number-count");

const specialCount =
document.getElementById("special-count");

const sentimentResult =
document.getElementById("sentiment-result");

const sentimentScore =
document.getElementById("sentiment-score");

const positiveWords = [

"good",
"great",
"excellent",
"happy",
"love",
"awesome",
"best",
"strong",
"smart",
"fantastic",
"amazing",
"brilliant",
"success",
"positive",
"wonderful"

];

const negativeWords = [

"bad",
"poor",
"hate",
"worst",
"sad",
"error",
"fail",
"weak",
"broken",
"negative",
"problem",
"angry",
"terrible",
"awful",
"loss"

];

function updateSentiment(text,state,score){

    sentimentResult.textContent = text;

    sentimentResult.className =
    "value " + state;

    sentimentScore.textContent =
    score;

}

function calculateReadingTime(words){

    return (words / 200).toFixed(1);

}

function calculateSpeakingTime(words){

    return (words / 130).toFixed(1);

}

function findLongestWord(words){

    let longest = "-";

    words.forEach(function(word){

        if(word.length > longest.length){

            longest = word;

        }

    });

    return longest;

}

function averageLength(words){

    if(words.length===0){

        return "0";

    }

    let total = 0;

    words.forEach(function(word){

        total += word.length;

    });

    return (total / words.length).toFixed(1);

}
function analyzeText(){

    const text =
    textInput.value;

    charCount.textContent =
    text.length;

    const clean =
    text.trim();

    if(clean===""){

        wordCount.textContent="0";

        sentenceCount.textContent="0";

        paragraphCount.textContent="0";

        readingTime.textContent="0 min";

        speakingTime.textContent="0 min";

        longestWord.textContent="-";

        averageWord.textContent="0";

        numberCount.textContent="0";

        specialCount.textContent="0";

        updateSentiment(
            "😐 Neutral",
            "neutral",
            0
        );

        return;

    }

    const words =
    clean.split(/\s+/);

    wordCount.textContent =
    words.length;

    const sentences =
    clean.match(/[.!?]+/g);

    sentenceCount.textContent =
    sentences ? sentences.length : 1;

    const paragraphs =
    clean.split(/\n+/);

    paragraphCount.textContent =
    paragraphs.length;

    readingTime.textContent =
    calculateReadingTime(words.length)
    + " min";

    speakingTime.textContent =
    calculateSpeakingTime(words.length)
    + " min";

    longestWord.textContent =
    findLongestWord(words);

    averageWord.textContent =
    averageLength(words);

    const numbers =
    text.match(/[0-9]/g);

    numberCount.textContent =
    numbers ? numbers.length : 0;

    const special =
    text.match(/[^a-zA-Z0-9\s]/g);

    specialCount.textContent =
    special ? special.length : 0;

    let score = 0;

    words.forEach(function(word){

        const item =
        word
        .toLowerCase()
        .replace(/[^a-z]/g,"");

        if(
            positiveWords.includes(item)
        ){

            score++;

        }

        else if(
            negativeWords.includes(item)
        ){

            score--;

        }

    });

    if(score>0){

        updateSentiment(

            "😊 Positive",

            "positive",

            score

        );

    }

    else if(score<0){

        updateSentiment(

            "😞 Negative",

            "negative",

            score

        );

    }

    else{

        updateSentiment(

            "😐 Neutral",

            "neutral",

            score

        );

    }

}
function copyText(){

    if(textInput.value.trim()===""){

        alert("Please enter some text first.");

        return;

    }

    navigator.clipboard.writeText(
        textInput.value
    );

    alert("Text copied successfully.");

}

function downloadReport(){

    if(textInput.value.trim()===""){

        alert("Please analyze some text first.");

        return;

    }

    const report =

`NeuroText Analytics Report

--------------------------------

Characters : ${charCount.textContent}

Words : ${wordCount.textContent}

Sentences : ${sentenceCount.textContent}

Paragraphs : ${paragraphCount.textContent}

Reading Time : ${readingTime.textContent}

Speaking Time : ${speakingTime.textContent}

Longest Word : ${longestWord.textContent}

Average Word Length : ${averageWord.textContent}

Numbers : ${numberCount.textContent}

Special Characters : ${specialCount.textContent}

Sentiment : ${sentimentResult.textContent}

Sentiment Score : ${sentimentScore.textContent}

--------------------------------

Generated using NeuroText Analytics
`;

    const file = new Blob(

        [report],

        {

            type:"text/plain"

        }

    );

    const link =

    document.createElement("a");

    link.href =

    URL.createObjectURL(file);

    link.download =

    "NeuroText_Report.txt";

    link.click();

}

function removeExtraSpaces(){

    textInput.value =

    textInput.value

    .replace(/\s+/g," ")

    .trim();

    analyzeText();

}

function clearWorkspace(){

    textInput.value="";

    charCount.textContent="0";

    wordCount.textContent="0";

    sentenceCount.textContent="0";

    paragraphCount.textContent="0";

    readingTime.textContent="0 min";

    speakingTime.textContent="0 min";

    longestWord.textContent="-";

    averageWord.textContent="0";

    numberCount.textContent="0";

    specialCount.textContent="0";

    updateSentiment(

        "😐 Neutral",

        "neutral",

        0

    );

}

analyzeBtn.addEventListener(

    "click",

    analyzeText

);

copyBtn.addEventListener(

    "click",

    copyText

);

downloadBtn.addEventListener(

    "click",

    downloadReport

);

removeSpaceBtn.addEventListener(

    "click",

    removeExtraSpaces

);

clearBtn.addEventListener(

    "click",

    clearWorkspace

);

textInput.addEventListener(

    "input",

    analyzeText

);