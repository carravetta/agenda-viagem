
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

        const user = await fetchLogin();
    
        if(user.token){
            window.location.href = "http://127.0.0.1:5500/frontend/public/view/index.html"
            return user;
        }else{         
            return user.message;
        }
    });
}
 
button();