
const loadData = async ()=>{    
    const response = await fetch("http://localhost:3000/agendamentos", {
        method: 'GET',
        credentials: "include"
    });
      
    const agenda = await response.json();    
    
    return agenda;
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

const novoAgendamento = async ()=>{
    
    const btnSalvar = document.querySelector('.btn-salvar');

    btnSalvar.addEventListener('click', async()=>{
       
        const novaData = await fetchAdionaData();
        if(novaData){
            document.querySelector('tbody').innerHTML = "";
            await montaTabela();
            return {messagem: "Agendamento efetuado com sucesso!"}
        }
    });
   
    return {message: "Valores invalidos"}
}

const montaTabela = async () =>{
    const usuarioLogado = document.querySelector('.header-user');
    const agenda = await loadData();     
    let delay = 300;
    const tbody = document.querySelector('tbody');
    console.log(JSON.stringify(agenda));
    
    usuarioLogado.innerHTML = agenda.agendamentos[0]._user._email;
    agenda.agendamentos.forEach((element, index) => {
       
        
        const tr = document.createElement('tr');
        const thIndex = document.createElement('th'); 
        const thNome = document.createElement('th');
        const tdSaida = document.createElement('td');    
        const tdHora = document.createElement('td'); 
        const tdRetorno = document.createElement('td');
        const tdHoraRetorno = document.createElement('td'); 
        
    
        tr.setAttribute("data-aos", "fade-left");
        tr.setAttribute("data-aos-delay", delay);
        
        delay+=50;
        thIndex.innerHTML = index;
        thNome.innerHTML = element._nome
        tdSaida.innerHTML = element._dataSaida;
        tdHora.innerHTML = element._hora;
        tdRetorno.innerHTML = element._dataRetorno;
        tdHoraRetorno.innerHTML = element._horaRetorno;

        tbody.appendChild(tr);
        tr.appendChild(thIndex);
        tr.appendChild(thNome);
        tr.appendChild(tdSaida);
        tr.appendChild(tdHora);
        tr.appendChild(tdRetorno);
        tr.appendChild(tdHoraRetorno);
    });
}


montaTabela();
novoAgendamento();