// --------------------- SELEÇÃO DE ELEMENTOS -------------------------------

/*
InputAddNota: Input onde o usuário digita a nota que quer adicionar(retornará como texto da nota)

InputPesquisa: Input onde o usuário digita a nota que ele quer pesquisar(retornará como texto para filtrar as notas)

btnAddNota: Botão que o usuário clica para então add a nota

sectionNotas: Elemento HTML onde vai ser colocado todas as nossas representações DOM das notas
*/
const inputAddNota = document.getElementById('iAddNota');
const inputPesquisa = document.getElementById('iPesquisa');
const btnAddNota = document.getElementById('btnAddNota');
const sectionNotas = document.querySelector('.notasAdd');



// ----------------------------- STORAGE ------------------------------------

/*
Função tem duas partes, a primeira é a nossa criação do localStorage, nos damos uma nome "DevNotes" que é o nome da nossa aplicação dentro do storage e ent colocamos a devolutiva dentro da variavel "notas", essa função tem que retornar ou as notas que estão salvas no LocalStorage em forma de obj JSON, ou caso não tenha, retorne uma array vazia para começarmos a aplicação.
*/
function pegarNotasStorage(){
    const notas = localStorage.getItem('DevNotes');
    return notas ? JSON.parse(notas) : [];
}

/*
salvarNotasStorage vai receber uma array de obj, onde a gente vai setar essa array dentro do nosso storage, a gente já nomeiou o lugar que vai ser guardado nossas notas "DevNotes", e ent vamos colocar lá caso for a primeira iteração ent a primeira nota, caso não ,ent seria mais um atualização de um "banco de dados" do navegador, e claro temos que tranformar a array de obj json para string
*/
function salvarNotasStorage(notas){
    localStorage.setItem('DevNotes', JSON.stringify(notas));
}



// ---------------------------- RENDERIZAÇÃO --------------------------------
/*
Função para renderizar as notas que estão no localStorage, caso aja alguma nota armazenada lá. Temos dois tipo diferentes de renderização, uma é quando a chamamos sem parametro, que no caso ela então pega as notas que estão salvas no LocalStorage caso aja, e ent cria seu html e a outra é para quando tivermos uma array de notas filtradas, e ent pegamos essas notas filtradas e criamos seu HTML.
*/
function renderizarNotas(notasFiltradas = null){
    const notas = notasFiltradas || pegarNotasStorage();

    sectionNotas.innerHTML = '';

    notas.forEach(nota => {
        const divNota = document.createElement('div');
        divNota.classList.add('nota');
        divNota.dataset.id = nota.id;

        divNota.innerHTML = `
        <p>${nota.texto}</p>
        <div class="acoesNota">
            <button class="btnEditar">✏️</button>
            <button class="btnRemover">🗑️</button>
            <button class="btnFixar">📌</button>
            <button class="btnCopiar">📋</button>
        </div>
        `;

        sectionNotas.appendChild(divNota);
    });
}



// -------- Funções das Notas --------
/*
A função adicionarNota se relaciona com a de renderizarNotas, essa função cuida da parte de dados, da criação de obj nota para colocar dentro de uma array que ent será colocado e salvo dentro do localStorage, criamos a parte real digamos, os dados em sí, para que usemos esses dados para conseguirmos tranformar o abstrato em algo visual, que é a parte DOM. Essa aqui é a primeira função que é chamada quando o usuário clica no btn de add a nota
*/
function adicionarNota(){
    const textoNota = inputAddNota.value.trim();
    if(textoNota === '') return;

    const notas = pegarNotasStorage();
    const novaNota = {
        id: Date.now().toString(),
        texto: textoNota,
        fixada: false
    };

    notas.push(novaNota);
    salvarNotasStorage(notas);

    inputAddNota.value = '';
    renderizarNotas();
}

//------------------- FUNÇÕES PARA MANIPULAÇÃO DE NOTAS ---------------------

