import pygame
pygame.init()
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("Enkelt Spill")
player = pygame.Rect(175, 125, 50, 50)
color = (255, 0, 0)
speed = 5
clock = pygame.time.Clock()
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]: player.x -= speed
    if keys[pygame.K_RIGHT]: player.x += speed
    if keys[pygame.K_UP]: player.y -= speed
    if keys[pygame.K_DOWN]: player.y += speed
    
    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, color, player)
    pygame.display.flip()
    clock.tick(30)
pygame.quit()
