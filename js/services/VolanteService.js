
const GetAlquileres = (idCliente) => {
    let url = "https://servidor-refugio.herokuapp.com/api/volantes";
    return fetch(url, {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',

        },

    })
            .then(response => { 
                return response.json()
            })
            .then(json => {
                return json;
            })
            .catch(err => console.log('ERROR: ' + err))
}

export default GetAlquileres;

