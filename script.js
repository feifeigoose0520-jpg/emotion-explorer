const emotionScores = {
    joy: 0,
    trust: 0,
    fear: 0,
    surprise: 0,
    sadness: 0,
    disgust: 0,
    anger: 0,
    anticipation: 0
};

const question1 = {
    question: "Which of these feels closest to what you're reacting to right now?",
    maxChoices: 2,
    answers: [
        {
            choice: "Something feels good or rewarding",
            scores: { joy: 1 }
        },
        {
            choice: "Someone or something feels safe, supportive, or dependable",
            scores: { trust: 1 }
        },
        {
            choice: "Something feels threatening, unsafe, or risky",
            scores: { fear: 1 }
        },
        {
            choice: "Something unexpected happened or changed suddenly",
            scores: { surprise: 1 }
        },
        {
            choice: "Something important feels lost, missing, or disappointing",
            scores: { sadness: 1 }
        },
        {
            choice: "Something feels unpleasant, wrong, or hard to tolerate",
            scores: { disgust: 1 }
        },
        {
            choice: "Something feels unfair, frustrating, or in my way",
            scores: { anger: 1 }
        },
        {
            choice: "I'm focused on something that may happen next",
            scores: { anticipation: 1 }
        },
        {
            choice: "I'm not sure",
            scores: {}
        }
    ]
};


console.log(question1.question);

let index = 1;

for (const answer of question1.answers) {
    console.log(`${index}. ${answer.choice}`);
    index += 1;
}


const questionText = document.getElementById("question-text");
questionText.textContent = question1.question;

const answerContainer = document.getElementById("answer-container");


let selectedAnswers = [];

for (const answer of question1.answers) {
    const button = document.createElement("button");

    button.textContent = answer.choice;

    button.addEventListener("click", function () {

        if (selectedAnswers.includes(answer)) {
            selectedAnswers = selectedAnswers.filter(
                item => item !== answer
            );

            button.classList.remove("selected");
        }

        else if (selectedAnswers.length < question1.maxChoices) {
            selectedAnswers.push(answer);

            button.classList.add("selected");
        }

        console.log(selectedAnswers);
    });

    answerContainer.appendChild(button);
}

const nextButton = document.getElementById("next-button");

nextButton.addEventListener("click", function () {

    for (const answer of selectedAnswers) {
        for (const emotion in answer.scores) {
            emotionScores[emotion] += answer.scores[emotion];
        }
    }

    console.log(emotionScores);
});



