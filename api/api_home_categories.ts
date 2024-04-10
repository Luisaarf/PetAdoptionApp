// url: {baseURL}/categories
// tipo: GET
// cabeçalhos:
//   - Authorization
// resposta:
// [
//     {
//         "name": "Weimaraner",
//         "id": "1"
//     },
//     ...
// ]


const GetCategories = async () =>  {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…yMTZ9.ONHYVg50rV2FJj4-bxFFq6Q74KDaYc-okP6euAAG57E';
    const encodedToken = encodeURIComponent(token);
    const headers = new Headers({
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + encodedToken

    });

    var requestOptions = {
    method:'GET',
    headers: headers,
    redirect: 'follow',
    };

    try {
        const response = await fetch("https://tools.lab.ianclive.com/test-mobile-api/categories", requestOptions)
        console.log('Resposta:', response);
        const data = await response.json(); 
        console.log( 'Data:', data)
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição'); 
        }
        return data;
    } catch (error : any) { return error }
}

export default GetCategories;
