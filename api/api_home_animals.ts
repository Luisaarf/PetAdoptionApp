//         "id": "1",
//         "categoryId": "1",
//         "name": "Oriental",
//         "age": 7,
//         "img": "http://loremflickr.com/640/480/animals?lock=1"


const GetAllAnimals = async (token : string,type : string) =>  {


    const encodedToken = encodeURIComponent(token);
    const headers = new Headers({
        "Content-Type" : "application/json",
        "Authorization" : type + ' ' + encodedToken
    });

    const baseUrl = "https://tools.lab.ianclive.com/test-mobile-api/animals";

    var requestOptions = {
    method:'GET',
    headers: headers,
    redirect: 'follow',
    };

    try {
        const response = await fetch(baseUrl, requestOptions)
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição'); 
        }
        const data = await response.json(); 
        return data;
    } catch (error : any) { return error }
}

export default GetAllAnimals;