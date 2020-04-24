//#region Development Diary

/*
Week 12 (Easter)
------

To Do:
- add onload for images and sound assets
- nodeJS
- articulated sprite
- Camera zoom does not affect CDCR properly
- Set origin and dimensions automatically in GetScreenObject

In-Progress:
- BSP
- pickup animations

Done:
- toasts
- Remove superfluous variables from GetScreenObject
- rotating character
- CDCR is sticking as we slide along walls
- add documentation to MyConstants objects
- animation loops
- collision skin
- bounding box
- camera culling
- removed default creation of Body in Sprite
- camera tracking of player

*/

/*
Week 11
------
Notes:
- None

Exercises: 
- Add PICKUP_DECORATOR_ANIMATION_DATA and add animation
- Discuss coin pickup animations
- Discuss SamPlayerBehavior, UIManager, ThirdPersonCameraBehavior

To Do (Split Screen Sam):
- Update children position apart from passing reference to parent translation?
- Add toggleMenuKey functionality to MyMenuManager
- Rotate, NON-AABB, BSP, Camera, Dynamic canvas, draw across canvas, multi-player menu

To Do (Snailbait):
- Wrap MyConstants.js and Constants.js in a class to set scope and no longer pollute global project space.
- Add booleans to DebugDrawer to enable/disable drawing of BBs for objects and camera, and drawing of debug text.
- Improve SoundManager to block load until all sound resources have loaded.
- Add pause/unpause to SoundManager when we lose/gain window focus.
- Add code to calculate TextSpriteArtist bounding box size based on text used.
- Fix background UpdateHorizontalScrolling().
- Add countdown toast when we gain window focus.
- Add check for "P" key in MyMenuManager::Update() to show/hide menu
- Improve KeyboardManager to add IsFirstKeyPress() method.
- Complete menu demo.
- Continue adding documentation to all classes and methods.

Done:
- Add CD/CR against architecture
- Add animation on coin pickup
- Add HUD and show changes to health, ammo, coins
- Add ThirdPersonCameraBehavior to move with target player
- Add UIManager
- Rotate BB (added Circle BB instea)
- Replaced get/set with direct access in high frequency draw code
- Package canvas data

Bugs (Split Screen Sam):
- BB on players is not correctly set
- Player 2 is not responding to J/L keys
- Skew on gun rotation
- Camera culling has been disabled
- Camera bounding boxes are incorrect
- DebugDrawer text in bottom window (ctx.translate()) is not in the correct location

Bugs (Snailbait):
- Camera bounding box is not updating on camera scale, rotate.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?
*/

/*
Week 10
------
Notes:
- None

Exercises: 
- None

To Do (Split Screen Sam):
- Add UIManager
- Rotate BB
- Update children position apart from passing reference to parent translation?
- Add toggleMenuKey functionality to MyMenuManager
- Rotate, NON-AABB, BSP, Camera, Dynamic canvas, draw across canvas, multi-player menu

To Do (Snailbait):
- Wrap MyConstants.js and Constants.js in a class to set scope and no longer pollute global project space.
- Add booleans to DebugDrawer to enable/disable drawing of BBs for objects and camera, and drawing of debug text.
- Improve SoundManager to block load until all sound resources have loaded.
- Add pause/unpause to SoundManager when we lose/gain window focus.
- Add code to calculate TextSpriteArtist bounding box size based on text used.
- Fix background UpdateHorizontalScrolling().
- Add countdown toast when we gain window focus.
- Add check for "P" key in MyMenuManager::Update() to show/hide menu
- Improve KeyboardManager to add IsFirstKeyPress() method.
- Complete menu demo.
- Continue adding documentation to all classes and methods.

Done:
- Replaced get/set with direct access in high frequency draw code
- Package canvas data

Bugs (Split Screen Sam):
- Skew on gun rotation
- Camera culling has been disabled
- Camera bounding boxes are incorrect
- DebugDrawer text in bottom window (ctx.translate()) is not in the correct location

Bugs (Snailbait):
- Camera bounding box is not updating on camera scale, rotate.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?
*/

