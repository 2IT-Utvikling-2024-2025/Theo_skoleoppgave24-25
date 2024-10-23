import tkinter as tk

def hent_input():
    brukers_input = input_felt.get()
    print(f"Brukeren skrev: {brukers_input}")

# Opprett hovedvinduet
root = tk.Tk()
root.title("Input felt eksempel")

# Opprett et input felt
input_felt = tk.Entry(root, width=30)
input_felt.pack(pady=10)

# Opprett en knapp som henter input
knapp = tk.Button(root, text="Hent Input", command=hent_input)
knapp.pack(pady=10)

# Kjør applikasjonen
root.mainloop()
