const fetchLogin = async()=>{
    
    const response = await fetch('http://localhost:3000/login', {
        method : 'POST',
        credentials: 'include', // para enviar os cookies
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify({
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        })
    });

   const login = await response.json();
   

   if(login === null || login === undefined){
        return "Usuario inválido!"
   }else{
        return login;  
   }
}

const loadPage = async()=>{
    try{
        const response = await fetch("http://localhost:3000/login", {
            method: 'GET',
            credentials: "include"
        });
        
        const user = await response.json();
        console.log(user.ok);
        
    if(!user.message)
        return window.location.href = "/view/index.html";
 
    }catch(error){
        console.log("Erro ao verificar autenticação", error);
    }
    const modal = document.querySelector("dialog");
    modal.showModal();
}

const buttonLogin = ()=>{
    const buttonSubmit = document.querySelector('.btn-logar');
    
    buttonSubmit.addEventListener('click', async (event)=>{
        event.preventDefault();

        const token = await fetchLogin();
        console.log(`TOKEN ${JSON.stringify(token)}`);
        
        if(!token.message){
            window.location.href = "/view/index.html"
            return token;
        }else{                         
            return {message: 'usuário inválido'};            
        }
    });
}
loadPage();
buttonLogin();
