const inputAddNota = document.getElementById('iAddNota');
const btnAddNota = document.getElementById('btnAddNota');
const sectionNotas = document.querySelector('.notasAdd');

function pegarNotasStorage(){
    const notas = localStorage.getItem('DevNotes');
    return notas ? JSON.parse(notas) : [];
}

function salvarNotasStorage(notas){
    localStorage.setItem('DevNotes', JSON.stringify(notas));
}

function renderizarNotas(){
    const notas = pegarNotasStorage();

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

function adicionarNota(){
    const textoNota = inputAddNota.value.trim();
    if(textoNota === '') return;

    const notas = pegarNotasStorage();
    const novaNota = {
        id: Date.now(),
        texto: textoNota,
        fixada: false
    };

    notas.push(novaNota);
    salvarNotasStorage(notas);

    inputAddNota.value = '';
    renderizarNotas();
}

function removerNota(id){
    let notas = pegarNotasStorage();
    notas = notas.filter(n => n.id != id);
    salvarNotasStorage(notas);
    renderizarNotas();
}

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

function editarNota(id){
    const todasNotas = pegarNotasStorage();

    const notaParaEditar = todasNotas.find(n => n.id == id);
    if(!notaParaEditar) return;

    const divNota = document.querySelector(`.nota[data-id = ${id}]`);
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
    })

    textAreaEdicao.addEventListener('keypress', (e) => {
       if(e.key === 'Enter'){
        e.preventDefault();
        textAreaEdicao.blur();
       }

    textAreaEdicao.focus();   
    });
}

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


btnAddNota.addEventListener('click', adicionarNota);

inputAddNota.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        adicionarNota();
    }
});

sectionNotas.addEventListener('click', botaoClicado);