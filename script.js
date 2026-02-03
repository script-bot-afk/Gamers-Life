let stats = {
    money: 20,
    hunger: 5,
    energy: 12,
    day: 1,
    gamingTime: 0,
    showers: 0,
    ateBeforeSleep: false // tracks if the player ate immediately before sleeping
};

function updateStats() {
    document.getElementById("stats").innerHTML =
        `Day ${stats.day} | Money: $${stats.money} | Hunger: ${stats.hunger}/10 | Energy: ${stats.energy}/12 | Gaming Hours: ${stats.gamingTime} | Showers: ${stats.showers}/3`;
}

function checkGameOver() {
    if (stats.hunger <= 0) { alert("You starved... Game Over!"); return true; }
    if (stats.energy <= 0) { alert("You collapsed... Game Over!"); return true; }
    if (stats.money < 0) { alert("You're broke... Game Over!"); return true; }
    return false;
}

// Shower only triggers if player ate immediately before sleeping
function tryShower() {
    if (stats.ateBeforeSleep) {
        if (Math.random() < 0.7) { // 70% chance
            stats.showers++;
            alert("You took a refreshing shower! (" + stats.showers + "/3)");
            if (stats.showers >= 3) {
                stats.energy = 12;
                stats.hunger = 10;
                stats.showers = 0;
                alert("After 3 showers, you feel fully refreshed! Energy and Hunger maxed!");
            }
        }
        stats.ateBeforeSleep = false; // reset flag after shower check
    }
}

function morning() {
    const story = "Morning: What will you do first?";
    const choices = [
        { text: "Play video games for 2 hours (-3 Hunger, -1 Energy, +2 Gaming Hours)", action: () => {
            stats.hunger -= 3;
            stats.energy -= 1;
            stats.gamingTime += 2;
            stats.ateBeforeSleep = false;
            nextPhase();
        }},
        { text: "Eat breakfast (+2 Hunger, -$3)", action: () => {
            if (stats.money >= 3) { stats.hunger += 2; stats.money -= 3; stats.ateBeforeSleep = true; }
            else { alert("Not enough money!"); stats.hunger -= 1; stats.ateBeforeSleep = false; }
            nextPhase();
        }},
        { text: "Sleep (+Energy to max 12)", action: () => {
            stats.energy = 12;
            tryShower();
            nextPhase();
        }}
    ];
    showPhase(story, choices);
}

function afternoon() {
    const story = "Afternoon: What will you do?";
    const choices = [
        { text: "Play video games for 2 hours (-3 Hunger, -1 Energy, +2 Gaming Hours)", action: () => {
            stats.hunger -= 3;
            stats.energy -= 1;
            stats.gamingTime += 2;
            stats.ateBeforeSleep = false;
            nextPhase();
        }},
        { text: "Eat lunch (+2 Hunger, -$5)", action: () => {
            if (stats.money >= 5) { stats.hunger += 2; stats.money -= 5; stats.ateBeforeSleep = true; }
            else { alert("Not enough money!"); stats.hunger -= 1; stats.ateBeforeSleep = false; }
            nextPhase();
        }},
        { text: "Go for a walk (+1 Energy, -1 Hunger)", action: () => {
            stats.energy += 1;
            stats.hunger -= 1;
            stats.ateBeforeSleep = false;
            nextPhase();
        }}
    ];
    showPhase(story, choices);
}

function evening() {
    const story = "Evening: How will you end your day?";
    const choices = [
        { text: "Play video games for 2 hours (-3 Hunger, -1 Energy, +2 Gaming Hours)", action: () => {
            stats.hunger -= 3;
            stats.energy -= 1;
            stats.gamingTime += 2;
            stats.ateBeforeSleep = false;
            nextDay();
        }},
        { text: "Eat dinner (+2 Hunger, -$7)", action: () => {
            if (stats.money >= 7) { stats.hunger += 2; stats.money -= 7; stats.ateBeforeSleep = true; }
            else { alert("Not enough money!"); stats.hunger -= 1; stats.ateBeforeSleep = false; }
            nextDay();
        }},
        { text: "Sleep (+Energy to max 12)", action: () => {
            stats.energy = 12;
            tryShower();
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

    // Every 2 days: bill for gaming
    if (stats.day % 2 === 0 && stats.gamingTime > 0) {
        let bill = stats.gamingTime * 1; // $1 per hour played
        stats.money -= bill;
        alert(`You got billed $${bill} for ${stats.gamingTime} hours of gaming!`);
        stats.gamingTime = 0; // reset for next 2-day cycle
    }

    currentPhase = "morning";
    morning();
}

let currentPhase = "morning";
morning();