/*
Week 7 
------
Notes:
- None

Exercises: 
- None

To Do (Snailbait):
- Wrap MyConstants.js and Constants.js in a class to set scope and no longer pollute global project space.
- Add booleans to DebugDrawer to enable/disable drawing of BBs for objects and camera, and drawing of debug text.
- Improve SoundManager to block load until all sound resources have loaded.
- Add pause/unpause to SoundManager when we lose/gain window focus.
- Add code to calculate TextSpriteArtist bounding box size based on text used.
- Fix background UpdateHorizontalScrolling().
- Add countdown toast when we gain window focus.
- Add check for "P" key in MyMenuManager::Update() to show/hide menu
- Improve KeyboardManager to add IsFirstKeyPress() method.
- Complete menu demo.
- Continue adding documentation to all classes and methods.

Done:
- None

Bugs (Snailbait):
- Camera bounding box is not updating on camera scale, rotate.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?
*/

//#endregion

class Game {

  /************************************************************ CORE CODE THAT DOESN'T CHANGE EXCEPT WHEN ADDING/REMOVING/REFACTORING MANAGERS ************************************************************/
  //#region Fields
  //canvas and context
  screenBottom;
  screenTop;

  //game resources
  spriteSheet;
  jungleSpriteSheet;

  //time object and notification 
  gameTime;
  notificationCenter;

  //managers
  objectManager;
  soundManager;
  gameStateManager;
  cameraManager;

  //multi-player count and ready test
  playerSprites = new Array();
  readyPlayers = 0;
  maxPlayers = 2;

  //debug
  debugModeOn;
  //#endregion

  //#region Constructor
  constructor(debugModeOn) {
    //enable/disable debug info
    this.debugModeOn = debugModeOn;
  }
  //#endregion

  // #region LoadGame, Start, Animate
  LoadGame() {

    //load content
    this.Initialize();

    //publish an event to pause the object manager (i.e. no update) and render manager (i.e. no draw) and show the menu
    NotificationCenter.Notify(
      new Notification(
        NotificationType.Menu,
        NotificationAction.ShowMenuChanged,
        [StatusType.Off, "menu-bottom", "menu-top"]
      )
    );

    //start timer - notice that it is called only after we loaded all the game content
    this.Start();
  }

  Start() {
    //runs in proportion to refresh rate
    this.gameTime = new GameTime();
    this.animationTimer = window.requestAnimationFrame(this.Animate.bind(this));
  }

  Animate(now) {
    this.gameTime.Update(now);
    this.Update(this.gameTime);
    this.Draw(this.gameTime);
    window.requestAnimationFrame(this.Animate.bind(this));
  }
  // #endregion

  // #region Update, Draw
  Update(gameTime) {
    //update all the game sprites
    this.objectManager.Update(this.gameTime);

    //updates the camera manager which in turn updates all cameras
    this.cameraManager.Update(gameTime);

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.debugDrawer.Update(gameTime);

  }

  Draw(gameTime) {
    //clear screen on each draw of ALL sprites (i.e. menu and game sprites)
    this.ClearScreen(this.screenTop.clearScreenColor, this.screenTop.cvs, this.screenTop.ctx, this.screenTop.topLeft);
    this.ClearScreen(this.screenBottom.clearScreenColor, this.screenBottom.cvs, this.screenBottom.ctx, this.screenBottom.topLeft);

    //draw all the game sprites
    this.renderManager.Draw(gameTime);

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.debugDrawer.Draw(gameTime);
  }

  ClearScreen(color, canvasObject, context, topLeft) {
    context.save();
    context.fillStyle = color;
    context.fillRect(topLeft.x, topLeft.y, canvasObject.clientWidth, canvasObject.clientHeight);
    context.restore();
  }
  // #endregion

  /************************************************************ YOUR GAME SPECIFIC UNDER THIS POINT ************************************************************/
  // #region Initialize, Load(Debug, Cameras, Managers)
  Initialize() {
    this.LoadCanvases();
    this.LoadAssets();
    this.LoadNotificationCenter();
    this.LoadInputAndCameraManagers();
    this.LoadCameras(); //make at the end as 1+ behaviors in camera may depend on sprite
    this.LoadAllOtherManagers();
    this.LoadSprites();

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.LoadDebug();
  }

  LoadCanvases() {
    //get a handle to our context
    this.screenTop = GDGraphics.GetScreenObject("player 1", "camera top", "parent-top", 
    "canvas-top", "player-intro-top", "player-ui-top",
      new Vector2(0, 0), new Vector2(840, 346), Color.LightGreen);
      
    this.screenBottom = GDGraphics.GetScreenObject("player 2", "camera bottom", 
    "parent-bottom", "canvas-bottom", "player-intro-bottom", "player-ui-bottom",
      new Vector2(0, 0), new Vector2(840, 346), Color.LightGreen);
  }

