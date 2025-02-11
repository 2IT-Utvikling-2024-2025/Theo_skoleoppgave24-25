import random
import time

# Funksjon for å lage en kortstokk
def create_deck():
    suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
    deck = [{'rank': rank, 'suit': suit} for suit in suits for rank in ranks]
    random.shuffle(deck)
    return deck

# Funksjon for å beregne verdien av en hånd
def calculate_hand_value(hand):
    value = 0
    aces = 0
    for card in hand:
        if card['rank'] in ['Jack', 'Queen', 'King']:
            value += 10
        elif card['rank'] == 'Ace':
            value += 11
            aces += 1
        else:
            value += int(card['rank'])

    while value > 21 and aces:
        value -= 10
        aces -= 1

    return value

# Funksjon for å vise en hånd
def display_hand(hand):
    for card in hand:
        print(f"{card['rank']} of {card['suit']}")
        time.sleep(0.5)  # Legg til pause for dramatisk effekt

# Hovedfunksjon for spillet
def blackjack():
    while True:
        print("\nWelcome to Blackjack!")
        deck = create_deck()

        # Gi ut kort til spiller og dealer
        player_hand = [deck.pop(), deck.pop()]
        dealer_hand = [deck.pop(), deck.pop()]

        print("\nDealer's visible card:")
        print(f"{dealer_hand[1]['rank']} of {dealer_hand[1]['suit']}")

        # Spilleren sin tur
        while True:
            print("\nYour hand:")
            display_hand(player_hand)
            player_value = calculate_hand_value(player_hand)
            print(f"Your hand value: {player_value}")

            if player_value > 21:
                print("You busted! Dealer wins.")
                break

            choice = input("Do you want to (H)it or (S)tand? ").strip().lower()
            if choice == 'h':
                player_hand.append(deck.pop())
            elif choice == 's':
                break
            else:
                print("Invalid choice, please type 'H' or 'S'.")

        if player_value > 21:
            if not play_again():
                break
            continue

        # Dealer sin tur
        print("\nDealer's hand:")
        display_hand(dealer_hand)
        dealer_value = calculate_hand_value(dealer_hand)
        print(f"Dealer's hand value: {dealer_value}")

        while dealer_value < 17:
            print("Dealer hits.")
            time.sleep(1)  # Legg til pause for dramatisk effekt
            dealer_hand.append(deck.pop())
            dealer_value = calculate_hand_value(dealer_hand)
            print("\nDealer's hand:")
            display_hand(dealer_hand)
            print(f"Dealer's hand value: {dealer_value}")

        # Resultat
        if dealer_value > 21:
            print("Dealer busted! You win.")
        elif player_value > dealer_value:
            print("You win!")
        elif player_value < dealer_value:
            print("Dealer wins.")
        else:
            print("It's a tie!")

        if not play_again():
            break

# Funksjon for å spørre om å spille igjen
def play_again():
    while True:
        choice = input("\nDo you want to play again? (Y/N): ").strip().lower()
        if choice == 'y':
            return True
        elif choice == 'n':
            print("Thanks for playing! Goodbye.")
            return False
        else:
            print("Invalid choice, please type 'Y' or 'N'.")

if __name__ == "__main__":
    blackjack()
