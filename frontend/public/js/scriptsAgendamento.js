const loadData = async ()=>{
    const response = await fetch("http://localhost:3000/agendamentos", {
        method: 'GET',
        credentials: "include"
    });
    const agenda = await response.json();
    return agenda;
}

const montaTabela = async () =>{
    
}