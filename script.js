const quizData = [
    {
      question: "1. Em que ano foi criada a FMP?",
      options: ["2000", "2005", "2010", "2015"],
      answer: 1
    },
    {
      question: "2. Em que data a FMP foi inaugurada?",
      options: ["25/10/2005", "01/01/2006", "20/04/2006", "15/08/2006"],
      answer: 2
    },
    {
      question: "3. Qual o endereço atual da FMP?",
      options: ["Rua Maria Haeming, 48", "Rua João Pereira dos Santos, 99", "Av. Brasil, 100", "Rua SC-401, 2000"],
      answer: 1
    },
    {
      question: "4. A FMP é pública e gratuita?",
      options: ["Sim", "Não"],
      answer: 0
    },
    {
      question: "5. Quantos cursos de graduação ela oferece?",
      options: ["2", "3", "4", "5"],
      answer: 2
    },
    {
      question: "6. Qual destes é curso da FMP?",
      options: ["Medicina", "Direito", "Análise e Desenvolvimento de Sistemas", "Arquitetura"],
      answer: 2
    },
    {
      question: "7. A FMP pertence a qual nível de governo?",
      options: ["Federal", "Estadual", "Municipal", "Privada"],
      answer: 2
    },
    {
      question: "8. Qual modalidade de financiamento a FMP tem?",
      options: ["Mensalidade paga", "Mensalidade grátis", "Só bolsas", "Financiado pela Unesco"],
      answer: 1
    },
    {
      question: "9. Qual destes é um curso de Pós-Graduação que a FMP oferece?",
      options: ["Gestão Empresarial", "Segurança Cibernética", "Educação Especial", "Turismo e Preservação"],
      answer: 0
    },
    {
      question: "10. O que é CPA?",
      options: ["Custo por Aquisição", "Certificação Profissional Anbima", "Certificado Parcial Acadêmico", "Comissão Própria de Avaliação"],
      answer: 3
    },
    {
      question: "11. Qual o propósito do projeto LEFIS?",
      options: ["Promover um olhar filosófico e político sobre realidades sociais", "Promover atividades de ensino com vistas a aprimorar ou desenvolver habilidades acadêmicas", "Promover o debate científico da temática afro-brasileira e indígena", "Responsável por planejar, coordenar e executar o processo de avaliação interna da instituição"],
      answer: 0
    },
    {
      question: "12. Qual a carga horária do curso de Administração?",
      options: ["3000h", "3420h", "3600h", "4000h"],
      answer: 1
    },
    {
      question: "13. A FMP possui convênios internacionais?",
      options: ["Sim", "Não"],
      answer: 0
    },
    {
      question: "14. Um dos convênios é com universidade de qual país?",
      options: ["Argentina", "Cuba", "Chile", "Espanha"],
      answer: 1
    },
    {
      question: "15. A FMP criou o NEABI em que ano?",
      options: ["2008", "2011", "2014", "2017"],
      answer: 1
    },
    {
      question: "16. A FMP oferece cursos de pós-graduação?",
      options: ["Sim", "Não"],
      answer: 0
    },
    {
      question: "17. Em qual bairro está localizada a FMP?",
      options: ["Passa Vinte", "Ponte do Imaruim", "Estreito", "Centro"],
      answer: 1
    },
    {
      question: "18. Quando começou o projeto Semear Ideias?",
      options: ["2005", "2017", "2014", "2008"],
      answer: 2
    },
    {
      question: "19. Quais os valores da FMP?",
      options: ["Educação Emancipadora,Consciência Ética, Inclusão Social, Empreendedorismo, Direitos Humanos, Responsabilidade Social e Sustentabilidade", "Produtividade, Respeito pelo ser humano, Transparência", "Simplicidade, Ética, Qualidade", "Audácia, Espírito de família, Espiritualidade"],
      answer: 0
    },
    {
      question: "20. A FMP prioriza vagas para alunos:",
      options: ["De escolas privadas", "De outras cidades", "De escolas públicas", "De estrangeiros"],
      answer: 2
    }
];

// Embaralhar perguntas e opções
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleOptions(question) {
    const correctAnswer = question.options[question.answer];
    shuffleArray(question.options);
    question.answer = question.options.indexOf(correctAnswer);
}

// Embaralha as perguntas para o quiz.
// A ordem dos resultados seguirá esta ordem embaralhada.
shuffleArray(quizData);
quizData.forEach(shuffleOptions);

// Variáveis do quiz
let currentQuestion = 0;
let score = 0;
// userAnswers armazena a resposta para cada pergunta na ordem em que elas aparecem em quizData (que já está embaralhada)
let userAnswers = Array(quizData.length).fill(null);
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');

// Iniciar o quiz
function startQuiz() {
    showQuestion();
}