  GetTargetPlayer(playerIndex) {
    if (playerIndex >= 0 && playerIndex < this.playerSprites.length)
      return this.playerSprites[playerIndex];
    else
      throw "Error: A behavior (e.g. TrackTargetTranslationBehavior) is looking for a player index that does not exist. Are there sufficient sprites in the playerSprites array?";
  }

  LoadCameras() {
    //#region Camera 1    
    let transform = new Transform2D(
      new Vector2(420, 173),
      0,
      new Vector2(1, 1),
      new Vector2(this.screenTop.dimensions.x / 2, this.screenTop.dimensions.y / 2),
      new Vector2(this.screenTop.dimensions.x, this.screenTop.dimensions.y));

    let cameraTop = new Camera2D(
      "camera top",
      ActorType.Camera,
      transform,
      StatusType.IsUpdated,
      this.screenTop.ctx
    );

    /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/
    cameraTop.CollisionPrimitive = new RectCollisionPrimitive(transform, 0);

    /**************** NEED TO ADD A BEHAVIOR TO MAKE THIS A CONTROLLABLE ACTOR ***********/
    cameraTop.AttachBehavior(new TrackTargetTranslationBehavior(this, 0, new Vector2(0, 120)));

    this.cameraManager.Add(cameraTop);
    //#endregion

    //#region Camera 2
    transform = new Transform2D(
      new Vector2(420, 1213),
      0,
      new Vector2(1, 1),
      new Vector2(this.screenBottom.dimensions.x / 2, this.screenBottom.dimensions.y / 2),
      new Vector2(this.screenBottom.dimensions.x, this.screenBottom.dimensions.y));

    let cameraBottom = new Camera2D(
      "camera bottom",
      ActorType.Camera,
      transform,
      StatusType.IsUpdated,
      this.screenBottom.ctx
    );

    /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/
    cameraBottom.CollisionPrimitive = new RectCollisionPrimitive(transform, 0);

    /**************** NEED TO ADD A BEHAVIOR TO MAKE THIS A CONTROLLABLE ACTOR ***********/
    cameraBottom.AttachBehavior(new TrackTargetTranslationBehavior(this, 1, new Vector2(0, 30)));

    this.cameraManager.Add(cameraBottom);
    //#endregion
  }

  LoadNotificationCenter() {
    this.notificationCenter = new NotificationCenter();
  }

  LoadInputAndCameraManagers() {
    //checks for keyboard input
    this.keyboardManager = new KeyboardManager();
    //stores the cameras in our game
    this.cameraManager = new CameraManager("stores and manages cameras");
  }

  LoadAllOtherManagers() {
    //update objects
    this.objectManager = new ObjectManager(
      "game sprites",
      StatusType.IsUpdated,
      this.cameraManager,
      this.notificationCenter
    );

    //draw objects
    this.renderManager = new RenderManager(
      "draws sprites in obj manager",
      StatusType.IsDrawn,
      this.objectManager,
      this.cameraManager,
      this.notificationCenter);

    //#region DOM related Intro & Loader functionality  
    //sentinel used to control if both players have pressed the Start button - value of 2 because we need two players to start!
    this.startGameSentinel = new NumericSentinel(2);

    //load a menu managers for each screen since they need to function independently
    this.menuManagerTop = new MyMenuManager("menu-top", this.notificationCenter, 
    this.keyboardManager,
      this.screenTop, this.startGameSentinel);

    this.menuManagerBottom = new MyMenuManager("menu-bottom", this.notificationCenter, 
    this.keyboardManager,
      this.screenBottom, this.startGameSentinel);
    //#endregion

    //audio - step 3 - instanciate the sound manager with the array of cues
    this.soundManager = new SoundManager(
      audioCueArray,
      this.notificationCenter);

    //add the manager that listens for events (win, lose, respawn) within the game and reacts
    this.gameStateManager = new MyGameStateManager("listens for game state changes",
        //notice that its starts off, just like the ObjectManager and RenderManager - if it didnt then we'd see the player UIs with menu
        StatusType.Off, 
        //used to add new sprites to the object manager
        this.objectManager, 
        //used to get a camera and its context
        this.cameraManager, 
        //used to listed for notifications
        this.notificationCenter, 
          //an array that stores the archetypes to be used by the game state manager
          this.GetGameStateManagerArchetypeArray(),
            //an array of the objects that contain information that this class needs to process and show UI notifications
            [this.screenTop, this.screenBottom]);
  }