/*
Essa função removerNota recebe o id do datasetId do container da nota especifica, nós precisamos pegar as notas que estão no nosso armário(localStorage) e nós vamos fazer um retorno de uma nossa array de notas onde a nota em questão que é o id que foi passado não esteja. ".filter()" é um metodo que filtra array com base em uma condição, "n => n.id != id" aqui n é cada obj dentro da array, a gente vai no id de cada obj e vai ver se ele é diferente do id(datasetId) que foi passado, se for ent ele retorna esse obj para array, se não diferente ent significa que estamos falando com o obj que queremos remover, ent ele não é retornado. Nós ent agora temos uma nova array sem o obj que não queremos mais, a gente salva no nosso armário essa nova array, e ent recria o DOM com os OBJ que ficaram.
*/
function removerNota(id){
    let notas = pegarNotasStorage();
    notas = notas.filter(n => n.id != id);
    salvarNotasStorage(notas);
    renderizarNotas();
}


/*
copiarNota recebe o id que foi passado pela função botaoClicado, que é o id do container que contem o btn que foi clicado, pegamos as notas no nosso armario(localStorage), filtramos a notaOriginal foi queremos pegar o texto dela, usamos o metodo ".find()" que retorna apenas a primeira ocorrencia daquela condição, criamos outro obj que vai ser a copia do obj original. Todas as notas são objs dentro de uma array, para acessarmos um elemento dentro de uma array usamos os indices(0 é o primeiro elemento, 1 o segundo e assim vai), queremos que essa copia seja add logo após a original, ent vamos usar os indices, pegamos ent o indice da nota original com o metodo ".findIndex()" para ser usado no splice um metodo que add, remove ou subtitui um elemento em uma array, contendo 3 parametros, o primeiro é a partir de que indice ele vai remover,add,subtituir, um elemento, o segundo se for 0 significa que não vamos remover nada, se for 1 remover 1 elemento a partir do indice que indicamos e assim por diante, e o terceiro é o opcional caso queremos add um elemento da array, que é a copia do obj, nós ent salvamos essa nova array, e ent fazemos o dom dessa nova array.
*/
function copiarNota(id){
    const todasNotas = pegarNotasStorage();
    const notaOriginal = todasNotas.find(n => n.id == id);
    if(!notaOriginal) return;

    const novaNota = {
        id: Date.now().toString(),
        texto: notaOriginal.texto,
        fixada: false
    }

    const indiceOriginal = todasNotas.findIndex(n => n.id == id);
    todasNotas.splice(indiceOriginal + 1, 0, novaNota);
    salvarNotasStorage(todasNotas);
    renderizarNotas();  
}


/*
Primeiro temos que filtrar a nota que queremos Editar no sentido DADO, DEPOIS Nós queremos mudar o paragrafo que está dentro de um container DIV, isso é parte DOM, ent vamos no container que contem todas as notas que tem a class ".nota" e vamos no datasetId dele e colocamos o id que nós foi passado que é a nota que queremos editar, aí selecionamos o p, criamos um textArea colocando nesse o valor que já está na notaOriginal, damos uma class, e trocamos o p pelo textArea.

Demos uma class para o textArea pois é depois de o usuário sair do textArea, que ent agora tem que rolar uma atualização na questão do obj que teve seu texto alterado, ent no textArea usamos o evento blur, que é disparado quando o textArea sair do foco ou seja o usuário sair dele, aí nós vamos lá no obj que pegamos da notaParaEditar e no texto dele colocamos o que tem agora no textArea, salvamos e ent renderizamos o DOM(visual) com um novo texto na nota(OBJ)
*/
function editarNota(id){
    const todasNotas = pegarNotasStorage();
    const notaParaEditar = todasNotas.find(n => n.id == id);
    if(!notaParaEditar) return;

    const divNota = document.querySelector(`.nota[data-id="${id}"]`);
    if(!divNota) return;

    const pTexto = divNota.querySelector('p');
    const textAreaEdicao = document.createElement('textarea');
    textAreaEdicao.value = notaParaEditar.texto;
    textAreaEdicao.classList.add('textAreaEdicao');

    divNota.replaceChild(textAreaEdicao, pTexto);

    textAreaEdicao.addEventListener('blur', () => {
        notaParaEditar.texto = textAreaEdicao.value.trim();
        salvarNotasStorage(todasNotas);
        renderizarNotas();
    });

    textAreaEdicao.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            textAreaEdicao.blur();
        }
    });

    textAreaEdicao.focus();
}


