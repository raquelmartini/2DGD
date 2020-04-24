/**
 * Moves the parent sprite based on keyboard input and detect collisions against platforms, pickups etc
 * @author niall mcguinness
 * @version 1.0
 * @class SamPlayerBehavior
 */
class SamPlayerBehavior extends Behavior{
  //#region Static Fields
  //#endregion

  //#region Fields
  //#endregion

  //#region Properties
  //#endregion

  constructor(
    keyboardManager,
    objectManager,
    moveKeys,
    originalDirection,
    moveSpeed = 2,
    rotateSpeed = 0.04
  ) {
    super();
    this.keyboardManager = keyboardManager;
    this.objectManager = objectManager;

    this.moveKeys = moveKeys;
    this.originalDirection = originalDirection.Clone(); //direction we were facing at game start
    this.lookDirection = originalDirection.Clone(); //direction after we turn

    this.moveSpeed = moveSpeed;
    this.rotateSpeed = rotateSpeed;
  }

  //#region Your Game Specific Methods - add code for more CD/CR or input handling
  HandleInput(gameTime, parent) {
    this.HandleMove(gameTime, parent);
  }

  HandleMove(gameTime, parent) {

    //up/down
    if (this.keyboardManager.IsKeyDown(this.moveKeys[0])) {
      //rotate the look direction used to move the sprite when forward/backward keys are pressed
      this.lookDirection = Vector2.Normalize(Vector2.Transform(this.originalDirection, Matrix.CreateRotationZ(parent.Transform2D.RotationInRadians))); //change the animation to something else (e.g. idle or use your own animation here)

      //move forward using the look direction
      parent.Body.AddVelocity(Vector2.MultiplyScalar(this.lookDirection, gameTime.ElapsedTimeInMs * this.moveSpeed));

      //change the animation to something else (e.g. idle or use your own animation here)
      parent.Artist.SetTake("walk");
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[1])) {
      //rotate the look direction used to move the sprite when forward/backward keys are pressed
      this.lookDirection = Vector2.Normalize(Vector2.Transform(this.originalDirection, Matrix.CreateRotationZ(parent.Transform2D.RotationInRadians))); //change the animation to something else (e.g. idle or use your own animation here)

      //move backward using the look direction
      parent.Body.AddVelocity(Vector2.MultiplyScalar(this.lookDirection, -gameTime.ElapsedTimeInMs * this.moveSpeed));

      //change the animation to something else (e.g. idle or use your own animation here)
      parent.Artist.SetTake("walk");
    }

    //turn left/right
    if (this.keyboardManager.IsKeyDown(this.moveKeys[2])) {
      //rotate the drawn sprite
      parent.Transform2D.RotateBy(GDMath.ToRadians(-4));

      //change the animation to something else (e.g. idle or use your own animation here)
      parent.Artist.SetTake("idle");
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[3])) {
      //rotate the drawn sprite
      parent.Transform2D.RotateBy(GDMath.ToRadians(4));

      //change the animation to something else (e.g. idle or use your own animation here)
      parent.Artist.SetTake("idle");
    }
  }

  CheckCollisions(parent) {

    this.HandleArchitectureCollision(parent);

    this.HandleEnemyCollision(parent);

    this.HandlePickupCollision(parent);
  }

  HandlePickupCollision(parent) {
    let sprites = this.objectManager.Get(ActorType.Pickup);

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];

      //we can use simple collision check here (i.e. Intersects) because dont need to think was it top, bottom, left, or right
      if (Collision.Intersects(parent, sprite)) {
        //your code - play sound, remove enemy, add health e.g. you could write code like this...

        //notify MyGameStateManager (which listens for game state changes) that health has increased and to play animation at the position of the removed sprite
        NotificationCenter.Notify(
          new Notification(
            NotificationType.GameState,   //notifies the MyGameStateManager
            NotificationAction.Pickup,    //indicates the type of game state event
            //pass value and a reference to the sprite we picked-up - see MyGameStateManager
            [
              //See MyGameStateManager::HandlePickup
              5,                            //value of the pickup
              "coin_pickup_decorator",      //id of the animation decorator to play (e.g. starburst) which must be already stored by MyGameStateManager
              parent,                       //reference to player that picked it up
              sprite,                       //reference to the pickup sprite
              "Some thing..."               //string to show when the pickup is collected
            ])); 

        //play sound
        NotificationCenter.Notify(
          new Notification(NotificationType.Sound, 
            NotificationAction.Play, [
            "coin_pickup"])); //id of the audio cue to play - see MyConstants::audioCueArray

        //remove coin
        NotificationCenter.Notify(
          new Notification(
            NotificationType.Sprite,
            NotificationAction.RemoveFirst,
            [sprite])); //reference to the pickup sprite
      }
    }
  }

  HandleEnemyCollision(parent) {

    let sprites = this.objectManager.Get(ActorType.Player);

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];

      if (Collision.Intersects(parent, sprite)) {
        //stop the player from moving otherwise s/he will move through the enemy!
        parent.Body.SetVelocityX(0);
        parent.Body.SetVelocityY(0);

        //play sound
        NotificationCenter.Notify(
          new Notification(NotificationType.Sound, NotificationAction.Play, [
            "coin_pickup"
          ]));

        //remove health
        NotificationCenter.Notify(
          new Notification(
            NotificationType.GameState,
            NotificationAction.Health,
            [-10]));
      }
    }
  }

  //#endregion

  //#region Core Methods - doesnt need to change
  Execute(gameTime, parent) {
    this.HandleInput(gameTime, parent);
    this.ApplyForces(parent);
    this.CheckCollisions(parent);
    this.ApplyInput(parent);
  }

  ApplyForces(parent) {
    //notice we need to slow body in X and Y and we dont ApplyGravity() in a top-down game
    parent.Body.ApplyFrictionX();
    parent.Body.ApplyFrictionY();
  }

  HandleArchitectureCollision(parent) {
    let sprites = this.objectManager.Get(ActorType.Architecture);

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      let collisionLocationType = Collision.GetIntersectsLocation(parent, sprite);

      //the code below fixes a bug which caused sprites to stick inside an object
      if (collisionLocationType === CollisionLocationType.Left) {
        if (parent.Body.velocityX <= 0)
          parent.Body.SetVelocityX(0);
      } else if (collisionLocationType === CollisionLocationType.Right) {
        if (parent.Body.velocityX >= 0)
          parent.Body.SetVelocityX(0);
      }
      //the code below fixes a bug which caused sprites to stick inside an object
      if (collisionLocationType === CollisionLocationType.Top) {
        if (parent.Body.velocityY <= 0)
          parent.Body.SetVelocityY(0);
      } else if (collisionLocationType === CollisionLocationType.Bottom) {
        if (parent.Body.velocityY >= 0)
          parent.Body.SetVelocityY(0);
      }

    }
  }

  ApplyInput(parent) {
    //if we have small left over values then zero
    if (Math.abs(parent.Body.velocityX) <= Body.MIN_SPEED)
      parent.Body.velocityX = 0;
    if (Math.abs(parent.Body.velocityY) <= Body.MIN_SPEED)
      parent.Body.velocityY = 0;

    //apply velocity to (x,y) of the parent's translation
    parent.Transform2D.TranslateBy(new Vector2(parent.Body.velocityX, parent.Body.velocityY));
  }
  //#endregion

  //#region Common Methods - Equals, ToString, Clone
  Equals(other) {
    //to do...
    throw "Not Yet Implemented";
  }

  ToString() {
    //to do...
    throw "Not Yet Implemented";
  }

  Clone() {
    //to do...
    throw "Not Yet Implemented";
  }
  //#endregion
}