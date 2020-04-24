//#region AUDIO DATA
//audio - step 2 - create an array with all cues
//note the name we use below MUST be identical to id used in HTML when loading the sound asset
const audioCueArray = [
  new AudioCue("coin_pickup", AudioType.Pickup, 1, 1, false, 0)
  //add more cues here but make sure you load in the HTML!
];
//See Game::LoadAllOtherManagers() for SoundManager instanciation
//#endregion

//#region SPRITE DATA - LEVEL LAYOUT

/*
id:                         descriptive string for the object, does not have to be unique
spriteSheet:                handle to the sprite sheet resource from id specfied in HTML file
sourcePosition:             (x,y) texture space co-ordinates of the top-left corner of the sprite data in the spritesheet
sourceDimensions:           original un-scaled dimensions (w,h) of the sprite data in the spritesheet
rotationInRadians:          rotation angle in radians to be applied to the drawn sprite about its origin
scale:                      scale to be applied to the drawn sprite about its origin
origin:                     (x,y) texture space co-ordinates for the point of rotation/scale for the sprite
actorType:                  actor type (remember the number associated with ActorType determines draw order on screen - see ActorType and RenderManager::Draw()
statusType:                 status type (normally IsDrawn, use IsDrawn | IsUpdated if the sprite has an attached behaviour or animated artist)
scrollSpeedMultiplier:      defines how much the sprite moves in relation to camera movement (1 = move as fast as camera, <1 = move slower than camera)
layerDepth:                 defines the draw order for all sprites of the same ActorType (see RenderManager::Draw())    
alpha:                      opacity of the drawn sprite (0=transparent, 1=opaque)
collisionProperties:        defines if the sprite is collidable (CollidableType), what shape we use (CollisionPrimitiveType) and the appropriate parameter for that shape (e.g. radius vs explodeBy)
*/
const LEVEL_ARCHITECTURE_DATA = Object.freeze({
  //an array of all the sprite objects (i.e. sheet, sourceposition etc) that are used to make the level
  id: "level architecture data",
  levelSprites: {
    1: { //grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(42, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    2: {  //block
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(84, 0),
      sourceDimensions: new Vector2(42, 13),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    3: { //single connector
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(126, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    4: { //connector top + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(252, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    5: { //connector bottom + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(168, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    6: { //connector left + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(210, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    7: { //connector right + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(294, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    8: { //double connector
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Decorator,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.NotCollidable, //notice this is non-collidable because the player CANNOT reach it
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    }
    //add more sprite objects to build out the architecture in your level
  },
  maxBlockWidth: 42,
  maxBlockHeight: 42, 
  /* Why use 33 rows x 20 cols?
    * We can see that our largest sprite block is 42x42 
    * (i.e. "green block") so from this we need 33 rows and 15 columns
    * to cover a total "game area" of 840 x 1386 
    *   20x42 = 840 pixels 
    *   33x42 = 1386 pixels 
    * This means each player can see ALL the width of the level but 
    * only a portion (i.e. canvas height) of the height.
    */
  levelLayoutArray: [
    [1,1,1,1,5,5,5,5,1,1,1,1,5,5,5,5,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [4,0,0,1,3,1,0,0,1,3,3,1,0,0,1,3,1,0,0,6],
    [4,0,0,1,5,1,0,0,1,8,8,1,0,0,1,5,1,0,0,6],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,1,5,5,1,0,0,0,0,0,0,0,1],
    [1,3,3,3,3,1,0,0,0,0,0,0,0,0,1,3,3,3,3,1], 
    [1,5,5,5,5,1,0,0,0,0,0,0,0,0,1,5,5,5,5,1], 
    [1,0,0,0,0,0,0,0,1,3,3,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1],
    [4,0,0,1,7,7,7,7,1,5,5,1,7,7,7,7,1,0,0,6], 
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [8,3,3,3,1,0,0,1,3,3,3,3,1,0,0,1,3,3,3,8],
    [8,8,8,8,1,0,0,1,8,8,8,8,1,0,0,1,8,8,8,8], 
    [8,5,5,5,1,0,0,1,5,5,5,5,1,0,0,1,5,5,5,8],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6], 
    [4,0,0,1,7,7,7,7,1,3,3,1,7,7,7,7,1,0,0,6],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,5,5,1,0,0,0,0,0,0,0,1],
    [1,3,3,3,3,1,0,0,0,0,0,0,0,0,1,3,3,3,3,1],
    [1,5,5,5,5,1,0,0,0,0,0,0,0,0,1,5,5,5,5,1], 
    [1,0,0,0,0,0,0,0,1,3,3,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1],  
    [4,0,0,1,3,1,0,0,1,8,8,1,0,0,1,3,1,0,0,6],
    [4,0,0,1,8,1,0,0,1,5,5,1,0,0,1,8,1,0,0,6],
    [4,0,0,1,8,1,0,0,0,0,0,0,0,0,1,8,1,0,0,6],
    [4,0,0,1,5,1,0,0,0,0,0,0,0,0,1,5,1,0,0,6], 
    [1,0,0,0,0,0,0,0,1,3,3,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,3,3,3,3,1,1,1,1,3,3,3,3,1,1,1,1]
    
  ]
});

/*
id:                         descriptive string for the object, does not have to be unique
spriteSheet:                handle to the sprite sheet resource from id specfied in HTML file
sourcePosition:             (x,y) texture space co-ordinates of the top-left corner of the sprite data in the spritesheet
sourceDimensions:           original un-scaled dimensions (w,h) of the sprite data in the spritesheet
rotationInRadians:          rotation angle in radians to be applied to the drawn sprite about its origin
scale:                      scale to be applied to the drawn sprite about its origin
origin:                     (x,y) texture space co-ordinates for the point of rotation/scale for the sprite
actorType:                  actor type (remember the number associated with ActorType determines draw order on screen - see ActorType and RenderManager::Draw()
statusType:                 status type (normally IsDrawn, use IsDrawn | IsUpdated if the sprite has an attached behaviour or animated artist)
scrollSpeedMultiplier:      defines how much the sprite moves in relation to camera movement (1 = move as fast as camera, <1 = move slower than camera)
layerDepth:                 defines the draw order for all sprites of the same ActorType (see RenderManager::Draw())    
alpha:                      opacity of the drawn sprite (0=transparent, 1=opaque)
collisionProperties:        defines if the sprite is collidable (CollidableType), what shape we use (CollisionPrimitiveType) and the appropriate parameter for that shape (e.g. radius vs explodeBy)
*/
const LEVEL_PICKUPS_DATA = Object.freeze({
  //an array of all the sprite objects (i.e. sheet, sourceposition etc) that are used to make the level
  id: "level pickups data",
  levelSprites: {
    1: { //heart
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(84, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(21, 21),
      actorType: ActorType.Pickup,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Circle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 15,
        explodeRectangleBy: 0,
      }
    },
    2: { //coin
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(42, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(21, 21),
      actorType: ActorType.Pickup,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Circle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 13,
        explodeRectangleBy: 0,
      }
    },
    3: { //chest
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(21, 21),
      actorType: ActorType.Pickup,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: -10,
      }
    },
    4: { //key
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(126, 0),
      sourceDimensions: new Vector2(42, 42),
      rotationInRadians: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(21, 21),
      actorType: ActorType.Pickup,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Circle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 18,
        explodeRectangleBy: 0,
      }
    }
    //add more sprite objects to build out the architecture in your level
  },
  maxBlockWidth: 42,
  maxBlockHeight: 42, 
  levelLayoutArray: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,1,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0], 
    [0,1,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,1,0],
    [0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0], 
    [0,1,2,2,2,2,2,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0], 
    [0,1,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,1,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],  
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,0], 
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,1,2,2,2,2,2,2,0,0,0,0,1,2,2,2,4,2,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
});
//#endregion

