//Age in Days
//freecodecamp.org
let age = ()=>{
    let age1;
    var birthYear = prompt("What is your birth year?");
    age1 = (2020-birthYear)*365;
    let h1 = document.createElement("h1");
    var result = document.createTextNode("You are "+age1+" days old");
    h1.setAttribute("id","ageInDays");
    h1.appendChild(result);
    document.getElementById("result").appendChild(h1);
}
let reset = ()=>{
    document.getElementById("ageInDays").remove();
}
let generate = ()=>{
    let image = document.createElement("img");
    let div = document.getElementById("catimg");
    image.src = "../Images/cat.jpg"
    div.appendChild(image);
}
let game = (yourChoice)=>{
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = randToChoice(randGenerator());
    console.log(humanChoice);
    console.log(botChoice);
    console.log(getWinner(humanChoice,botChoice));
    frontEnd(humanChoice,botChoice,getMessage(getWinner(humanChoice,botChoice)));
}
randGenerator = ()=>{
    return Math.floor(Math.random()*3);
}
randToChoice = (number)=>{
    return ['rock','paper','scissor'][number];
}
getWinner = (humanChoice, botChoice)=>{
    var dataBase = {
        "rock":{"scissor":1, "rock":0.5, "paper":0},
        "paper":{"rock":1, "paper":0.5, "scissor":0},
        "scissor":{"paper":1, "scissor":0.5, "rock":0},
    }
    var human = dataBase[humanChoice][botChoice];
    var bot = dataBase[botChoice][humanChoice];
    return [human,bot];
}
getMessage = ([humanChoice,botChoice])=>{
    if(humanChoice==0)
        return {"message":"You Lost", "human-color":"red", "bot-color":"green"};
    else if(humanChoice==1)
        return {"message":"You Won", "human-color":"green", "bot-color":"red"};
    else if(humanChoice==0.5)
        return {"message":"Tied", "human-color":"yellow", "bot-color":"yellow"};
}
frontEnd = (humanChoice, botChoice, finalMessage)=>{
    var dataBase = {
        "rock" : document.getElementById('rock').src,
        "paper" : document.getElementById('paper').src,
        "scissor" : document.getElementById('scissor').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src= '"+dataBase[humanChoice]+"' style='box-shadow: 20px 30px 50px "+finalMessage["human-color"]+"';>";
    console.log(humanDiv);
    messageDiv.innerHTML = "<h1 style=color:" + finalMessage["human-color"] + ";>" + finalMessage["message"]+"</h1>";
    botDiv.innerHTML = "<img src= '"+dataBase[botChoice]+"' style='box-shadow: 20px 30px 50px "+finalMessage["bot-color"]+"';>";
    document.getElementById("res").appendChild(humanDiv);
    document.getElementById("res").appendChild(messageDiv);
    document.getElementById("res").appendChild(botDiv);
    console.log(finalMessage);
}
let refresh = ()=>{
    window.location.reload("Refresh");
}