  /**
   * Loads and return an array of all the sprites used by the MyGameStateManager
   *
   * @returns Array of sprites
   * @memberof Game
   */
  GetGameStateManagerArchetypeArray() {
    let sprite = null;
    let archetypeArray = new Array();

    //load the sprite
    sprite = this.LoadAnimatedSprite(PICKUP_COIN_DECORATOR_ANIMATION_DATA, new Vector2(0, 0));
    //add to the array
    archetypeArray[PICKUP_COIN_DECORATOR_ANIMATION_DATA.id] = sprite;

    //add the loading of more sprites here used by the MyGameStateManager

    //return the array
    return archetypeArray;
  }

  LoadDebug() {
    this.debugDrawer = new DebugDrawer("shows debug info", StatusType.IsDrawn,
      this.objectManager, this.cameraManager,
      this.notificationCenter,
      DebugDrawType.ShowDebugText | DebugDrawType.ShowSpriteCollisionPrimitive);
  }
  //#endregion

  //#region Load(Assets, Sprites)
  LoadAssets() {
    //what could we use this for?
  }

  LoadSprites() {

    let sprite = null;

    //removes any existing sprites in the manager as this may not be the first time the game is played
    this.objectManager.Clear();

    //load the level walls etc
    this.LoadMultipleSpritesFrom2DArray(LEVEL_ARCHITECTURE_DATA, new Vector2(0, 0));

    //load all the pickups
    this.LoadMultipleSpritesFrom2DArray(LEVEL_PICKUPS_DATA, new Vector2(21, 21));

    //load animated coin demo
    sprite = this.LoadAnimatedSprite(PICKUP_COIN_ANIMATION_DATA, new Vector2(15, 15));
    this.objectManager.Add(sprite);

    //load player 1 and store sprite in array for use by Camera and ThirdPersonCameraBehavior
    sprite = this.LoadAnimatedPlayerSprite(PLAYER_ONE_DATA, new Vector2(0, 0));
    this.objectManager.Add(sprite)
    this.playerSprites[0] = sprite;

    //load player 2 and store sprite in array for use by Camera and ThirdPersonCameraBehavior
    sprite = this.LoadAnimatedPlayerSprite(PLAYER_TWO_DATA, new Vector2(0, 0));
    this.objectManager.Add(sprite)
    this.playerSprites[1] = sprite;
  }

  LoadAnimatedPlayerSprite(theObject, translationOffset) {

    let artist = new AnimatedSpriteArtist(theObject);
    artist.SetTake(theObject.defaultTakeName);

    let transform = new Transform2D(
      Vector2.Add(theObject.translation, translationOffset),
      theObject.rotationInRadians,
      theObject.scale,
      theObject.origin,
      artist.GetSingleFrameDimensions(theObject.defaultTakeName));

    let sprite = new MoveableSprite(theObject.id,
      theObject.actorType,
      theObject.collisionProperties.type,
      transform, artist,
      theObject.statusType,
      theObject.scrollSpeedMultiplier,
      theObject.layerDepth);

    /**************** NEED TO FRICTION TO MAKE THIS CHARACTER MOVE IN A MORE BELIEVEABLE MANNER ***********/
    sprite.Body.MaximumSpeed = theObject.moveProperties.maximumSpeed;
    sprite.Body.Friction = theObject.moveProperties.frictionType;
    sprite.Body.Gravity = theObject.moveProperties.gravityType; //top-down, so no gravity in +Y direction

    /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/
    //assign a circular collision primitive to better fit the drawn sprite
    if (theObject.collisionProperties.primitive == CollisionPrimitiveType.Circle) {
      sprite.CollisionPrimitive = new CircleCollisionPrimitive(transform, theObject.collisionProperties.circleRadius);
    } else {
      sprite.CollisionPrimitive = new RectCollisionPrimitive(transform, theObject.collisionProperties.explodeRectangleBy);
    }

    /**************** NEED TO ADD A BEHAVIOR TO MAKE THIS A CONTROLLABLE ACTOR ***********/
    sprite.AttachBehavior(
      new SamPlayerBehavior(
        this.keyboardManager,
        this.objectManager,
        theObject.moveProperties.moveKeys,
        theObject.moveProperties.lookDirection,
        theObject.moveProperties.moveSpeed,
        theObject.moveProperties.rotateSpeedInRadians));

    //return the player so that we can add all players to playerSprites array so that any camera targeting a player can get a handle to the player in this array
    return sprite;
  }

