
const formulario = document.getElementById("formTarefa");
const campoNome = document.getElementById("nomeTarefa");
const campoPrioridade = document.getElementById("prioridade");

const listaPendentes = document.getElementById("listaPendentes");
const historico = document.getElementById("historico");

const contadorPendentes = document.getElementById("contadorPendentes");
const contadorConcluidas = document.getElementById("contadorConcluidas");

const mensagem = document.getElementById("mensagem");

let tarefasPendentes = [];
let tarefasConcluidas = [];

formulario.addEventListener("submit", adicionarTarefa);

function adicionarTarefa(event) {

    event.preventDefault();

    const nome = campoNome.value.trim();

    if (nome === "") {

        mensagem.textContent = "Informe uma tarefa.";
        mensagem.className = "text-red-400 my-3";

        campoNome.focus();

        return;

    }

    const tarefa = {

        id: Date.now(),

        nome: nome,

        prioridade: campoPrioridade.value

    };

    tarefasPendentes.push(tarefa);

    campoNome.value = "";
    campoNome.focus();

    mensagem.textContent = "";

    renderizarPendentes();

}

function obterCorPrioridade(prioridade) {

    switch (prioridade) {

        case "Alta":
            return "bg-red-600";

        case "Média":
            return "bg-yellow-500 text-black";

        default:
            return "bg-green-600";
    }

}


function renderizarPendentes() {

    listaPendentes.innerHTML = "";

    tarefasPendentes.forEach((tarefa) => {

        const card = document.createElement("div");

        card.className =
            "bg-slate-800 rounded-lg p-4 mb-3 border border-slate-700";

        // Nome

        const titulo = document.createElement("h3");

        titulo.className = "font-bold text-lg";

        titulo.textContent = tarefa.nome;

        // Prioridade

        const prioridade = document.createElement("span");

        prioridade.className =
            `${obterCorPrioridade(tarefa.prioridade)} inline-block px-2 py-1 rounded text-sm mt-2`;

        prioridade.textContent = tarefa.prioridade;

        // Botões

        const areaBotoes = document.createElement("div");

        areaBotoes.className = "flex gap-2 mt-4";

        const btnConcluir = document.createElement("button");

        btnConcluir.textContent = "Concluir";

        btnConcluir.className =
            "bg-green-600 hover:bg-green-700 px-3 py-2 rounded";

        btnConcluir.addEventListener("click", () => {

            concluirTarefa(tarefa.id);

        });

        const btnExcluir = document.createElement("button");

        btnExcluir.textContent = "Excluir";

        btnExcluir.className =
            "bg-red-600 hover:bg-red-700 px-3 py-2 rounded";

        btnExcluir.addEventListener("click", () => {

            excluirTarefa(tarefa.id);

        });

        areaBotoes.appendChild(btnConcluir);
        areaBotoes.appendChild(btnExcluir);

        card.appendChild(titulo);
        card.appendChild(prioridade);
        card.appendChild(areaBotoes);

        listaPendentes.appendChild(card);

    });

    atualizarContadores();

}

function concluirTarefa(id) {

    const indice = tarefasPendentes.findIndex(
        tarefa => tarefa.id === id
    );

    if (indice === -1) return;

    const tarefa = tarefasPendentes[indice];

    tarefasPendentes.splice(indice, 1);

    tarefasConcluidas.unshift({

        ...tarefa,

        data: new Date()

    });

    renderizarPendentes();

    renderizarHistorico();

}

function excluirTarefa(id) {

    tarefasPendentes = tarefasPendentes.filter(

        tarefa => tarefa.id !== id

    );

    renderizarPendentes();

}

function renderizarHistorico() {

    historico.innerHTML = "";

    tarefasConcluidas.forEach((tarefa) => {

        const card = document.createElement("div");

        card.className =
            "bg-slate-800 rounded-lg p-4 mb-3 border border-slate-700";

        const titulo = document.createElement("h3");

        titulo.className = "font-bold";

        titulo.textContent = tarefa.nome;

        const prioridade = document.createElement("span");

        prioridade.className =
            `${obterCorPrioridade(tarefa.prioridade)} inline-block px-2 py-1 rounded text-sm mt-2`;

        prioridade.textContent = tarefa.prioridade;

        const data = document.createElement("p");

        data.className =
            "text-gray-400 text-sm mt-3";

        data.textContent =
            tarefa.data.toLocaleString("pt-BR");

        card.appendChild(titulo);
        card.appendChild(prioridade);
        card.appendChild(data);

        historico.appendChild(card);

    });

    atualizarContadores();

}

function atualizarContadores() {

    contadorPendentes.textContent =
        tarefasPendentes.length;

    contadorConcluidas.textContent =
        tarefasConcluidas.length;

}

atualizarContadores();