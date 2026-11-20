
// ===================================
// GENI-DECODE: MAGICAL WORD EXPLORER
// ===================================

let soundEnabled = true;
let currentIsland = 0;
let currentQuestion = 0;
let stars = 0;
let answered = false;

const islandNames = [
    "🔤 Letter Land",
    "🎵 Sound Forest",
    "🏰 Syllable Castle",
    "🌳 Word Adventure"
];

// AUDIO SYSTEM




function speak(text) {
    if (!("speechSynthesis" in window)) {
        alert("Hindi suportado ng browser ang voice instructions.");
        return;
    }

    // Huwag magsalita kapag naka-Audio Off
    if (!soundEnabled) return;

    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    voice.lang = "en-US";
    voice.rate = 0.88;
    voice.pitch = 1.25;
    voice.volume = 0.75;

    const tagalogVoice = voices.find(v =>
        v.lang.toLowerCase().startsWith("fil")
    );

    if (tagalogVoice) {
        voice.voice = tagalogVoice;
    }

    window.speechSynthesis.speak(voice);
}


// PAGE NAVIGATION

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function startAdventure() {

    showPage("map");

    speak(
        "Maligayang pagdating sa Magical Word Explorer! " +
        "Piliin ang unang isla at simulan ang iyong adventure!"
    );
}

function goHome() {
    showPage("home");
}

function goMap() {

    showPage("map");

    document.getElementById("starCount").textContent = stars;

    speak("Pumili ng isla at ipagpatuloy ang iyong paglalakbay!");
}


// ===================================
// QUESTIONS AND ACTIVITIES
// ===================================


