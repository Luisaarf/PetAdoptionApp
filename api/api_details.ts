import { AnimalDataResponse } from "../types/AnimalData";

const GetAnimalDetail = async (pet: AnimalDataResponse, token : string,type : string) =>  {


    const encodedToken = encodeURIComponent(token);
    const headers = new Headers({
        "Content-Type" : "application/json",
        "Authorization" : type + ' ' + encodedToken
    });

    const baseUrl = `https://tools.lab.ianclive.com/test-mobile-api/animals/${pet.id.toString()}`;

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

export default GetAnimalDetail;