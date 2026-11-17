# Quiz Tech — projeto ReactJS

Aplicativo de quiz responsivo sobre informática, JavaScript e desenvolvimento web.

## Requisitos atendidos na atividade
- ReactJS com componentes separados (`Header`, `Welcome`, `Quiz` e `Result`).
- JavaScript com variáveis, funções, condicionais, arrays e estruturas de repetição (`map` e `reduce`).
- `useState` para controlar a tela, pergunta, alternativa selecionada e pontuação.
- `useEffect` para sincronizar a melhor pontuação com o `localStorage`.
- Interface responsiva para celular e computador.
- Não precisa de banco de dados: a melhor pontuação fica salva no navegador do usuário.

## Como executar no computador

1. Instale o Node.js (versão LTS): https://nodejs.org/
2. Extraia o arquivo ZIP.
3. Abra a pasta `quiz-tech` no VS Code.
4. No terminal do VS Code, execute:

```bash
npm install
npm run dev
```

5. Abra o endereço local indicado pelo Vite (normalmente `http://localhost:5173`).

## Como publicar na Vercel

1. Crie uma conta em https://vercel.com/
2. Crie um repositório no GitHub e envie os arquivos desta pasta.
3. Na Vercel, clique em **Add New → Project** e importe o repositório.
4. A Vercel identifica o Vite automaticamente. Confira:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Clique em **Deploy**.
6. Quando terminar, abra o endereço `.vercel.app` em uma janela anônima e teste o quiz.
7. Cole o link público na atividade.

## Antes de entregar
- [ ] Executar `npm install` e `npm run dev`.
- [ ] Responder as 10 perguntas e conferir o resultado.
- [ ] Atualizar a página e verificar que a melhor pontuação continua salva.
- [ ] Testar em tela estreita e no computador.
- [ ] Publicar na Vercel e copiar o link público.

## Personalização
As perguntas e respostas ficam em `src/questions.js`. O visual está em `src/styles.css`.
