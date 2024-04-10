// url: {baseURL}/animals
// tipo: GET
// cabeçalhos:
//   - Authorization
// resposta:
// [
//     {
//         "id": "1",
//         "categoryId": "1",
//         "name": "Oriental",
//         "age": 7,
//         "img": "http://loremflickr.com/640/480/animals?lock=1"

//     },
//     ...
// ]

export type AuthForm = {
    username: string,
    password: string
}

const GetAllAnimals = async (databody : AuthForm) =>  {

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
        console.log('Resposta:', response);
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição'); 
        }
        const data = await response.json(); 
        return data;
    } catch (error : any) { return error }
}

export default GetAllAnimals;