//#region SPRITE DATA - ANIMATED PLAYERS
/*
id:                         descriptive string for the object, does not have to be unique
spriteSheet:                handle to the sprite sheet resource from id specfied in HTML file
defaultTakeName:            string name of the take to play when the animation is loaded
translation:                translation used to position the object on the screen
rotationInRadians:          rotation angle in radians to be applied to the drawn sprite about its origin
scale:                      scale to be applied to the drawn sprite about its origin
origin:                     (x,y) texture space co-ordinates for the point of rotation/scale for the sprite
actorType:                  actor type (remember the number associated with ActorType determines draw order on screen - see ActorType and RenderManager::Draw()
statusType:                 status type (normally IsDrawn, use IsDrawn | IsUpdated if the sprite has an attached behaviour or animated artist)
scrollSpeedMultiplier:      defines how much the sprite moves in relation to camera movement (1 = move as fast as camera, <1 = move slower than camera)
layerDepth:                 defines the draw order for all sprites of the same ActorType (see RenderManager::Draw())    
alpha:                      opacity of the drawn sprite (0=transparent, 1=opaque)
collisionProperties:        defines if the sprite is collidable (CollidableType), what shape we use (CollisionPrimitiveType) and the appropriate parameter for that shape (e.g. radius vs explodeBy)
moveProperties:             defines fields related to movement of the sprite (e.g. initial look direction, move speed, rotate speed, gravity, friction, max speed)
takes:                      a compound object (takes) containing a set of key-value pairs representing the take name (e.g. walk) and all the data related to that take (e.g. fps, start frame, end frame, bounding box, an array of rectangles indicating where the sprites are in the source sprite sheet)
*/

