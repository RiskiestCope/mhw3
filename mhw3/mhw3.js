const mm_key = '0b14df3a5b52dd500c52f3812f1d7724';
const api_endpoint= 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?'; //Necessario richiedere CORS per temporaneo accesso al servizio
const salbums = document.querySelectorAll("#album");

const spotify_id = "1b5e7ca8fb2e4c0ca6f5439e340c82ff";
const spotify_secret = "c7e7f17ee600445680715756c273300a";
let token_data;

const data = fetch("https://accounts.spotify.com/api/token",
    {
    method:"POST",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        'Authorization': 'Basic '+ btoa(spotify_id+":"+spotify_secret)
    },
    body:"grant_type=client_credentials"
}).then(onTokenResponse).then(getToken);



function setListenersAlbums(){
    for(const salbum of salbums){
        salbum.addEventListener("click",searchAlbum);
    }
}
setListenersAlbums();

const STop = document.querySelector("#classifica").addEventListener("click",searchSong);


function onTokenResponse(response_spotify){
    console.log(response_spotify);
    return response_spotify.json();
    
}


function getToken(json)
{
	token_data = json;
	console.log(json);
}

function showAlbum(album){
    document.querySelector("#album_list").innerHTML="";
    const x = album.items
    const song_name = document.getElementById("album").getAttribute("data-song");
    console.log(song_name);
    for(let i=0; i<x.length;i++){
        console.log(x[i].name);
        const newDiv = document.createElement("div");
        const Content = document.createTextNode(x[i].name);
        newDiv.appendChild(Content);
        const currDiv = document.getElementById(`album_list`);
        currDiv.appendChild(newDiv);
    }
}

function searchAlbum(event){

    event.preventDefault();

    const cliccato = event.currentTarget;
    const artista = cliccato.dataset.artist;
    console.log(artista);

    const id = cliccato.dataset.id;
    console.log(id);
    const sptify_result = fetch(`https://api.spotify.com/v1/albums/${id}/tracks`,{
        method:'GET',
        headers:{ 'Authorization' : 'Bearer ' + token_data.access_token}
    }).then(onResponse).then(showAlbum)

}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function showtop(classifica){ console.log(classifica)
    document.querySelector("#dinamico").innerHTML="";
    const x = classifica.message.body.track_list;
    console.log(x);
    for(let i=0;i<x.length;i++){
        console.log(x[i].track.track_name);
        const newDiv = document.createElement("div");
        const Content = document.createTextNode(x[i].track.track_name);
        newDiv.appendChild(Content);
        const currDiv = document.getElementById("dinamico");
        currDiv.appendChild(newDiv);
    } 
}

function searchSong(event){

    event.preventDefault();

    const cliccato = event.currentTarget;

    song_request = api_endpoint +'apikey=' + mm_key + "&chart_name=top&page=1&page_size=5&country=it";  
    console.log(song_request);
    const searchLyric = fetch(song_request).then(onResponse).then(showtop);
    console.log(searchLyric);
}


