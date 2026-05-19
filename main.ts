function Start_Level() {
    let tempenemy: Sprite;
    let velx: number;
    let vely: number;
    
    for (let e of enemies) {
        e.destroy()
    }
    enemies = []
    for (let s of sprites.allOfKind(SpriteKind.Food)) {
        s.destroy()
    }
    if (current_level == 1) {
        tiles.setCurrentTilemap(tilemap`level0`)
        tiles.placeOnRandomTile(myplayer, assets.tile`baseTransparency16`)
    } else if (current_level == 2) {
        tiles.setCurrentTilemap(tilemap`level2`)
        tiles.placeOnRandomTile(myplayer, assets.tile`myTile5`)
    } else if (current_level == 3) {
        tiles.setCurrentTilemap(tilemap`level4`)
        tiles.placeOnRandomTile(myplayer, sprites.dungeon.darkGroundCenter)
    }
    
    let i = 0
    while (i < randint(3, 7)) {
        tempenemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
        velx = randint(1, 2) == 1 ? randint(-120, -60) : randint(60, 120)
        vely = randint(1, 2) == 1 ? randint(-120, -60) : randint(60, 120)
        tempenemy.setVelocity(velx, vely)
        tempenemy.setBounceOnWall(true)
        enemies.push(tempenemy)
        i += 1
    }
    let tempprize = sprites.create(assets.image`prize`, SpriteKind.Food)
    velx = randint(1, 2) == 1 ? randint(-120, -60) : randint(60, 120)
    vely = randint(1, 2) == 1 ? randint(-120, -60) : randint(60, 120)
    tempprize.setVelocity(velx, vely)
    tempprize.setBounceOnWall(true)
    tempprize.setPosition(114, 6)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite2: Sprite, otherSprite2: Sprite) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    
    otherSprite.destroy()
    current_level += 1
    if (current_level > 3) {
        game.gameOver(true)
    } else {
        Start_Level()
    }
    
})
let enemies : Sprite[] = []
let current_level = 1
let myplayer = sprites.create(assets.image`ship`, SpriteKind.Player)
controller.moveSprite(myplayer)
myplayer.setStayInScreen(true)
myplayer.setPosition(6, 114)
Start_Level()