const PLAYER_ONE_DATA = Object.freeze({
  id: "player 1",
  spriteSheet: document.getElementById("player_one_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(420, 85),
  rotationInRadians: GDMath.ToRadians(180),
  scale: new Vector2(0.5, 0.5),
  origin: new Vector2(50, 50),
  actorType: ActorType.Player,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 1,
  alpha: 1,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Circle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 10,
    explodeRectangleBy: 0,
  },
  moveProperties: {
    lookDirection: Vector2.Normalize(new Vector2(0, 1)), //straight-down according to source image
    moveKeys: [Keys.W, Keys.S, Keys.A, Keys.D],
    moveSpeed: 0.05,
    rotateSpeedInRadians: GDMath.ToRadians(0.25),
    gravityType: GravityType.Off, //top-down so no gravity
    frictionType: FrictionType.Normal, 
    maximumSpeed: 4,
  },
  takes: {  
    "walk" :  {
      fps: 6,
      maxLoopCount: -1, //0 >= always, 1 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98),
        new Rect(98, 0, 98, 98),
        new Rect(196, 0, 98, 98),
      ]
    },
    "idle" :  {
      fps: 1,
      maxLoopCount: -1, //0 >= always, 1 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 0,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98) //play frame where player stands repeatedly
      ]
    }
  }
});

