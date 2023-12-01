function collectData(){
    const nomeElement = document.getElementById("nome");
    const dataNascimentoElement = document.getElementById("data-nascimento");
    
    return {
        nomeElement,
        dataNascimentoElement
    };
}

function formatDate(date){
    return date.split('-').reverse().join('/');
}

function validatePessoa(data){
    let pessoaIsValid = true;
    let errorMessage;
    const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;

    if (data.nome.length === 0 || data.dataNascimento.length === 0){
        errorMessage = "Preencha todos os campos";
        pessoaIsValid = false;
    }else if (!(/^[a-zA-Z\s]+$/.test(data.nome))){
        errorMessage = "O nome deve conter apenas letras e espaços";
        pessoaIsValid = false;
    }else if (data.nome.length < 3 || 120 <  data.nome.length){
        errorMessage = "O nome deve possuir de 3 a 120 caracteres";
        pessoaIsValid = false;
    }else if(!regexDate.test(data.dataNascimento)){
        errorMessage = "A data de nascimento precisa estar no padrão dd/mm/aaaa";
        pessoaIsValid = false;
    }
    
    return {pessoaIsValid, errorMessage};
}

function savePessoa(pessoa){
    const pessoasVetor = JSON.parse(localStorage.getItem('pessoas')) || [];

    pessoa.id = pessoasVetor.length;
    pessoasVetor.push(pessoa);

    localStorage.setItem('pessoas', JSON.stringify(pessoasVetor));
}

function updatePessoa(pessoa){
    const pessoasVetor = JSON.parse(localStorage.getItem('pessoas'));

    pessoasVetor[pessoa.id - 1] = pessoa;

    localStorage.setItem('pessoas', JSON.stringify(pessoasVetor));
}

function insertPessoaInTable(pessoa){
    const table = document.getElementById("tabela-pessoas").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    const nomeElement = newRow.insertCell(0);
    const dataNascimentoElement = newRow.insertCell(1);
    const botoesElement = newRow.insertCell(2);
    const botao = document.createElement('button');
    
    botao.textContent = "Editar";
    botao.addEventListener('click', () => {
        if(botao.textContent === "Editar"){
            botao.textContent = "Salvar";

            nomeElement.contentEditable = true;
            nomeElement.style.backgroundColor = "rgb(235, 235, 235)";

            dataNascimentoElement.contentEditable = true;
            dataNascimentoElement.style.backgroundColor = "rgb(235, 235, 235)";

            botao.style.color = "white";
            botao.classList.add("border-none");
            botao.classList.add("border-round");
            botao.classList.add("botao-verde");
        }else{          
            botao.textContent = "Editar";
            botao.style.color = "black";
            botao.classList = [];

            nomeElement.contentEditable = false;
            nomeElement.style.backgroundColor = "white";

            dataNascimentoElement.contentEditable = false;
            dataNascimentoElement.style.backgroundColor = "white";

            pessoa.nome = nomeElement.textContent;
            pessoa.dataNascimento = dataNascimentoElement.textContent;
            const {pessoaIsValid, errorMessage} = validatePessoa(pessoa);

            if(pessoaIsValid){
                updatePessoa(pessoa);
            }else{
                showModalError(errorMessage);
            }
        }
    });

    nomeElement.textContent = pessoa.nome;
    dataNascimentoElement.textContent = pessoa.dataNascimento;
    botoesElement.appendChild(botao);
}

function showModalError(errorMessage){
    const modalContainer = document.getElementsByClassName("modal-container")[0];
    const errorMessageElement = document.getElementById("error-message");

    errorMessageElement.textContent = errorMessage;
    modalContainer.style.opacity = "100%";
    modalContainer.style.pointerEvents = "all";
}

function handleClickEvent(event){
    event.preventDefault();
    
    const data = collectData();
    const pessoa = {nome: data.nomeElement.value, 
                    dataNascimento: formatDate(data.dataNascimentoElement.value)};
    const {pessoaIsValid, errorMessage} = validatePessoa(pessoa);

    if (pessoaIsValid){
        savePessoa(pessoa);
        insertPessoaInTable(pessoa);
    }else{
        showModalError(errorMessage);
    }    
}

function loadTable(){
    const pessoas = JSON.parse(localStorage.getItem('pessoas'));

    pessoas.forEach(insertPessoaInTable);
}

const btnSubmit = document.getElementById("btn-submit");
const btnCloseModal = document.querySelector(".modal button");

btnSubmit.addEventListener('click', handleClickEvent);
btnCloseModal.addEventListener('click', function(){
    const modalContainer = document.getElementsByClassName("modal-container")[0];

    modalContainer.style.opacity = "0%";
    modalContainer.style.pointerEvents = "none";
});

loadTable();