// Mostrar pergunta
function showQuestion() {
    quizContainer.innerHTML = '';

    const questionObj = quizData[currentQuestion];

    // Progresso
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    quizContainer.appendChild(progress);

    // Pergunta
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const questionText = document.createElement('h3');
    // CORREÇÃO: Remove o número "X." do início para exibição no quiz.
    // Isso é o que você tinha e foi removido por engano.
    questionText.textContent = questionObj.question.split('. ').slice(1).join('. ');
    questionElement.appendChild(questionText);

    // Opções
    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers';

    questionObj.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = index;

        if (userAnswers[currentQuestion] === index) {
            input.checked = true;
        }

        input.addEventListener('change', () => {
            userAnswers[currentQuestion] = index;
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        answersContainer.appendChild(label);
    });

    questionElement.appendChild(answersContainer);
    quizContainer.appendChild(questionElement);

    // Navegação
    const navigation = document.createElement('div');
    navigation.className = 'navigation';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentQuestion === 0;
    prevButton.addEventListener('click', () => {
        currentQuestion--;
        showQuestion();
    });

    const nextButton = document.createElement('button');
    if (currentQuestion < quizData.length - 1) {
        nextButton.textContent = 'Próxima';
        nextButton.addEventListener('click', () => {
            // Valida se a pergunta atual foi respondida antes de ir para a próxima
            if (userAnswers[currentQuestion] === null) {
                alert('Por favor, selecione uma resposta antes de continuar.');
                return; // Impede o avanço
            }
            currentQuestion++;
            showQuestion();
        });
    } else {
        nextButton.textContent = 'Ver Resultado';
        nextButton.addEventListener('click', () => {
            // Valida se a última pergunta foi respondida antes de ver o resultado
            if (userAnswers[currentQuestion] === null) {
                alert('Por favor, selecione uma resposta antes de ver o resultado.');
                return; // Impede a exibição do resultado
            }
            showResults();
        });
    }

    navigation.appendChild(prevButton);
    navigation.appendChild(nextButton);
    quizContainer.appendChild(navigation);
}

// Mostrar resultados
function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // Calcular pontuação
    score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });

    // Limpar o container de resultados antes de adicionar novos elementos
    resultContainer.innerHTML = '';

    // Exibir pontuação
    const scoreElement = document.createElement('div');
    scoreElement.className = 'score';

    const scoreTitle = document.createElement('h2');
    scoreTitle.textContent = 'Resultado do Quiz';
    scoreElement.appendChild(scoreTitle);

    const scoreText = document.createElement('p');
    scoreText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas!`;
    scoreElement.appendChild(scoreText);

    const performanceMessage = document.createElement('p');
    performanceMessage.textContent = getPerformanceMessage(score / quizData.length);
    scoreElement.appendChild(performanceMessage);

    resultContainer.appendChild(scoreElement);

    // Detalhes das respostas
    const detailsTitle = document.createElement('h3');
    detailsTitle.textContent = 'Detalhes das suas respostas:';
    resultContainer.appendChild(detailsTitle);

    // CORREÇÃO AQUI: Iterar sobre quizData (que está na ordem aleatória apresentada ao usuário)
    quizData.forEach((question, index) => {
        const resultItem = document.createElement('div');
        // A classe 'correct'/'incorrect' ainda se baseia na comparação da resposta do usuário com a resposta correta
        resultItem.className = `result-item ${userAnswers[index] === question.answer ? 'correct' : 'incorrect'}`;

        const questionText = document.createElement('p');
        // REFORMATANDO: "Pergunta X: Texto da Pergunta"
        // 'index + 1' dará o número da pergunta na ordem apresentada.
        // question.question.split('. ').slice(1).join('. ') pega o texto sem o número inicial.
        const questionContent = question.question.split('. ').slice(1).join('. ');
        questionText.innerHTML = `<strong>Pergunta ${index + 1}: ${questionContent}</strong>`;
        resultItem.appendChild(questionText);

        const userAnswerText = document.createElement('p');
        userAnswerText.textContent = `Sua resposta: ${userAnswers[index] !== null ? question.options[userAnswers[index]] : 'Não respondida'}`;
        resultItem.appendChild(userAnswerText);

        if (userAnswers[index] !== question.answer) {
            const correctAnswerText = document.createElement('p');
            correctAnswerText.textContent = `Resposta correta: ${question.options[question.answer]}`;
            resultItem.appendChild(correctAnswerText);
        }

        resultContainer.appendChild(resultItem);
    });

    // Botão para reiniciar
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Tentar Novamente';
    restartButton.addEventListener('click', restartQuiz);
    resultContainer.appendChild(restartButton);
}

// Mensagem de desempenho
function getPerformanceMessage(percentage) {
    if (percentage >= 0.9) return 'Excelente! Você conhece muito bem a FMP!';
    if (percentage >= 0.7) return 'Muito bom! Você sabe bastante sobre a FMP!';
    if (percentage >= 0.5) return 'Bom! Mas, ainda pode aprender mais sobre a FMP.';
    return 'Que tal estudar um pouco mais sobre a FMP e tentar novamente?';
}

// Reiniciar quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = Array(quizData.length).fill(null);

    // Reembaralhar perguntas e opções para um novo quiz
    shuffleArray(quizData);
    quizData.forEach(shuffleOptions);

    resultContainer.style.display = 'none';
    resultContainer.innerHTML = '';
    quizContainer.style.display = 'block';
    showQuestion();
}

// Iniciar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', startQuiz);
