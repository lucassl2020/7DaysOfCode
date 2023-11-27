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

function showData(event){
    event.preventDefault();
    
    const data = collectData();
    const [nome, dataNascimento] = [data.nomeElement.value, formatDate(data.dataNascimentoElement.value)];
    const textElement = document.getElementById("print");

    if (nome != '' && dataNascimento != ''){
        textElement.textContent = `${nome} nasceu em ${dataNascimento}`; 
        textElement.style.display = "block";
    }
}