let pass = document.getElementById('password')
let icon = document.getElementById('icon')

icon.onclick = () =>{
    if(pass.type == 'text'){
        pass.setAttribute("type", "password")
        icon.setAttribute("src", "../images/eye-open.png")
    }else{
        pass.setAttribute("type", "text")
        icon.setAttribute("src", "../images/eye-close.png")
    }
}

