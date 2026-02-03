let stats = {
    money: 5,
    hunger: 5,
    energy: 5,
    day: 1
};

function updateStats() {
    document.getElementById("stats").innerHTML =
        `Day ${stats.day} | Money: $${stats.money} | Hunger: ${stats.hunger}/10 | Energy: ${stats.energy}/10`;
}

function checkGameOver() {
    if (stats.hunger <= 0) {
        alert("You starved... Game Over!");
        return true;
    }
    if (stats.energy <= 0) {
        alert("You collapsed from exhaustion... Game Over!");
        return true;
    }
    if (stats.money < 0) {
        alert("You're broke and can't survive... Game Over!");
        return true;
    }
    return false;
}

function morning() {
    const story = "Morning: What will you do?";
    const choices = [
        { text: "Go to the homeless shelter (+Energy, -$1)", action: () => { stats.energy += 3; stats.money -= 1; nextPhase(); } },
        { text: "Beg on the street (chance to earn money, -Energy)", action: () => {
            stats.energy -= 2;
            stats.money += Math.floor(Math.random() * 6); // $0-$5
            nextPhase();
        }}
    ];
    showPhase(story, choices);
}

function afternoon() {
    const story = "Afternoon: What will you do?";
    const choices = [
        { 
            text: "Spend money on food (+Hunger, -$2)", 
            action: () => {
                if (stats.money >= 2) { 
                    stats.hunger += 3; 
                    stats.money -= 2; 
                } else { 
                    stats.hunger -= 2; 
                    alert("Not enough money to buy food!"); 
                }
                nextPhase();
            } 
        },
        { 
            text: "Look for spare change (+$0–$5, -Energy)", 
            action: () => {
                stats.energy -= 2;
                let earned = Math.floor(Math.random() * 6); // $0-$5
                stats.money += earned;
                alert(`You found $${earned} in spare change!`);
                nextPhase();
            }
        }
    ];
    showPhase(story, choices);
}

function evening() {
    const story = "Evening: Where will you sleep?";
    const choices = [
        { text: "Sleep in the shelter (+Energy, safe)", action: () => { stats.energy += 3; nextDay(); } },
        { text: "Sleep on the street (-Energy, chance event)", action: () => {
            stats.energy -= 3;
            const event = ["rain","kind stranger","stolen wallet"][Math.floor(Math.random()*3)];
            if (event === "rain") { stats.hunger -= 1; alert("It rained and you got wet. Hunger -1"); }
            else if (event === "kind stranger") { stats.money += 2; alert("A kind stranger gave you $2!"); }
            else { stats.money -= 3; alert("Someone stole $3!"); }
            nextDay();
        }}
    ];
    showPhase(story, choices);
}

function showPhase(text, choices) {
    updateStats();
    document.getElementById("story").innerText = text;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    choices.forEach(c => {
        const btn = document.createElement("button");
        btn.innerText = c.text;
        btn.onclick = c.action;
        choicesDiv.appendChild(btn);
    });
}

function nextPhase() {
    if (checkGameOver()) return;
    if (currentPhase === "morning") { currentPhase = "afternoon"; afternoon(); }
    else if (currentPhase === "afternoon") { currentPhase = "evening"; evening(); }
}

function nextDay() {
    stats.day++;
    stats.hunger -= 1; // daily hunger increase
    currentPhase = "morning";
    morning();
}

let currentPhase = "morning";
morning();
