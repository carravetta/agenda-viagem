
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
    console.log(novoAgendamento);
    
    return novoAgendamento
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
            return {messagem: "Agendamento efetuado com sucesso!"}
        }
    });
   
    return {message: "Valores invalidos"}
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
            
        
            tr.setAttribute("data-aos", "fade-left");
            tr.setAttribute("data-aos-delay", delay);
            
            delay+=50;
            thIndex.innerHTML = index++;
            thNome.innerHTML = agenda.agendamentos[x]._user._nome
            tdSaida.innerHTML = dateFormat(agenda.agendamentos[x]._dataSaida);
            tdHora.innerHTML = agenda.agendamentos[x]._hora;
            tdRetorno.innerHTML = dateFormat(agenda.agendamentos[x]._dataRetorno);
            tdHoraRetorno.innerHTML = agenda.agendamentos[x]._horaRetorno;

            tbody.appendChild(tr);
            tr.appendChild(thIndex);
            tr.appendChild(thNome);
            tr.appendChild(tdSaida);
            tr.appendChild(tdHora);
            tr.appendChild(tdRetorno);
            tr.appendChild(tdHoraRetorno);
        }
    }
}

const dateFormat = (date)=>{
    const [ano, mes, dia] = date.split('-');
    let data = new Date(ano, mes-1, dia);
    return data.toLocaleDateString('pt-BR');
}
verificaLogin();
montaTabela();
novoAgendamento();