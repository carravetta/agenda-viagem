
const loadData = async ()=>{
    const response = await fetch("http://localhost:3000/agendamentos", {
        method: 'GET',
        credentials: "include"
    });
      
    const agenda = await response.json();    
    
    return agenda;
}

const novoAgendamento = async(newDate)=>{

}

const montaTabela = async () =>{

    const agenda = await loadData();   
    let delay = 300;
    const tbody = document.querySelector('tbody');

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
        thNome.innerHTML = agenda.user.nome
        tdSaida.innerHTML = element._dataSaida;
        tdHora.innerHTML = element._hora;
        tdRetorno.innerHTML = element._dataRetorno;
        tdHoraRetorno.innerHTML = "17:30";

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