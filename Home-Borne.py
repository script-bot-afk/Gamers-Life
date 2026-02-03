import random

# Player stats
money = 5
hunger = 5
energy = 5
day = 1

def show_stats():
    print(f"\nDay {day} Stats: Money=${money}, Hunger={hunger}/10, Energy={energy}/10\n")

def check_game_over():
    if hunger <= 0:
        print("You starved... Game Over!")
        return True
    if energy <= 0:
        print("You collapsed from exhaustion... Game Over!")
        return True
    if money < 0:
        print("You're broke and can't survive... Game Over!")
        return True
    return False

def morning():
    global money, energy
    print("Morning: What will you do?")
    print("1) Go to the homeless shelter (+Energy, -$1 donation)")
    print("2) Beg on the street (chance to earn money, -Energy)")
    choice = input("> ")
    if choice == "1":
        energy += 3
        money -= 1
        print("You rested a bit at the shelter.")
    elif choice == "2":
        energy -= 2
        earned = random.randint(0, 5)
        money += earned
        print(f"You begged and earned ${earned}.")
    else:
        print("Invalid choice, you wasted time.")
        energy -= 1

def afternoon():
    global money, hunger
    print("\nAfternoon: What will you do?")
    print("1) Spend money on food (+Hunger, -Money)")
    print("2) Gamble (risk losing or gaining money)")
    choice = input("> ")
    if choice == "1":
        if money > 0:
            hunger += 3
            money -= 2
            print("You ate some food. Yum!")
        else:
            print("No money to buy food. Hunger increases!")
            hunger -= 2
    elif choice == "2":
        gamble = random.randint(-5, 5)
        money += gamble
        if gamble >= 0:
            print(f"You gambled and won ${gamble}!")
        else:
            print(f"You gambled and lost ${-gamble}!")
    else:
        print("Invalid choice, you wasted time.")
        hunger -= 1

def evening():
    global energy, hunger, money
    print("\nEvening: Where will you sleep?")
    print("1) Sleep in the shelter (+Energy, safe)")
    print("2) Sleep on the street (-Energy, chance for random event)")
    choice = input("> ")
    if choice == "1":
        energy += 3
        print("You slept safely at the shelter.")
    elif choice == "2":
        energy -= 3
        event = random.choice(["rain", "kind stranger", "stolen wallet"])
        if event == "rain":
            hunger -= 1
            print("It rained and you got wet. Hunger increases slightly.")
        elif event == "kind stranger":
            money += 2
            print("A kind stranger gave you $2!")
        elif event == "stolen wallet":
            money -= 3
            print("Someone stole $3 from you!")
    else:
        print("Invalid choice, you wasted the night.")
        energy -= 2

# Game loop
while True:
    show_stats()
    morning()
    if check_game_over():
        break
    afternoon()
    if check_game_over():
        break
    evening()
    if check_game_over():
        break
    day += 1
    # Slowly increase hunger to add challenge
    hunger -= 1
    print("\n--- End of Day ---\n")