const questions = [

    // ISLAND 1: LETTER RECOGNITION
    [
        {
            image: "🔤",
            question: "Alin ang maliit na titik ng A?",
            instruction: "Hanapin ang maliit na titik na kapareha ng malaking titik A.",
            choices: ["a", "b", "d", "e"],
            answer: "a"
        },
        {
            image: "🐝",
            question: "Alin ang malaking titik na kapareha ng b?",
            instruction: "Tukuyin ang malaking titik na kapareha ng maliit na titik b.",
            choices: ["D", "B", "P", "R"],
            answer: "B"
        },
        {
            image: "🌈",
            question: "Ano ang nawawalang letra? A, B, __, D",
            instruction: "Sabihin ang mga letra sa tamang pagkakasunod-sunod. Alin ang nawawala?",
            choices: ["C", "E", "F", "G"],
            answer: "C"
        },
        {
            image: "⭐",
            question: "Alin ang maliit na titik na kapareha ng M?",
            instruction: "Hanapin ang maliit na titik na kapareha ng malaking titik M.",
            choices: ["n", "m", "w", "u"],
            answer: "m"
        },
        {
            image: "📚",
            question: "Alin ang malaking titik sa pangkat?",
            instruction: "Tatlo ang maliliit na titik at isa ang malaking titik. Hanapin ang malaking titik.",
            choices: ["a", "e", "G", "i"],
            answer: "G"
        }
    ],

    // ISLAND 2: LETTER-SOUND RECOGNITION
    [
        {
            image: "👩‍👦",
            question: "Pakinggan ang tunog: Mmmm. Anong letra ito?",
            instruction: "Pakinggan ang tunog at piliin ang letrang kumakatawan dito.",
            audioText: "Mmmm. Mmmm. Mmmm.",
            choices: ["M", "S", "B", "T"],
            answer: "M"
        },
        {
            image: "🐟",
            question: "Ano ang unang tunog ng salitang ISDA?",
            instruction: "Pakinggan ang salita. Tukuyin ang unang tunog nito.",
            audioText: "Isda. Isda.",
            choices: ["A", "I", "O", "U"],
            answer: "I"
        },
        {
            image: "🍌",
            question: "Anong letra ang maririnig sa simula ng SAGING?",
            instruction: "Pakinggan ang unang tunog ng salita at piliin ang tamang letra.",
            audioText: "Ssss. Saging.",
            choices: ["M", "S", "K", "P"],
            answer: "S"
        },
        {
            image: "🐸",
            question: "Ano ang unang tunog ng salitang PALAKA?",
            instruction: "Pakinggan ang salita. Piliin ang letrang kumakatawan sa unang tunog nito.",
            audioText: "Palaka. Palaka.",
            choices: ["P", "T", "K", "L"],
            answer: "P"
        },
        {
            image: "🏠",
            question: "Anong letra ang may tunog na /b/ tulad sa BAHAY?",
            instruction: "Pakinggan ang salita at pansinin ang tunog sa simula nito.",
            audioText: "Bbbb. Bahay.",
            choices: ["B", "M", "S", "L"],
            answer: "B"
        }
    ],

    // ISLAND 3: SYLLABLE BLENDING
    [
        {
            image: "🧒",
            question: "Pagsamahin ang mga pantig: BA + TA = ?",
            instruction: "Bigkasin ang BA at TA. Pagsamahin ang mga pantig upang makabuo ng salita.",
            choices: ["BATA", "BASA", "BATO", "BASAAN"],
            answer: "BATA"
        },
        {
            image: "👀",
            question: "Pagsamahin ang mga pantig: MA + TA = ?",
            instruction: "Basahin ang MA at TA. Ano ang salitang mabubuo?",
            choices: ["MATA", "MAMA", "MESA", "MULA"],
            answer: "MATA"
        },
        {
            image: "❤️",
            question: "Pagsamahin ang mga pantig: PU + SO = ?",
            instruction: "Bigkasin ang PU at SO. Pagsamahin ang dalawang pantig.",
            choices: ["PUSA", "PUSO", "PUSI", "PUSOAN"],
            answer: "PUSO"
        },
        {
            image: "🪁",
            question: "Anong salita ang mabubuo sa LA + RO?",
            instruction: "Basahin ang dalawang pantig at pagsamahin ang mga ito.",
            choices: ["LARO", "LALA", "LANA", "LIRA"],
            answer: "LARO"
        },
        {
            image: "😊",
            question: "Pagsamahin ang mga pantig: SA + YA = ?",
            instruction: "Bigkasin ang SA at YA. Aling salita ang mabubuo?",
            choices: ["SAYA", "SAPA", "SAMA", "SALA"],
            answer: "SAYA"
        }
    ],

    // ISLAND 4: WORD DECODING AND READING
    [
        {
            image: "🐱",
            question: "Basahin ang salita. Alin ang larawan ng PUSA?",
            instruction: "Pakinggan ang salita. Piliin ang larawan na tumutugma rito.",
            audioText: "Pusa.",
            choices: ["🐶 ASO", "🐱 PUSA", "🐟 ISDA", "🐦 IBON"],
            answer: "🐱 PUSA"
        },
        {
            image: "☀️",
            question: "Ayusin ang mga letra: A - R - A - W",
            instruction: "Ayusin ang mga letra upang mabuo ang pangalan ng nasa larawan.",
            choices: ["ARAW", "AWAR", "RAWA", "WARA"],
            answer: "ARAW"
        },
        {
            image: "👀",
            question: "Alin sa mga salita ang nagsisimula sa letrang M?",
            instruction: "Basahin ang bawat salita. Piliin ang nagsisimula sa letrang M.",
            choices: ["Saging", "Mata", "Bata", "Pusa"],
            answer: "Mata"
        },
        {
            image: "🐟",
            question: "Aling salita ang tumutukoy sa hayop na may kaliskis at nakatira sa tubig?",
            instruction: "Basahin ang mga pagpipilian at piliin ang tamang salita.",
            choices: ["IBON", "ASO", "ISDA", "PUSA"],
            answer: "ISDA"
        },
        {
            image: "🔡",
            question: "Basahin ang bagong pagsasanay na salita: MIP.",
            instruction: "Bigkasin ang tunog ng M, I, at P. Pagsamahin ang mga tunog upang mabuo ang MIP. Ito ay salitang pagsasanay, hindi karaniwang salitang Filipino.",
            audioText: "Mmmm. Iiii. Puh. MIP.",
            choices: ["MIP", "MAP", "PIM", "SIM"],
            answer: "MIP"
        },
        {
            image: "📖",
            question: "Basahin ang salita: BATA. Aling pangungusap ang gumagamit nito nang tama?",
            instruction: "Basahin ang bawat pangungusap at piliin ang may wastong gamit ng salitang BATA.",
            choices: [
                "Ang bata ay nagbabasa.",
                "Ang bata ay lumilipad.",
                "Ang bata ay isang isda.",
                "Ang bata ay isang puno."
            ],
            answer: "Ang bata ay nagbabasa."
        }
    ]
];



