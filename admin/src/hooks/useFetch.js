const fetchWithoutToken = async (endpoint, method= "GET", data) => {
   
    const apiUrlBase = "http://localhost:3030/api"; 
    const url = `${apiUrlBase}${endpoint}`;

    let response;

    if(method === "GET"){
        let opts = {
            headers: {
              'mode':'cors'
            }
          }
        response = await fetch(url, opts);
    }

    if(method === "POST"){
        response = await fetch(url,{
            method,
            body : JSON.stringify(data),
            headers : {
                "Content-type" : "application/json"
            }
        })
    }

   
    let result = await response.json();
   
    return result
}

const useFetchWithToken = async (endpoint, method= "GET", token, data) => {
   
    const apiUrlBase = process.env.REACT_APP_API_URL_BASE; 
    const url = `${apiUrlBase}${endpoint}`;

    let response;

    if(method === "GET"){
        response = await fetch(url,{
            method,
            headers : {
                Authorization : token
            }
        });
    }

    if(method === "POST"){
        response = await fetch(url,{
            method,
            body : JSON.stringify(data),
            headers : {
                "Content-type" : "application/json",
                Authorization : token
            }
        })
    }

   
    let result = await response.json();
  
   
    return result
}

export {
    fetchWithoutToken,
    useFetchWithToken
}
