const GetCategories = async (token : string,type : string) =>  {

    const encodedToken = encodeURIComponent(token);
    const headers = new Headers({
        "Content-Type" : "application/json",
        "Authorization" : type + ' ' + encodedToken
    });

    var requestOptions = {
    method:'GET',
    headers: headers,
    redirect: 'follow',
    };

    try {
        const response = await fetch("https://tools.lab.ianclive.com/test-mobile-api/categories", requestOptions)
        const data = await response.json(); 
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição'); 
        }
        return data;
    } catch (error : any) { return error }
}

export default GetCategories;
