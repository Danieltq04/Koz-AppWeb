
const GetAdopciones = () => {
    let url = "https://servidor-refugio.herokuapp.com/api/adopciones";
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

export default GetAdopciones;

