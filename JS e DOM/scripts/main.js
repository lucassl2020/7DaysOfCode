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

function validateData(data){
    let dataIsValid = true;
    const errorMessage = document.getElementById("error-message");

    if (data.nome.length === 0 || data.dataNascimento.length === 0){
        errorMessage.textContent = "Preencha todos os campos";
        dataIsValid = false;
    }else if (data.nome.length < 3 || 120 <  data.nome.length){
        errorMessage.textContent = "O nome deve possuir de 3 a 120 caracteres";
        dataIsValid = false;
    }else if (!(/^[a-zA-Z\s]+$/.test(data.nome))){
        errorMessage.textContent = "O nome deve conter apenas letras e espaços";
        dataIsValid = false;
    }
    
    return dataIsValid;
}

function showData(event){
    event.preventDefault();
    
    const data = collectData();
    const [nome, dataNascimento] = [data.nomeElement.value, formatDate(data.dataNascimentoElement.value)];

    if (validateData({nome, dataNascimento})){
        const textElement = document.getElementById("print");

        textElement.textContent = `${nome} nasceu em ${dataNascimento}`; 
        textElement.style.display = "block";
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