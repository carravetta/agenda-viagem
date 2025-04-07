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
   console.log(login);
   
   if(login === null || login === undefined){
        return "Usuario inválido!"
   }else{
        localStorage.setItem('token', login.token);
        return login;
   }
}

const button  = ()=>{
    const buttonSubmit = document.querySelector('button');
    buttonSubmit.addEventListener('click', (event)=>{
        event.preventDefault();
        fetchLogin();     
    })

}

button();