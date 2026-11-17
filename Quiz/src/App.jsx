import { useEffect, useState } from "react";
import { questions } from "./questions";

const STORAGE_KEY = "quiz-tech-best-score";

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    bolt: <><path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z" /></>,
    trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    refresh: <><path d="M20 7v5h-5"/><path d="M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3"/></>,
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="Quiz Tech início">
        <span className="brand-mark"><Icon name="code" size={22} /></span>
        <span>quiz<span className="brand-accent">tech</span></span>
      </a>
      <div className="topbar-note"><span className="live-dot" /> DESAFIO DE INFORMÁTICA</div>
    </header>
  );
}

function Welcome({ onStart, bestScore }) {
  return (
    <section className="welcome-panel">
      <div className="welcome-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> APRENDA • TESTE • EVOLUA</div>
        <h1>Seu próximo nível<br />começa com um <span>desafio.</span></h1>
        <p className="welcome-description">
          Coloque seus conhecimentos de tecnologia à prova. São 10 perguntas rápidas sobre informática, programação e desenvolvimento web.
        </p>
        <div className="welcome-actions">
          <button className="button button-primary" onClick={onStart}>Começar desafio <Icon name="arrow" size={18} /></button>
          <span className="duration"><Icon name="clock" size={16} /> Cerca de 5 minutos</span>
        </div>
        <div className="welcome-stats">
          <div><strong>10</strong><span>perguntas</span></div>
          <div className="stat-divider" />
          <div><strong>4</strong><span>alternativas</span></div>
          <div className="stat-divider" />
          <div><strong>100%</strong><span>gratuito</span></div>
        </div>
      </div>
      <div className="hero-visual" aria-label="Ilustração de tecnologia">
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="visual-grid" />
        <div className="code-window">
          <div className="window-top"><div className="window-dots"><i/><i/><i/></div><span>challenge.js</span><span className="window-menu">•••</span></div>
          <div className="code-lines">
            <div><b>01</b><span className="code-purple">const</span> <span className="code-blue">knowledge</span> = <span className="code-green">"∞"</span>;</div>
            <div><b>02</b><span className="code-purple">function</span> <span className="code-yellow">levelUp</span>() {'{'}</div>
            <div><b>03</b> &nbsp; <span className="code-purple">return</span> <span className="code-green">"keep learning"</span>;</div>
            <div><b>04</b>{'}'}</div>
            <div><b>05</b><span className="code-muted">// seu futuro começa aqui</span></div>
            <div><b>06</b><span className="code-blue">levelUp</span>();<span className="cursor">▍</span></div>
          </div>
          <div className="window-footer"><span><i/> JavaScript</span><span>UTF-8</span></div>
        </div>
        <div className="floating-card floating-score"><span className="float-icon"><Icon name="trophy" size={17}/></span><div><strong>{bestScore !== null ? `${bestScore}/10` : "10/10"}</strong><small>{bestScore !== null ? "Sua melhor pontuação" : "Seu objetivo"}</small></div></div>
        <div className="floating-card floating-badge"><span className="badge-star"><Icon name="star" size={16}/></span><div><strong>Modo desafio</strong><small>Conhecimento em ação</small></div></div>
        <div className="visual-caption">DESENVOLVA SUAS HABILIDADES <span>↗</span></div>
      </div>
    </section>
  );
}