// ===================================
// ACTIVITY FUNCTIONS
// ===================================

function loadQuestion() {

    answered = false;

    const q = questions[currentIsland][currentQuestion];

    

    document.getElementById("questionText").textContent = q.question;
    document.getElementById("questionNumber").textContent =
        "CHALLENGE " + (currentQuestion + 1);

    document.getElementById("questionProgress").textContent =
        "Tanong " + (currentQuestion + 1) +
        " sa " + questions[currentIsland].length;

    document.getElementById("questionImage").textContent = q.image;
    
    document.getElementById("guideText").textContent = q.instruction;

    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
    feedback.className = "feedback";

    const nextButton = document.getElementById("nextButton");
    nextButton.classList.add("hidden");

    // AUDIO
   const audioArea = document.getElementById("audioQuestion");
audioArea.innerHTML = "";

if (currentIsland === 1 && q.audioText) {
    const soundText = document.createElement("p");
    soundText.textContent = q.audioText;
    soundText.className = "sound-text";
    audioArea.appendChild(soundText);
}

    if (q.audioText) {
        const audioButton = document.createElement("button");
        audioButton.className = "audio-button";
        audioButton.textContent = "🔊 PAKINGGAN MULI";

        audioButton.onclick = function () {
            speak(q.audioText);
        };

        audioArea.appendChild(audioButton);

        if (currentIsland === 1) {
            setTimeout(function () {
                speak(q.audioText);
            }, 500);
        }
    }

    // ANSWER CHOICES
    const choicesArea = document.getElementById("choices");
    choicesArea.innerHTML = "";

    let choices = [...q.choices];

    if (currentIsland === 1) {
        choices.sort(() => Math.random() - 0.5);
    }

    choices.forEach(function (choice) {
        const button = document.createElement("button");

        button.className = "choice-button";
        button.textContent = choice;

        button.onclick = function () {
            checkAnswer(choice, button);
        };

        choicesArea.appendChild(button);
    });

    if (currentIsland !== 1) {
        speak(q.instruction);
    }
}



function openActivity(island) {

    currentIsland = island;
    currentQuestion = 0;

    showPage("activity");

    const miraLetterLandAudio = document.getElementById("miraLetterLandAudio");
    const miraSoundForestAudio = document.getElementById("miraSoundForestAudio");

    if (island === 0 && miraLetterLandAudio && soundEnabled) {
        miraLetterLandAudio.pause();
        miraLetterLandAudio.currentTime = 0;

        setTimeout(() => {
            miraLetterLandAudio.play().catch(error => {
                console.log("Letter Land audio error:", error);
            });
        }, 300);
    }

    if (island === 1 && miraSoundForestAudio && soundEnabled) {
        miraSoundForestAudio.pause();
        miraSoundForestAudio.currentTime = 0;

        setTimeout(() => {
            miraSoundForestAudio.play().catch(error => {
                console.log("Sound Forest audio error:", error);
            });
        }, 300);
    }

    document.getElementById("islandName").textContent =
        islandNames[island];

    loadQuestion();
}


