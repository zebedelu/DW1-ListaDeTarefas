const URLAPI = "http://159.65.228.63/"

async function SearchAPI() {
    const response = await fetch(URLAPI+"tarefas");
    const data = await response.json();
    RenderTable(data);
}

async function RenderTable(table) {
    while (document.getElementById("table").firstChild) {
        document.getElementById("table").firstChild.remove()
    }
    table.forEach(element => {
        let table_copy = document.getElementById("modelo-tabela").cloneNode(true);
        table_copy.querySelector("#descricao").textContent = element.conteudo || element.descricao;
        table_copy.querySelector("#local").textContent = element.local;
        
        table_copy.querySelector("#recursos").textContent = element.recursos || element.recursosNecessarios;
        table_copy.querySelector("#responsavel").textContent = element.matricula;
        table_copy.querySelector("#data").textContent = element.data || element.dataLimite;
        table_copy.id = "";
        
        table_copy.classList.add("prioridade-"+element.prioridade.toLowerCase());

        document.getElementById("table").appendChild(table_copy);
    });
}

function Search(pesquisa) {
    pesquisa = pesquisa.toLocaleLowerCase();
    Array.from(document.querySelector("#table").children).forEach(element => {
        if ((element.querySelector("#descricao").textContent+
            element.querySelector("#local").textContent+
            element.querySelector("#recursos").textContent+
            element.querySelector("#responsavel").textContent+
            element.querySelector("#data").textContent).toLocaleLowerCase().includes(pesquisa)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
}

async function CreateTask() {
    const propriedade = document.getElementById("prioridade").value.trim();
    const descricao = document.getElementById("descricaoInput").value.trim();
    const local = document.getElementById("local").value.trim();
    const recursos = document.getElementById("recursos").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const data = document.getElementById("data").value.trim();

    let dados = {
        prioridade: propriedade,
        descricao: descricao,
        local: local,
        recursosNecessarios: recursos,
        dataLimite: data,
        matricula: matricula,
    }

    if (propriedade==""||descricao===""||local===""||recursos===""||matricula===""||data==="") {
        alert("Alguma informação está faltando!");
    } else {
        await fetch(URLAPI+"tarefas", {
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(dados)
            })
        alert("Enviado!");
        window.location.href = "lista.html";
    }
}