function Quiz({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const question = questions[current];
  const progress = ((current + (showExplanation ? 1 : 0)) / questions.length) * 100;

  function confirmAnswer() {
    if (selected === null) return;
    setAnswers((previous) => [...previous, selected]);
    setShowExplanation(true);
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      const finalAnswers = [...answers];
      const score = finalAnswers.reduce((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0);
      onFinish(score);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
    setShowExplanation(false);
  }

  return (
    <section className="quiz-card">
      <div className="quiz-topline">
        <span className="question-count">PERGUNTA <strong>{String(current + 1).padStart(2, "0")}</strong><span className="count-muted"> / {String(questions.length).padStart(2, "0")}</span></span>
        <span className="category-pill">{question.category}</span>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
      <div className="question-heading">
        <span className="question-icon"><Icon name="bolt" size={22}/></span>
        <h2>{question.question}</h2>
      </div>
      <div className="answers-list">
        {question.options.map((option, index) => {
          const isCorrect = showExplanation && index === question.answer;
          const isWrong = showExplanation && selected === index && index !== question.answer;
          return (
            <button
              key={option}
              className={`answer-option ${selected === index ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
              onClick={() => !showExplanation && setSelected(index)}
              disabled={showExplanation}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {isCorrect && <span className="answer-mark"><Icon name="check" size={17}/></span>}
              {!showExplanation && selected === index && <span className="selected-dot" />}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <div className="explanation">
          <span className="explanation-icon"><Icon name="check" size={16}/></span>
          <div><strong>{selected === question.answer ? "Muito bem!" : "Vamos aprender!"}</strong><p>{question.explanation}</p></div>
        </div>
      )}
      <div className="quiz-footer">
        <span className="answer-hint">{showExplanation ? "Resposta registrada" : "Selecione uma alternativa"}</span>
        {!showExplanation ? (
          <button className="button button-primary" disabled={selected === null} onClick={confirmAnswer}>Confirmar resposta <Icon name="arrow" size={17}/></button>
        ) : (
          <button className="button button-primary" onClick={nextQuestion}>{current === questions.length - 1 ? "Ver resultado" : "Próxima pergunta"} <Icon name="arrow" size={17}/></button>
        )}
      </div>
    </section>
  );
}

function Result({ score, onRestart, bestScore }) {
  const percent = Math.round((score / questions.length) * 100);
  const message = score >= 9 ? ["Excelente trabalho!", "Você domina muito bem os conceitos. Continue assim!"] :
    score >= 7 ? ["Muito bom!", "Você tem uma boa base. Mais um pouco de prática e chega lá!"] :
    score >= 5 ? ["Bom começo!", "Você já conhece alguns conceitos. Revise os temas e tente novamente!"] :
    ["Continue praticando!", "Errar faz parte do aprendizado. Use as explicações para evoluir."];
  return (
    <section className="result-card">
      <div className="result-icon"><Icon name="trophy" size={30}/></div>
      <span className="eyebrow centered-eyebrow">DESAFIO CONCLUÍDO</span>
      <h2>{message[0]}</h2>
      <p className="result-description">{message[1]}</p>
      <div className="score-ring" style={{ "--score": `${percent}%` }}>
        <div className="score-ring-inner"><strong>{score}<small>/{questions.length}</small></strong><span>ACERTOS</span></div>
      </div>
      <div className="result-metrics">
        <div><strong>{percent}%</strong><span>Desempenho</span></div>
        <div><strong>{questions.length - score}</strong><span>Para revisar</span></div>
        <div><strong>{bestScore}</strong><span>Melhor nota</span></div>
      </div>
      <button className="button button-primary restart-button" onClick={onRestart}><Icon name="refresh" size={18}/> Refazer desafio</button>
      <p className="saved-note"><Icon name="check" size={14}/> Sua melhor pontuação fica salva neste navegador.</p>
    </section>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? null : Number(saved);
  });
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    if (bestScore !== null) localStorage.setItem(STORAGE_KEY, String(bestScore));
  }, [bestScore]);

  function finishQuiz(score) {
    setLastScore(score);
    setBestScore((previous) => previous === null ? score : Math.max(previous, score));
    setScreen("result");
  }

  function restart() {
    setScreen("quiz");
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        {screen === "home" && <Welcome onStart={() => setScreen("quiz")} bestScore={bestScore} />}
        {screen === "quiz" && <Quiz key={screen} onFinish={finishQuiz} />}
        {screen === "result" && <Result score={lastScore} bestScore={bestScore} onRestart={restart} />}
      </main>
      <footer className="site-footer">
        <span>© 2026 <strong>Quiz Tech</strong></span>
        <span>Feito para aprender. Criado com React.</span>
        <span className="footer-status"><i/> SISTEMA ONLINE</span>
      </footer>
    </div>
  );
}
