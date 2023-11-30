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
    let dataIsValid = true;
    const errorMessage = document.getElementById("error-message");

    if (data.nome.length === 0 || data.dataNascimento.length === 0){
        errorMessage.textContent = "Preencha todos os campos";
        dataIsValid = false;
    }else if (!(/^[a-zA-Z\s]+$/.test(data.nome))){
        errorMessage.textContent = "O nome deve conter apenas letras e espaços";
        dataIsValid = false;
    }else if (data.nome.length < 3 || 120 <  data.nome.length){
        errorMessage.textContent = "O nome deve possuir de 3 a 120 caracteres";
        dataIsValid = false;
    }
    
    return dataIsValid;
}

function savePessoa(data){
    const pessoasVetor = JSON.parse(localStorage.getItem('pessoas')) || [];

    pessoasVetor.push(data);

    localStorage.setItem('pessoas', JSON.stringify(pessoasVetor));
}

function showData(event){
    event.preventDefault();
    
    const data = collectData();
    const pessoa = {nome: data.nomeElement.value, 
                    dataNascimento: formatDate(data.dataNascimentoElement.value)};

    if (validatePessoa(pessoa)){
        savePessoa(pessoa);

        var table = document.getElementById("tabela-pessoas").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        // var cell3 = newRow.insertCell(2);
        cell1.innerHTML = pessoa.nome;
        cell2.innerHTML = pessoa.dataNascimento;
        // cell3.innerHTML = "";
    }else{
        const modalContainer = document.getElementsByClassName("modal-container")[0];

        modalContainer.style.opacity = "100%";
        modalContainer.style.pointerEvents = "all";
    }
}

const btnSubmit = document.getElementById("btn-submit");
const btnCloseModal = document.querySelector(".modal button");

btnSubmit.addEventListener('click', showData);
btnCloseModal.addEventListener('click', function(){
    const modalContainer = document.getElementsByClassName("modal-container")[0];

    modalContainer.style.opacity = "0%";
    modalContainer.style.pointerEvents = "none";
});