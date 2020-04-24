/**
 * Moves Camera2D by changing the parent transform based on time or user input.
 * @author niall mcguinness
 * @version 1.0
 * @class FlightCameraBehavior
 */
class FlightCameraBehavior extends Behavior{
  constructor(keyboardManager, moveKeys, moveSpeed, rotateSpeedInRadians, scaleSpeed) {
    super();
    this.keyboardManager = keyboardManager;
    this.moveKeys = moveKeys;
    this.moveSpeed = moveSpeed;
    this.rotateSpeedInRadians = rotateSpeedInRadians;
    this.scaleSpeed = scaleSpeed;
  }

  Execute(gameTime, parent) {

    //translate
    if (this.keyboardManager.IsKeyDown(this.moveKeys[0])) {
      parent.Transform2D.TranslateBy(Vector2.MultiplyScalar(this.moveSpeed, -1));
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[1])) {
      parent.Transform2D.TranslateBy(this.moveSpeed);
    }

    if (this.keyboardManager.IsKeyDown(this.moveKeys[2])) {
      parent.Transform2D.TranslateBy(new Vector2(-2, 0));
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[3])) {
      parent.Transform2D.TranslateBy(new Vector2(2, 0));
    }

    //rotate
    if (this.keyboardManager.IsKeyDown(this.moveKeys[4])) {
      parent.Transform2D.RotateBy(-this.rotateSpeedInRadians);
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[5])) {
      parent.Transform2D.RotateBy(this.rotateSpeedInRadians);
    }

    //scale
    if (this.keyboardManager.IsKeyDown(this.moveKeys[6])) {
      parent.Transform2D.ScaleBy(this.scaleSpeed);
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[7])) {
      parent.Transform2D.ScaleBy(Vector2.MultiplyScalar(this.scaleSpeed, -1));
    }

    //reset 
    if (this.keyboardManager.IsKeyDown(this.moveKeys[8])) {
      parent.Transform2D.Reset();
    }
  }

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