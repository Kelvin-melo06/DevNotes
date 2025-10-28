## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Bitcount+Grid+Single&size=30&pause=1000&color=009688&width=435&lines=%F0%9F%96%A5%F0%9F%96%B1+Dev+Notes" alt="Typing SVG" /></a>

O *DevNotes* é um aplicativo simples e funcional de anotações, desenvolvido com *HTML, CSS e JavaScript puro, que permite ao usuário **criar, editar, remover, copiar, fixar e pesquisar notas* diretamente no navegador — tudo isso sem precisar de banco de dados externo.  

As notas são salvas automaticamente no *LocalStorage*, garantindo que nada se perca mesmo ao fechar a página.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Bitcount+Grid+Single&size=30&pause=1000&color=009688&width=435&lines=%E2%8C%A8%F0%9F%94%8D+Funcionalidades" alt="Typing SVG" /></a>

- 🆕 *Adicionar notas*: Crie novas anotações digitando o texto e clicando no botão de adicionar (ou pressionando Enter).  
- ✏ *Editar notas*: Clique no ícone de lápis para editar o conteúdo de uma nota já existente.  
- 🗑 *Remover notas*: Exclua uma nota específica com apenas um clique.  
- 📋 *Copiar notas*: Duplique o conteúdo de uma nota e insira logo abaixo da original.  
- 📌 *Fixar notas*: Fixe as notas mais importantes no topo da lista.  
- 🔍 *Pesquisar notas*: Filtre suas anotações em tempo real conforme digita no campo de pesquisa.  
- 💾 *Persistência de dados*: Todas as notas são salvas no LocalStorage, garantindo que o conteúdo permaneça mesmo após fechar o navegador.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Bitcount+Grid+Single&size=25&pause=1000&color=009688&width=435&lines=%F0%9F%A4%96%F0%9F%A7%A0+Estrutura+Do+Projeto" alt="Typing SVG" /></a>

O código está dividido em seções bem definidas para manter a organização e a clareza:

| Seção | Descrição |
|--------|------------|
| *Seleção de elementos* | Captura dos inputs, botões e seções do DOM. |
| *Storage* | Funções responsáveis por salvar e recuperar notas do LocalStorage. |
| *Renderização* | Cria dinamicamente os elementos HTML de cada nota com base nos dados salvos. |
| *Funções das notas* | Lógica principal para adicionar, remover, copiar, editar e fixar notas. |
| *Eventos* | Escutam interações do usuário (cliques, teclas e inputs). |
| *Inicialização* | Renderiza as notas salvas ao abrir a aplicação. |

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Bitcount+Grid+Single&size=25&pause=1000&color=009688&width=435&lines=%F0%9F%8E%A9%F0%9F%92%BC+Tecnologias+Utilizadas" alt="Typing SVG" /></a>

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="19" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="19" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="19" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" alt="git logo"  />
  <img width="19" />
</div>  

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Bitcount+Grid+Single&size=25&pause=1000&color=009688&width=435&lines=%F0%9F%8C%AA%EF%B8%8F+Logica+de+funcionamento" alt="Typing SVG" /></a>

1. O usuário digita uma nota e clica em “Adicionar”.  
2. Essa nota é transformada em um *objeto JavaScript* e armazenada dentro de um *array*.  
3. O array é salvo no *LocalStorage* (convertido em JSON).  
4. A função renderizarNotas() lê esse array e *cria dinamicamente os elementos HTML* no navegador.  
5. Outras funções (editar, copiar, remover, fixar) atualizam os dados e chamam renderizarNotas() novamente, refletindo as mudanças visualmente.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Bitcount+Grid+Single&size=25&pause=1000&color=009688&width=435&lines=%F0%9F%8E%B2+Conceitos+Aplicados" alt="Typing SVG" /></a>

- Manipulação do *DOM* com document.createElement, appendChild, replaceChild, e dataset.
- Armazenamento de dados com *LocalStorage*.
- Uso de *funções de array*: .forEach(), .filter(), .find(), .findIndex(), .splice(), .sort(), .includes().
- *Event delegation* com e.target e .closest() para identificar qual botão foi clicado.
- Organização de código e documentação com comentários descritivos e seções claras.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Bitcount+Grid+Single&size=25&pause=1000&color=009688&width=435&lines=%E2%99%A3%EF%B8%8F+Aprendizado" alt="Typing SVG" /></a>

> “Esse projeto me ensinou a importância de entender o *fluxo completo dos dados* — desde o momento em que o usuário digita algo até isso se transformar em um elemento visual e ser salvo no navegador. Também aprendi a usar métodos de array de forma prática e a manipular o DOM com mais confiança.”

---
