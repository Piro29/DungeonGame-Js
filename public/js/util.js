
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function isCollided(rect1, rect2) {
    return (
        rect1.x + rect1.w >= rect2.position.x &&
        rect1.x <= rect2.position.x + rect2.w &&
        rect1.y <= rect2.position.y + rect2.h &&
        rect1.y + rect1.h >= rect2.position.y
    )
}

function isEnemyNear(rect1, rect2) {
    return (
        rect1.x + rect1.w >= rect2.position.x - 25 &&
        rect1.x <= rect2.position.x + rect2.w + 25 &&
        rect1.y <= rect2.position.y + rect2.h + 25 &&
        rect1.y + rect1.h >= rect2.position.y - 25
    )
}

function getHighestLevel(){
    fetch(URL).then((data) =>{
        return data.json()
    })
    .then((parseData)=>{
        highestLevel = +parseData.highlevel
    })
    .catch((err) =>{
        alert("Could Not fetch highest Level")
        
    })
}

function setHighestLevel(){
    fetch(URL, {
        method : "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "highlevel": level
        }),
    })
}