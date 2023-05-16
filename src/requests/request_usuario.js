import api_key from "./api_key";

export async function atualizarSenhaUsuario(usuario) {
    try {
        console.log("Atualização senha");
        const response = await fetch(
            "http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/", {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key
                },
                body: JSON.stringify(usuario)
            }
        );
        console.warn("Senha atualizada com sucesso");
    } catch(excecao) {
        console.log(excecao);
    }
}