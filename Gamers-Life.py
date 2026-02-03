import random

# Player stats
money = 20
hunger = 5
energy = 12
day = 1
gaming_time = 0

def show_stats():
    print(f"\nDay {day} | Money=${money} | Hunger={hunger}/10 | Energy={energy}/12 | Gaming Hours={gaming_time}")

def check_game_over():
    if hunger <= 0:
        print("You starved... Game Over!")
        return True
    if energy <= 0:
        print("You collapsed from exhaustion... Game Over!")
        return True
    if money < 0:
        print("You're broke... Game Over!")
        return True
    return False

def morning():
    global money, hunger, energy, gaming_time
    print("\nMorning: What will you do?")
    print("1) Play video games for 2 hours (-3 Hunger, -1 Energy, +2 Gaming Hours)")
    print("2) Eat breakfast (+2 Hunger, -$3)")
    print("3) Sleep (+Energy to max 12)")
    choice = input("> ")
    if choice == "1":
        hunger -= 3
        energy -= 1
        gaming_time += 2
        print("You played some games!")
    elif choice == "2":
        if money >= 3:
            hunger += 2
            money -= 3
            print("You ate breakfast.")
        else:
            hunger -= 1
            print("Not enough money! You skipped breakfast.")
    elif choice == "3":
        energy = 12
        print("You slept and restored your energy.")
    else:
        print("Invalid choice, you wasted the morning.")
        energy -= 1

def afternoon():
    global money, hunger, energy, gaming_time
    print("\nAfternoon: What will you do?")
    print("1) Play video games for 2 hours (-3 Hunger, -1 Energy, +2 Gaming Hours)")
    print("2) Eat lunch (+2 Hunger, -$5)")
    print("3) Go for a walk (+1 Energy, -1 Hunger)")
    choice = input("> ")
    if choice == "1":
        hunger -= 3
        energy -= 1
        gaming_time += 2
        print("You played some games!")
    elif choice == "2":
        if money >= 5:
            hunger += 2
            money -= 5
            print("You ate lunch.")
        else:
            hunger -= 1
            print("Not enough money! You skipped lunch.")
    elif choice == "3":
        energy += 1
        hunger -= 1
        print("You went for a walk and refreshed yourself.")
    else:
        print("Invalid choice, you wasted the afternoon.")
        energy -= 1

def evening():
    global money, hunger, energy, gaming_time, day
    print("\nEvening: What will you do?")
    print("1) Play video games for 2 hours (-3 Hunger, -1 Energy, +2 Gaming Hours)")
    print("2) Eat dinner (+2 Hunger, -$7)")
    print("3) Sleep (+Energy to max 12)")
    choice = input("> ")
    if choice == "1":
        hunger -= 3
        energy -= 1
        gaming_time += 2
        print("You played some games!")
    elif choice == "2":
        if money >= 7:
            hunger += 2
            money -= 7
            print("You ate dinner.")
        else:
            hunger -= 1
            print("Not enough money! You skipped dinner.")
    elif choice == "3":
        energy = 12
        print("You slept and restored your energy.")
    else:
        print("Invalid choice, you wasted the evening.")
        energy -= 1

    day += 1
    # Every 2 days: pay bill for gaming time
    if day % 2 == 0 and gaming_time > 0:
        bill = gaming_time * 1  # $1 per gaming hour
        money -= bill
        print(f"You got billed ${bill} for {gaming_time} hours of gaming!")
        gaming_time = 0

# Game loop
while True:
    show_stats()
    morning()
    if check_game_over():
        break
    show_stats()
    afternoon()
    if check_game_over():
        break
    show_stats()
    evening()
    if check_game_over():
        break
