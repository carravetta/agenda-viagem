AOS.init();

const btnAgendamento = document.querySelector(".header-button");
const modal = document.querySelector(".novo-agendamento");
const modalEdicao = document.querySelector(".modal-alteracao")
const btnSubmit = document.querySelectorAll(".btn-submit");
//const btnSalvar = document.querySelector('.btn-salvar');

btnAgendamento.addEventListener("click", e=>{
    modal.showModal();
});

btnSubmit.forEach((element, index)=>{
    element.addEventListener("click", ()=>{
        modal.close();
       // modalEdicao.close()
    });
})


//-----------------------------------------------

