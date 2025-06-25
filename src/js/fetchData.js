

/*
 * to get api file:
 * 1- store file in github 
 * 2- https://cdn.jsdelivr.net/gh/<github-username>/<gtihub-repository>/<filename>.json
 * 3- open this url in browser if see data => your api store success
`*/

function fetchData (){
    return new Promise(resovle => {
        fetch('https://cdn.jsdelivr.net/gh/smmhnp/musicPlayerData/data.json')
            .then(response => response.json())
            .then(data => resovle(data))
    })
}

export default fetchData