/*
id:                         descriptive string for the object, does not have to be unique
spriteSheet:                handle to the sprite sheet resource from id specfied in HTML file
defaultTakeName:            string name of the take to play when the animation is loaded
translation:                translation used to position the object on the screen
rotationInRadians:          rotation angle in radians to be applied to the drawn sprite about its origin
scale:                      scale to be applied to the drawn sprite about its origin
origin:                     (x,y) texture space co-ordinates for the point of rotation/scale for the sprite
actorType:                  actor type (remember the number associated with ActorType determines draw order on screen - see ActorType and RenderManager::Draw()
statusType:                 status type (normally IsDrawn, use IsDrawn | IsUpdated if the sprite has an attached behaviour or animated artist)
scrollSpeedMultiplier:      defines how much the sprite moves in relation to camera movement (1 = move as fast as camera, <1 = move slower than camera)
layerDepth:                 defines the draw order for all sprites of the same ActorType (see RenderManager::Draw())    
alpha:                      opacity of the drawn sprite (0=transparent, 1=opaque)
collisionProperties:        defines if the sprite is collidable (CollidableType), what shape we use (CollisionPrimitiveType) and the appropriate parameter for that shape (e.g. radius vs explodeBy)
moveProperties:             defines fields related to movement of the sprite (e.g. initial look direction, move speed, rotate speed, gravity, friction, max speed)
takes:                      a compound object (takes) containing a set of key-value pairs representing the take name (e.g. walk) and all the data related to that take (e.g. fps, start frame, end frame, bounding box, an array of rectangles indicating where the sprites are in the source sprite sheet)
*/
const PLAYER_TWO_DATA = Object.freeze({
  id: "player 2",
  spriteSheet: document.getElementById("player_two_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(275, 1180),
  rotationInRadians: GDMath.ToRadians(0),
  scale: new Vector2(0.95, 0.95),
  origin: new Vector2(50, 50),
  actorType: ActorType.Player,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 0,
  alpha: 1,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Circle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 20,
    explodeRectangleBy: 0,
  },
  moveProperties: {
    lookDirection: Vector2.Normalize(new Vector2(0, 1)),  //straight-down according to source image
    moveKeys: [Keys.I, Keys.K, Keys.J, Keys.L],
    moveSpeed: 0.05,
    rotateSpeedInRadians: GDMath.ToRadians(0.25),
    gravityType: GravityType.Off, //top-down so no gravity
    frictionType: FrictionType.Normal, 
    maximumSpeed: 4,
  },
  takes: {  
    "walk" :  {
      fps: 10,
      maxLoopCount: -1, //0 >= always, 1 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98),
        new Rect(98, 0, 98, 98),
        new Rect(196, 0, 98, 98),
      ]
    },
    "idle" :  {
      fps: 1,
      maxLoopCount: -1, //0 >= always, 1 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 0,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98) //play frame where player stands repeatedly
      ]
    }
  }
});
//#endregion

//#region SPRITE DATA - ANIMATED PICKUP
/*
id:                         descriptive string for the object, does not have to be unique
spriteSheet:                handle to the sprite sheet resource from id specfied in HTML file
defaultTakeName:            string name of the take to play when the animation is loaded
translation:                translation used to position the object on the screen
rotationInRadians:          rotation angle in radians to be applied to the drawn sprite about its origin
scale:                      scale to be applied to the drawn sprite about its origin
origin:                     (x,y) texture space co-ordinates for the point of rotation/scale for the sprite
actorType:                  actor type (remember the number associated with ActorType determines draw order on screen - see ActorType and RenderManager::Draw()
statusType:                 status type (normally IsDrawn, use IsDrawn | IsUpdated if the sprite has an attached behaviour or animated artist)
scrollSpeedMultiplier:      defines how much the sprite moves in relation to camera movement (1 = move as fast as camera, <1 = move slower than camera)
layerDepth:                 defines the draw order for all sprites of the same ActorType (see RenderManager::Draw())    
alpha:                      opacity of the drawn sprite (0=transparent, 1=opaque)
collisionProperties:        defines if the sprite is collidable (CollidableType), what shape we use (CollisionPrimitiveType) and the appropriate parameter for that shape (e.g. radius vs explodeBy)
moveProperties:             defines fields related to movement of the sprite (e.g. initial look direction, move speed, rotate speed, gravity, friction, max speed), a null indicates that this animation doesnt move
takes:                      a compound object (takes) containing a set of key-value pairs representing the take name (e.g. walk) and all the data related to that take (e.g. fps, start frame, end frame, bounding box, an array of rectangles indicating where the sprites are in the source sprite sheet)
*/
const PICKUP_COIN_ANIMATION_DATA = Object.freeze({
  id: "animated coin",
  spriteSheet: document.getElementById("spinning_coin_pickup"),
  defaultTakeName: "spin",
  translation: new Vector2(510, 126),
  rotationInRadians: 0,
  scale: new Vector2(0.15,0.15),
  origin: new Vector2(100, 85),
  actorType: ActorType.Pickup,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 0,
  alpha: 1,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Circle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 12,
    explodeRectangleBy: 0,
  },
  moveProperties: null, //null means this animation doesnt move (e.g. like a static coin pickup)
  takes: {  
    "spin" :  {
      fps: 6,
      maxLoopCount: -1, //0 >= always, 1 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 5,
      boundingBoxDimensions: new Vector2(199, 170), 
      cellData: [
        new Rect(0, 0, 199, 170),
        new Rect(199, 0, 199, 170),
        new Rect(398, 0, 199, 170),
        new Rect(597, 0, 199, 170),
        new Rect(796, 0, 199, 170),
        new Rect(995, 0, 199, 170),
      ]
    }
  }
});

