const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener('click', showData);

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

    // ADD MODAL ERROR TO EVERY VALIDATION
    if (data.nome.length === 0 || data.dataNascimento.length === 0){
        dataIsValid = false;
    }else if (data.nome.length < 3 || 120 <  data.nome.length){
        dataIsValid = false;
    }else if (!(/^[a-zA-Z\s]+$/.test(data.nome))){
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
    }
}