
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
    console.log(login);
        return login;  
   }
}

const button = ()=>{
    const buttonSubmit = document.querySelector('button');
   
    buttonSubmit.addEventListener('click', async (event)=>{
        event.preventDefault();

        const token = await fetchLogin();
    
        if(token){
            window.location.href = "/view/index.html"
            return token;
        }else{         
            return {message: 'usuário inválido'};
        }
    });
}
 
button();