//#endregion

//#region SPRITE DATA - ANIMATION DECORATORS (fire, pickup)
const PICKUP_COIN_DECORATOR_ANIMATION_DATA = Object.freeze({
  id: "coin_pickup_decorator",
  spriteSheet: document.getElementById("pickup_collision_animation"),
  defaultTakeName: "explode",
  translation: new Vector2(200, 200),
  rotationInRadians: 0,
  scale: new Vector2(0.5, 0.3),
  origin: new Vector2(0, 0),
  actorType: ActorType.NonCollidableAnimatedDecorator,
  statusType: StatusType.Off,
  scrollSpeedMultiplier: 1,
  layerDepth: 0,
  alpha: 1,
  collisionProperties: {
    type: CollisionType.NotCollidable,
    primitive: CollisionPrimitiveType.None,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 0,
  },
  moveProperties: null, //null means this animation doesnt move (e.g. like a static coin pickup)
  takes: {  
    "explode" :  {
      fps: 20,
      maxLoopCount:   1, //0 >= always, 1 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 8,
      boundingBoxDimensions: new Vector2(157, 157), 
      cellData: [
        new Rect(0, 0, 157, 157),
        new Rect(157, 0, 157, 157),
        new Rect(314, 0, 157, 157),
        new Rect(471, 0, 157, 157),
        new Rect(628, 0, 157, 157),
        new Rect(785, 0, 157, 157),
        new Rect(942, 0, 157, 157),
        new Rect(1099, 0, 157, 157),
        new Rect(1256, 0, 157, 157)
      ]
    }
  }
});
//complete object to load the animation for pickup of coins...
//#endregion

//#region SPRITE DATA - ANIMATION DECORATORS (fire, pickup)
const TOAST_GET_READY_ANIMATION_DATA = Object.freeze({
  id: "get_ready_animation",
  spriteSheet: document.getElementById("get_ready_animation"),
  defaultTakeName: "ready",
  translation: new Vector2(200, 200),
  rotationInRadians: 0,
  scale: new Vector2(0.2, 0.2),
  origin: new Vector2(0, 0),
  actorType: ActorType.NonCollidableAnimatedDecorator,
  statusType: StatusType.Off,
  scrollSpeedMultiplier: 1,
  layerDepth: 0,
  alpha: 1,
  collisionProperties: {
    type: CollisionType.NotCollidable,
    primitive: CollisionPrimitiveType.None,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 0,
  },
  moveProperties: null, //null means this animation doesnt move (e.g. like a static coin pickup)
  takes: {  
    "ready" :  {
      fps: 20,
      maxLoopCount:   1, //0 >= always, 1 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 3,
      boundingBoxDimensions: new Vector2(1378, 309), 
      cellData: [
        new Rect(0, 0, 1378, 309), 
        new Rect(1378, 0, 1378, 309), 
        new Rect(2756, 0, 1378, 309), 
        new Rect(4134, 0, 1378, 309), 
        //add more frames from the Get Ready animation here...
      ]
    }
  }
});
//complete object to load the animation for pickup of coins...
//#endregion