/*
FixarNota ent pega a nota que é para ser Fixada, muda o estado Booleando do atributo fixada, vai em todas as notas e ordena elas co base no metodo de ordenamento ".sort()" que faz uma comparação entre dois obj, vai no atributo fixada deles que é booleano ent retorna 0(não fixada) 1(fixada) e faz uma comparação que vai ter como volta 0 que deixa os obj do jeito que está, um numero maior que 0 que faz com que o obj b venha depois do obj a, e se der negativo o obj a vem antes do obj b, salvamos a nova array com o novo ordenamento, e renderizamos o DOM novamente
*/
function fixarNota(id){
    const todasNotas = pegarNotasStorage();
    const notaFixar = todasNotas.find(n => n.id == id);
    if(!notaFixar) return;

    notaFixar.fixada = !notaFixar.fixada;

    // Ordena para mostrar fixadas primeiro
    todasNotas.sort((a,b) => b.fixada - a.fixada);

    salvarNotasStorage(todasNotas);
    renderizarNotas();
}

// ------------------ BOTÃO CLICADO (EVENT DELEGACION) ----------------------

/*
botaoClicado é uma função com o proprósito de pegarmos o id daquele container onde contém o botão que foi clicado, para então sabermos que botão em que container podemos mexer, primeiro nós usamos o obj de evento que o navegador nós dá, "e.target" retorna que elemento o usuario clicou, que no caso vai retornar um botão, ".closest(.nota) nós precisamos de um id para identificador que obj, container, de nota foi clicado certo? ent o closest sobe na hieraquia DOM a partir do elemento que foi clicado até ele achar um elemento com a class .nota, que é o container das notas, ent ele acha o container do btn que foi clicado e pagamos o datasetId desse container que é o mesmo id do obj de quando ele foi criado!"
*/
function botaoClicado(e){
    const notaId = e.target.closest('.nota')?.dataset.id;
    if(!notaId) return;

    if(e.target.classList.contains('btnRemover')){
        removerNota(notaId);
    } else if(e.target.classList.contains('btnEditar')){
        editarNota(notaId);
    } else if(e.target.classList.contains('btnCopiar')){
        copiarNota(notaId);
    } else if(e.target.classList.contains('btnFixar')){
        fixarNota(notaId);
    }
}

// ---------------------------- PESQUISA ------------------------------------

/*
Aqui a logica inclui o metodo ".includes()" e o textoPesquisa, vamos no armário(localStorage) pegamos a notas e filtramos ela com base no seguinte, se o texto daquela nota inclui o texto da pesquisa, ent ele retorna a nota em questão, e ent chamamos a função de renderizarNotas só que dessa vez com parametro, o parametro é as notasFiltradas, essas notasFiltradas vão ser colocadas na variavel notas do renderizar e ent seguir o fluxo da função
*/
function pesquisarNotas(){
    const todasNotas = pegarNotasStorage();
    const textoPesquisa = inputPesquisa.value.trim().toLowerCase();

    const notasFiltradas = todasNotas.filter(nota => 
        nota.texto.toLowerCase().includes(textoPesquisa)
    );

    renderizarNotas(notasFiltradas);
}

// ------------------------------ EVENTOS -----------------------------------


/*
Evento de clique colocado no btn de add nota, esse evento chama a função de adicionarNota que cria o obj de nota coloca dentra da array salva, e aí chama o renderizarNota para criar o DOM, esse evento desencadeia 4 funções, adicionarNota, renderizarNota, salvarNotaStorage, PegarNotaStorage, um chamando o outro
*/
btnAddNota.addEventListener('click', adicionarNota);


/*
Evento de Keypress na input de add nota para caso de o usuario não clicar no btn e apertar enter
 */
inputAddNota.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        adicionarNota();
    }
});


/*
PAI de todas as notas em questão do DOM, ele atraves do event delegacion OUVE os cliques nos seus filhos e ent chama a função botaoClicado que vai pegar o id e passar para os botoes vendo qual foi escolhido(editar,remover,copiar,fixar)
*/
sectionNotas.addEventListener('click', botaoClicado);


/*
Evento de input na input de pesquisa que chama pesquisarNotas, que pega o texto da input percorre todas as notas e ve se no texto dela inclui o texto digitado na input
*/
inputPesquisa.addEventListener('input', pesquisarNotas);


// ---------------------------- INICIALIZAÇÃO -------------------------------


/*
Função para renderizar a parte visual, ou seja a parte DOM, a aquestão HTML das notas que já estão armazenadas no localStorage
*/
renderizarNotas();
