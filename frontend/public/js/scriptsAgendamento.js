

AOS.init();
const loadData = async ()=>{    
    const response = await fetch("http://localhost:3000/agendamentos", {
        method: 'GET',
        credentials: "include"
    });

    const agenda = await response.json();    
    return agenda;
}

const getUser = async()=>{
    const response = await fetch("http://localhost:3000/login", {
        method: 'GET',
        credentials: "include"
    });
    
    return await response.json();
}

const fetchAdionaData = async()=>{
    const response = await fetch('http://localhost:3000/agendamentos', {
        method : 'POST',
        credentials: 'include', // para enviar os cookies
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify({
            dataSaida: document.querySelector('.dt-saida').value,
            hora: document.querySelector('.hr-saida').value,
            dataRetorno: document.querySelector('.dt-retorno').value,
            horaRetorno: document.querySelector('.hr-retorno').value
        })
    });

    const novoAgendamento = await response.json();
    
    return novoAgendamento
}

const fetchUpdate = async(id, dados)=>{
    console.log("entrei no fetchUpdate");
     const response = await fetch(`http://localhost:3000/agendamentos/:${id}`, {
        method : 'PUT',
        credentials: 'include', // para enviar os cookies
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify({
            dataSaida: dados[0].textContent,
            hora: dados[1].textContent,
            dataRetorno: dados[2].textContent,
            horaRetorno: dados[3].textContent
        })
    });

    const novaData = await response.json();
    return novaData;
}

const criaAviso = (mensagem)=>{
    
}


const novoAgendamento = async ()=>{
    
    const btnSalvar = document.querySelector('.btn-salvar');

    btnSalvar.addEventListener('click', async()=>{
       
        const novaData = await fetchAdionaData();
        if(novaData){
            document.querySelector('tbody').innerHTML = "";
            await montaTabela();
            return {message: "Agendamento efetuado com sucesso!"}
        }
    });
   
    return {message: "Valores invalidos"}
}

const atualizaAgendamento = async ()=>{

    const btnAtualizar = document.querySelector('.btn-atualizar');
    
    btnAtualizar.addEventListener('click', async()=>{
        var element = document.querySelectorAll(".form-edit input")
        const dados = Array.from(element);
        const atualizaData = await fetchUpdate(dados[4].value, dados);

        if(atualizaData){
            document.querySelector('tbody').innerHTML = "";
            await montaTabela();
            return {message: "Agendamento atualizado!" }
        }
    });
    return {message: "valores inválidos"}
}

const verificaLogin = async()=>{
    const user = await getUser();

    if(user.message){
        window.location.href = '/'
    }
}

const montaTabela = async () =>{
    const usuarioLogado = document.querySelector('.header-user');
    const user = await getUser();
    const agenda = await loadData();     
    let delay = 300;
    const tbody = document.querySelector('tbody');
    let index =1;
    
    if(agenda){
        usuarioLogado.innerHTML = user.email;
        for(var x = agenda.agendamentos.length-1; x>=0; x--){            
          
            const tr = document.createElement('tr');
            const thIndex = document.createElement('th'); 
            const thNome = document.createElement('th');
            const tdSaida = document.createElement('td');    
            const tdHora = document.createElement('td'); 
            const tdRetorno = document.createElement('td');
            const tdHoraRetorno = document.createElement('td'); 
            const tdId = document.createElement('td');
        
            tr.setAttribute("data-aos", "fade-left");
            tr.setAttribute("data-aos-delay", delay);
            tdId.hidden = true;
            
            delay+=50;
            thIndex.innerHTML = index++;
            thNome.innerHTML = agenda.agendamentos[x]._user._nome
            tdSaida.innerHTML = dateFormat(agenda.agendamentos[x]._dataSaida, "-");
            tdHora.innerHTML = agenda.agendamentos[x]._hora;
            tdRetorno.innerHTML = dateFormat(agenda.agendamentos[x]._dataRetorno, "-");
            tdHoraRetorno.innerHTML = agenda.agendamentos[x]._horaRetorno;
            tdId.innerHTML = agenda.agendamentos[x]._id;
            
                        
            tbody.appendChild(tr);
            tr.appendChild(thIndex);
            tr.appendChild(thNome);
            tr.appendChild(tdSaida);
            tr.appendChild(tdHora);
            tr.appendChild(tdRetorno);
            tr.appendChild(tdHoraRetorno);
            tr.appendChild(tdId);
        }
    }

    tableAddEditEvent();
    atualizaAgendamento();
}

const tableAddEditEvent = ()=>{ // 
   const tableElements = document.querySelectorAll("tbody tr");
    const modalEditaAgendamento = document.querySelector(".modal-alteracao");
    tableElements.forEach((element, index)=>{
        element.addEventListener("click", e=>{
    
            preencheEditModal(element);
            modalEditaAgendamento.showModal();  
        });
    });
}

const preencheEditModal = (trElement) =>{
    let dados = trElement.children; 
    document.querySelector('.new-dt-saida').value = dateFormat (dados[2].textContent, "/");
    document.querySelector('.new-hr-saida').value = dados[3].textContent;
    document.querySelector('.new-dt-retorno').value = dateFormat (dados[4].textContent, "/");
    document.querySelector('.new-hr-retorno').value = dados[5].textContent;
    document.querySelector('.id').value = dados[6].textContent;
    
    dados = Array.from(dados);
    return dados.slice(1, 7);
}

const dateFormat = (date, split)=>{
    const [ano, mes, dia] = date.split(split);
    var data = null;
    if(ano == new Date().getFullYear()){
        data = new Date(ano, mes-1, dia);
        return data.toLocaleDateString('pt-BR');
    }else{ //utilizara apenas no edita agendamento
        const [dia, mes, ano] = date.split(split);
        return `${ano}-${mes}-${dia}`;
    }

}


verificaLogin();
montaTabela();
novoAgendamento();