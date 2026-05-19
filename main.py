def Start_Level():
    global enemies, myplayer, current_level

    for e in enemies:
        e.destroy()
    enemies = []

    for s in sprites.all_of_kind(SpriteKind.food):
        s.destroy()

    if current_level == 1:
        tiles.set_current_tilemap(tilemap("""level0"""))
        tiles.place_on_random_tile(myplayer, assets.tile("""baseTransparency16"""))
    elif current_level == 2:
        tiles.set_current_tilemap(tilemap("""level2"""))
        tiles.place_on_random_tile(myplayer, assets.tile("""myTile5"""))
    elif current_level == 3:
        tiles.set_current_tilemap(tilemap("""level4"""))
        tiles.place_on_random_tile(myplayer, sprites.dungeon.dark_ground_center)

    i = 0
    while i < randint(3, 7):
        tempenemy = sprites.create(assets.image("""enemy"""), SpriteKind.enemy)
        velx = randint(-120, -60) if randint(1, 2) == 1 else randint(60, 120)
        vely = randint(-120, -60) if randint(1, 2) == 1 else randint(60, 120)
        tempenemy.set_velocity(velx, vely)
        tempenemy.set_bounce_on_wall(True)
        enemies.append(tempenemy)
        i += 1

    tempprize = sprites.create(assets.image("""prize"""), SpriteKind.food)
    velx = randint(-120, -60) if randint(1, 2) == 1 else randint(60, 120)
    vely = randint(-120, -60) if randint(1, 2) == 1 else randint(60, 120)
    tempprize.set_velocity(velx, vely)
    tempprize.set_bounce_on_wall(True)
    tempprize.set_position(114, 6)

def on_on_overlap(sprite2, otherSprite2):
    game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    global current_level
    otherSprite.destroy()
    current_level += 1
    if current_level > 3:
        game.game_over(True)
    else:
        Start_Level()
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)

enemies: List[Sprite] = []
current_level = 1
myplayer = sprites.create(assets.image("""ship"""), SpriteKind.player)
controller.move_sprite(myplayer)
myplayer.set_stay_in_screen(True)
myplayer.set_position(6, 114)
Start_Level()