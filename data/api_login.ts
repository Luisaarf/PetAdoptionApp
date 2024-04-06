const GetAuth = (email : string, password : string) => {
    const headers = new Headers({
        "Content-Type" : "application/json"
    });
        
    const form = {
        "username": email,
        "password": password
    }

    var requestOptions = {
    method:'POST',
    headers: headers,
    redirect: 'follow',
    body: JSON.stringify(form)
    };
    var resultStatus : number;
    var result : JSON;

    fetch("https://tools.lab.ianclive.com/test-mobile-api/auth/signin", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error',error));
    
}

export default GetAuth;