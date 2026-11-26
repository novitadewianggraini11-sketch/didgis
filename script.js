
// ===================================
// MENU NAVIGASI
// ===================================

function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
}

// Menutup menu setelah link diklik
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navMenu").classList.remove("show");
    });
});

// ===================================
// DATA PERTANYAAN KUIS
// ===================================

const questions = [
    {
        question: "Apa salah satu dampak negatif perkembangan informatika?",
        options: [
            "Mempermudah komunikasi",
            "Kecanduan gadget",
            "Mempercepat pekerjaan",
            "Memudahkan pembelajaran"
        ],
        answer: 1
    },
    {
        question: "Bagaimana cara menghindari berita hoaks?",
        options: [
            "Langsung membagikan berita",
            "Mempercayai semua informasi",
            "Memeriksa sumber informasi",
            "Mengabaikan kebenaran berita"
        ],
        answer: 2
    },
    {
        question: "Apa cara melindungi data pribadi?",
        options: [
            "Membagikan password",
            "Menggunakan password yang kuat",
            "Memberikan kode OTP kepada orang lain",
            "Menggunakan password yang mudah"
        ],
        answer: 1
    },
    {
        question: "Apa yang harus dilakukan ketika mengalami cyberbullying?",
        options: [
            "Membalas dengan hinaan",
            "Menyebarkan identitas pelaku",
            "Membiarkannya saja",
            "Menyimpan bukti dan melaporkan"
        ],
        answer: 3
    },
    {
        question: "Bagaimana cara menggunakan AI secara bijak?",
        options: [
            "Mempercayai semua hasil AI",
            "Menggunakan AI untuk menyontek",
            "Memeriksa kembali hasil AI",
            "Memberikan seluruh data pribadi"
        ],
        answer: 2
    }
];

// ===================================
// VARIABEL KUIS
// ===================================

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// ===================================
// MEMULAI KUIS
// ===================================

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    showQuestion();
}

// ===================================
// MENAMPILKAN PERTANYAAN
// ===================================

function showQuestion() {
    const quizContent = document.getElementById("quizContent");
    const q = questions[currentQuestion];

    quizContent.innerHTML = `
        <span class="label">
            PERTANYAAN ${currentQuestion + 1} DARI ${questions.length}
        </span>

        <h3>${q.question}</h3>

        <div id="options"></div>

        <p id="quizMessage"></p>

        <button class="btn-primary" onclick="nextQuestion()">
            ${currentQuestion === questions.length - 1
                ? "Selesaikan Kuis"
                : "Selanjutnya"}
        </button>
    `;

    const options = document.getElementById("options");

    q.options.forEach((option, index) => {
        const label = document.createElement("label");

        label.className = "quiz-option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;

        radio.addEventListener("change", () => {
            selectedAnswer = index;

            document.querySelectorAll(".quiz-option")
                .forEach(item => item.classList.remove("selected"));

            label.classList.add("selected");
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));

        options.appendChild(label);
    });
}

// ===================================
// PERTANYAAN BERIKUTNYA
// ===================================

function nextQuestion() {

    if (selectedAnswer === null) {
        document.getElementById("quizMessage").textContent =
            "Silakan pilih salah satu jawaban terlebih dahulu!";
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    selectedAnswer = null;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// ===================================
// MENAMPILKAN HASIL
// ===================================

function showResult() {
    const finalScore = (score / questions.length) * 100;

    let message = "";

    if (finalScore === 100) {
        message = "Luar biasa! Kamu sangat memahami literasi digital.";
    } else if (finalScore >= 60) {
        message = "Bagus! Terus tingkatkan pengetahuanmu.";
    } else {
        message = "Jangan menyerah! Pelajari kembali materi di atas.";
    }

    document.getElementById("quizContent").innerHTML = `
        <div class="quiz-icon">🎉</div>

        <h2>Kuis Selesai!</h2>

        <p>Kamu berhasil menjawab ${score} dari ${questions.length} pertanyaan dengan benar.</p>

        <div class="result">
            Nilai Kamu: ${finalScore}
        </div>

        <p>${message}</p>

        <button class="btn-primary" onclick="startQuiz()">
            Ulangi Kuis
        </button>

        <button class="btn-secondary" onclick="location.reload()">
            Kembali ke Beranda
        </button>
    `;
}