// CHECK ANSWER

function checkAnswer(choice, selectedButton) {

    if (answered) return;

    answered = true;

    const q = questions[currentIsland][currentQuestion];

    const feedback = document.getElementById("feedback");

    const buttons = document.querySelectorAll(".choice-button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (choice === q.answer) {

        selectedButton.classList.add("correct");

        stars++;

        feedback.textContent =
            "🌟 Mahusay! Tama ang iyong sagot!";

        feedback.classList.add("correct-text");

        speak("Mahusay! Tama ang iyong sagot! Ipagpatuloy mo!");

    } else {

        selectedButton.classList.add("wrong");

        buttons.forEach(button => {

            if (button.textContent === q.answer) {
                button.classList.add("correct");
            }

        });

        feedback.textContent =
            "Ayos lang! Subukan mong matuto muli sa susunod!";

        feedback.classList.add("wrong-text");

        speak("Ayos lang! Huwag susuko. Matuto tayo muli!");

    }

    document.getElementById("starCount").textContent = stars;

    const nextButton = document.getElementById("nextButton");

    nextButton.classList.remove("hidden");

    if (currentQuestion === questions[currentIsland].length - 1) {

        nextButton.textContent = "TAPUSIN ANG ISLA 🏆";

    } else {

        nextButton.textContent = "SUSUNOD →";

    }
}


// NEXT QUESTION

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions[currentIsland].length) {

        loadQuestion();

    } else {

        finishIsland();

    }
}


// FINISH ISLAND

function finishIsland() {

    showPage("map");

    document.getElementById("starCount").textContent = stars;

    speak(
        "Congratulations! Natapos mo ang " +
        islandNames[currentIsland] +
        "! Magaling, little explorer!"
    );

    if (currentIsland === 3) {

        setTimeout(() => {

            document.getElementById("finalStars").textContent =
                "⭐ " + stars + " Stars";

            showPage("complete");

            speakCongratulations();

        }, 1500);

    }

}


// LOAD AVAILABLE VOICES

if ("speechSynthesis" in window) {

    window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.getVoices();
    };

}

// ===================================
// GENI-DECODE AUDIO CONTROLS
// ===================================

// TURN AUDIO ON OR OFF
function toggleSound() {
    soundEnabled = !soundEnabled;

    const soundButton = document.querySelector(".sound-toggle");

    if (soundEnabled) {
        soundButton.textContent = "🔊 Audio On";
    } else {
        soundButton.textContent = "🔇 Audio Off";
        window.speechSynthesis.cancel();
    }
}


// WELCOME VOICE
function speakWelcome() {
    const miraAudio = document.getElementById("miraWelcomeAudio");

    if (miraAudio && soundEnabled) {
        window.speechSynthesis.cancel();
        miraAudio.currentTime = 0;
        miraAudio.play();
    }
}


// REPEAT ACTIVITY INSTRUCTION



function repeatInstruction() {

    const letterAudio = document.getElementById("miraLetterLandAudio");
    const soundAudio = document.getElementById("miraSoundForestAudio");

    // Stop all island introduction audios
    if (letterAudio) {
        letterAudio.pause();
        letterAudio.currentTime = 0;
    }

    if (soundAudio) {
        soundAudio.pause();
        soundAudio.currentTime = 0;
    }

    // Stop any previous browser speech
    window.speechSynthesis.cancel();

    // Read the current question instruction
    const q = questions[currentIsland][currentQuestion];

    if (q && soundEnabled) {
        speak(q.instruction);
    }
}




// CONGRATULATIONS VOICE
function speakCongratulations() {
    speak(
        "Mahusay, little explorer! " +
        "Natapos mo ang iyong mahiwagang paglalakbay! " +
        "Ipagpatuloy mo ang pagbabasa at pagkatuto. " +
        "I am proud of you!"
    );
}
