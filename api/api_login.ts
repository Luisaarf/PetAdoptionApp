export type AuthForm = {
    username: string,
    password: string
}

const GetAuth = async (databody : AuthForm) =>  {

    const headers = new Headers({
        "Content-Type" : "application/json"
    });

    var requestOptions = {
    method:'POST',
    headers: headers,
    redirect: 'follow',
    body: JSON.stringify(databody), // com username e password
    };

    try {
        const response = await fetch("https://tools.lab.ianclive.com/test-mobile-api/auth/signin", requestOptions)
        const responseStatus = response.status;
        const data = await response.json(); 
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição'); 
        }
        return  {data, responseStatus};
    } catch (error : any) { return error }
}

export default GetAuth;