import api_key from "./api_key";

export async function cadastrarUsuarioApi(usuario) {
    try {
        console.log("Cadastro");
        const response = await fetch(
            "http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key
                },
                body: JSON.stringify(usuario)
            }
        );
    } catch(excecao) {
        console.log(excecao);
    }
}

export async function loginApi(credenciais) {
    try {
        console.log("Login");
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/authenticate/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key
                },
                body: JSON.stringify(credenciais)
            }
        );
        return await response.json();
    } catch(excecao) {
        console.log(excecao);
    }
}