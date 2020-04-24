/**
 * This class is responsible for drawing all the sprites within the game.
 * @author niall mcguinness
 * @version 1.0
 * @class RenderManager
 */

class RenderManager {
  //#region  Fields 
  //#endregion 

  //#region  Properties
  //#endregion

  constructor(id, statusType, objectManager, cameraManager, notificationCenter) {
    this.id = id;
    this.statusType = statusType;
    this.objectManager = objectManager;
    this.cameraManager = cameraManager;
    this.notificationCenter = notificationCenter;
    this.sprites = objectManager.Sprites;
    this.RegisterForNotifications();
  }

  //#region Notification Handling
  //handle all GameState type events - see PlayerBehavior::HandleEnemyCollision()
  RegisterForNotifications() {
    this.notificationCenter.Register(
      NotificationType.Menu,
      this,
      this.HandleNotification
    );
  }

  HandleNotification(...argArray) {
    let notification = argArray[0];
    switch (notification.NotificationAction) {
      case NotificationAction.ShowMenuChanged:
        this.statusType = notification.NotificationArguments[0];
        break;

      default:
        break;
    }
  }
  //#endregion

  Draw(gameTime) {
    //if update enabled for the object manager?
    if ((this.statusType & StatusType.IsDrawn) != 0) {
      //if the sprite is a background sprite OR it is inside the view of the camera then draw it
      for (let i = 0; i < this.cameraManager.cameras.length; i++) {   
        //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
    //  for (let key of Object.keys(this.sprites)) {
        for (let key in this.sprites) {
          //for the sprites inside the array for the current key call update
          for (let sprite of this.sprites[key]) {
            //always draw background animated decorators and apply camera culling i.e. if the sprite is seen by the camera  
           if (sprite.actorType == ActorType.NonCollidableAnimatedDecorator || Collision.Intersects(sprite, this.cameraManager.Cameras[i]) || sprite.actorType == ActorType.Background) {
              sprite.Draw(gameTime, this.cameraManager.cameras[i]);
            }
          }
        }
      }   
    }
  }

  //#region Equals, Clone, ToString 
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