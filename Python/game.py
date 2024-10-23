import pygame
pygame.init()

# Skjerminnstillinger
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("Enkelt Spill")

# Farge og posisjon
player = pygame.Rect(175, 125, 50, 50)
color = (255, 0, 0)
speed = 5

# Hovedløkken
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Bevegelse
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player.x -= speed
    if keys[pygame.K_RIGHT]:
        player.x += speed
    if keys[pygame.K_UP]:
        player.y -= speed
    if keys[pygame.K_DOWN]:
        player.y += speed

    # Tegn på skjermen
    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, color, player)
    pygame.display.flip()
    pygame.time.Clock().tick(30)

pygame.quit()


