AOS.init();

const btnAgendamento = document.querySelector(".header-button");
const modal = document.querySelector(".novo-agendamento");

const btnCancel = document.querySelector(".btn-cancel");
const btnSalvar = document.querySelector('.btn-salvar');

btnAgendamento.addEventListener("click", e=>{
    modal.showModal();
});

btnCancel.addEventListener("click", ()=>{
    modal.close();
});

btnSalvar.addEventListener("click", ()=>{
    modal.close();
});




//-----------------------------------------------