  LoadAnimatedSprite(theObject, translationOffset) {

    let artist = new AnimatedSpriteArtist(theObject);
    artist.SetTake(theObject.defaultTakeName);

    let transform = new Transform2D(
      Vector2.Add(theObject.translation, translationOffset),
      theObject.rotation,
      theObject.scale,
      theObject.origin,
      artist.GetSingleFrameDimensions(theObject.defaultTakeName));

    let sprite = new Sprite(theObject.id,
      theObject.actorType,
      theObject.collisionProperties.type,
      transform, artist,
      theObject.statusType,
      theObject.scrollSpeedMultiplier,
      theObject.layerDepth);

    /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/
    if (theObject.collisionProperties.primitive == CollisionPrimitiveType.Circle) {
      sprite.CollisionPrimitive = new CircleCollisionPrimitive(transform, theObject.collisionProperties.circleRadius);
    } else {
      sprite.CollisionPrimitive = new RectCollisionPrimitive(transform, theObject.collisionProperties.explodeRectangleBy);
    }

    /**************** NEED TO ADD A BEHAVIOR? ***********/
    return sprite;

  }

  LoadMultipleSpritesFrom2DArray(theObject, translationOffset) {
    let maxRows = theObject.levelLayoutArray.length;
    let maxCols = theObject.levelLayoutArray[0].length;
    let blockWidth = theObject.maxBlockWidth;
    let blockHeight = theObject.maxBlockHeight;
    let transform = null;
    let artist = null;
    let sprite = null;

    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        //we read a number from the array (and subtract 1 because 0 is our draw nothing value)
        let levelSpritesNumber = theObject.levelLayoutArray[row][col];

        //if we get a value of 0 from the  we have nothing to draw
        if (levelSpritesNumber != 0) {
          transform = new Transform2D(
            Vector2.Add(new Vector2(col * blockWidth, row * blockHeight), translationOffset),
            theObject.levelSprites[levelSpritesNumber].rotation,
            theObject.levelSprites[levelSpritesNumber].scale,
            theObject.levelSprites[levelSpritesNumber].origin,
            theObject.levelSprites[levelSpritesNumber].sourceDimensions);

          //remember we can also add an animated artist instead
          artist = new SpriteArtist(theObject.levelSprites[levelSpritesNumber].spriteSheet,
            theObject.levelSprites[levelSpritesNumber].sourcePosition,
            theObject.levelSprites[levelSpritesNumber].sourceDimensions,
            theObject.levelSprites[levelSpritesNumber].alpha);

          sprite = new Sprite("block[" + row + "," + col + "]",
            theObject.levelSprites[levelSpritesNumber].actorType,
            theObject.levelSprites[levelSpritesNumber].collisionProperties.type,
            transform, artist,
            theObject.levelSprites[levelSpritesNumber].statusType,
            theObject.levelSprites[levelSpritesNumber].scrollSpeedMultiplier,
            theObject.levelSprites[levelSpritesNumber].layerDepth);

          /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/

          if (theObject.levelSprites[levelSpritesNumber].collisionProperties.primitive == CollisionPrimitiveType.Circle) {
            sprite.CollisionPrimitive = new CircleCollisionPrimitive(transform, theObject.levelSprites[levelSpritesNumber].collisionProperties.circleRadius);
          } else {
            sprite.CollisionPrimitive = new RectCollisionPrimitive(transform, theObject.levelSprites[levelSpritesNumber].collisionProperties.explodeRectangleBy);
          }

          //do we want to add behaviors if so then add them here?

          this.objectManager.Add(sprite);
        }
      }
    }
  }
}


//instead of "load" we could use "DOMContentLoaded" but this would indicate load complete when the HTML and DOM is loaded and NOT when all styling, scripts and images have been downloaded
window.addEventListener("load", event => {
  let bDebugMode = false;
  let game = new Game(bDebugMode);
  game.LoadGame();
});