import pygame
import random
from pygame.locals import K_ESCAPE, KEYDOWN, K_UP, K_DOWN, K_LEFT, K_RIGHT, QUIT

# Initialiser pygame
pygame.init()

# Skjermstørrelse
screen = pygame.display.set_mode((400, 300))

# Farge og startposisjon for spilleren (firkanten)
player_color = (0, 128, 255)
player_pos = [200, 250]
player_size = 20

# Farge og størrelse for blokker
block_color = (255, 0, 0)
block_size = 20
block_speed = 5
block_list = []

# Variabel for å holde loopen i gang
running = True

# Funksjon for å lage nye blokker
def create_block():
    x_pos = random.randint(0, 380)
    block_list.append([x_pos, 0])

# Hovedloop
while running:
    screen.fill((0, 0, 0))  # Fyll bakgrunnen med svart

    # Sjekk hendelser i køen
    for event in pygame.event.get():
        if event.type == KEYDOWN:
            if event.key == K_ESCAPE:
                running = False
        elif event.type == QUIT:
            running = False

    # Hent tastetrykk for å bevege spilleren
    keys = pygame.key.get_pressed()
    if keys[K_LEFT] and player_pos[0] > 0:
        player_pos[0] -= 5
    if keys[K_RIGHT] and player_pos[0] < 380:
        player_pos[0] += 5
    if keys[K_UP] and player_pos[1] > 0:
        player_pos[1] -= 5
    if keys[K_DOWN] and player_pos[1] < 300:
        player_pos[1] += 5

    # Legg til nye blokker med jevne mellomrom
    if random.randint(0, 20) == 1:
        create_block()

    # Beveg blokkene nedover og sjekk for kollisjoner
    
    for block in block_list[:]:
        block[1] += block_speed

        if block[1] > 300:  # Fjern blokker som har falt utenfor skjermen
            block_list.remove(block)
        # Sjekk kollisjon med spilleren
        if (block[0] < player_pos[0] < block[0] + block_size or
            block[0] < player_pos[0] + player_size < block[0] + block_size) and \
            (block[1] < player_pos[1] < block[1] + block_size or
            block[1] < player_pos[1] + player_size < block[1] + block_size):
            running = False  # Stopp spillet ved kollisjon

    # Tegn spilleren (firkanten)
    pygame.draw.rect(screen, player_color, (*player_pos, player_size, player_size))

    # Tegn blokkene
    for block in block_list:
        pygame.draw.rect(screen, block_color, (*block, block_size, block_size))

    pygame.display.flip()  # Oppdater skjermen
    pygame.time.delay(30)  # Pause

# Avslutt pygame
pygame.quit()
