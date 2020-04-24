/**
 * This class is responsible for listening, and responding to, notifications 
 * relating to game state changes (e.g. win/lose, fire bullet, play animation over pickup)
 * @author niall mcguinness
 * @version 1.0
 * @class MyGameStateManager
 */

class MyGameStateManager extends GameStateManager {
    //#region  Fields 
    //#endregion 

    //#region  Properties
    //#endregion

    constructor(id, statusType, objectManager, cameraManager, 
        notificationCenter, spriteArchetypeArray, screenObjectArray) {
        super(id);
        this.id = id;
        this.statusType = statusType;
        this.objectManager = objectManager;
        this.cameraManager = cameraManager;

        //an array that stores the archetypes to be used by the game state manager
        this.spriteArchetypeArray = spriteArchetypeArray;

        //an array of the objects that contain information that this class needs to process and show UI notifications (e.g. playerID, uiID) 
        //for example, when a notification is received which of the two game screens (and player states) does it affect?
        this.screenObjectArray = screenObjectArray;

        //listen for notifications including menu related to set the statustype of this manager appropriately (e.g. as with ObjectManager, RenderManager)
        this.notificationCenter = notificationCenter;
        this.RegisterForNotifications();

        //setup the UIs for the players listed in screenObjectArray
        this.InitializeAllUIs();
    }

    /**
     * Setup all the UIs for the players in the game
     *
     * @memberof MyGameStateManager
     */
    InitializeAllUIs() {
        for (let screenObject of this.screenObjectArray)
            this.InitializeDemoUI(screenObject.uiID);
    }


    /**
     * Creates a demo UI for each player in the screenObjectArray and adds the HTML elements (e.g. div_score) to the correct canvas
     * You should change this method to add whatever UI elements your game uses.
     * @param {*} uiID
     * @memberof MyGameStateManager
     */
    InitializeDemoUI(uiID) {

        //some value to start our score with
        let initialScore = 0;
        //get a handle to the div that we use for adding UI elements for this particular canvas (e.g. player-ui-top)
        let container = document.querySelector("#" + uiID);
        //create element to store the score
        let div_score = document.createElement("div");
        //set text
        div_score.innerText = "Score: " + initialScore;
        //now class for any effects e.g. fadein
        div_score.setAttribute("class", "ui-info");
        //now position
        div_score.setAttribute("style", "bottom: 1%; right: 1%;");
        //add to the container so that we actually see it on screen!
        container.appendChild(div_score);
    }

    //#region Notification Handling
    RegisterForNotifications() {

        //register for menu notification
        this.notificationCenter.Register(
            NotificationType.Menu,
            this,
            this.HandleNotification
        );

        //register for pickup notifications so we can play animations, change game state (e.g. win/lose or add points to player UI)
        this.notificationCenter.Register(
            NotificationType.GameState,
            this,
            this.HandleNotification
        );
    }

    HandleNotification(...argArray) {
        let notification = argArray[0];
        switch (notification.NotificationAction) {
            case NotificationAction.ShowMenuChanged:
                this.HandleShowMenuChanged(notification.NotificationArguments[0]);
                break;

            case NotificationAction.Pickup:
                this.HandlePickup(
                    notification.NotificationArguments[0], //value of the pickup (e.g. 5 points)
                    notification.NotificationArguments[1], //id of the animation decorator to play (e.g. "coin_pickup_decorator") which must be already stored by MyGameStateManager::spriteArchetypeArray
                    notification.NotificationArguments[2], //reference to player that picked it up so we can obtain player ID and know which canvas to update
                    notification.NotificationArguments[3], //reference to the pickup sprite so that we can obtain its position and draw any animated decorator at that point
                    notification.NotificationArguments[4]); //string to show when the pickup is collected
                break;

            default:
                break;
        }
    }

    HandleShowMenuChanged(statusType) {

        //set the status of the manager so that its Update() will execute (or not if StatusType.Off)
        this.statusType = statusType; //statusType to set this manager to (e.g. Off, IsDrawn, IsDrawn | IsUpdated)

        //set the UI to visible or hidden
        this.ToggleDisplayUIs(statusType);
    }

    ToggleDisplayUIs(statusType) {
        //loop through each of the two players and get the uiID of the DIV for that player
        for (let screenObject of this.screenObjectArray) {
            //if show then set display to none (i.e. hidden)
            if (statusType == StatusType.Off)           
                document.querySelector("#" + screenObject.uiID).setAttribute("style", "display: none;");
            //if show then set display to block (i.e. visible)
            else                                       
                document.querySelector("#" + screenObject.uiID).setAttribute("style", "display: block;");
        }
    }

    /**
     * Called when a behavior (e.g. SamPlayerBehavior) publishes a notification with NotificationType.GameState and NotificationAction.Pickup
     *
     * @param {number} value Value of the pickup (e.g. 5 for ammo)
     * @param {string} decoratorID ID (found in spriteArchetypeArray) of the decorator to show when this pickup is collided with. 
     * @param {Sprite} parent Reference to the sprite (i.e. the player object) that collected the pickup
     * @param {Sprite} sprite Reference to the sprite that was collected
     * @memberof MyGameStateManager
     */
    HandlePickup(value, decoratorID, parent, sprite, description) {
        //show an animation (based on archetype provided to InitializeArchetypes())
        this.ShowPickupAnimatedDecorator(decoratorID, sprite, description);

        //update the UI
        this.UpdateUI(value, parent, sprite);

        //update the game state
        this.UpdateGameState(value, parent, sprite);
    }

    //#endregion


    /**
     * Called to add an animated decorator for a pickup to the object manager
     *
     * @param {number} value Value of the pickup (e.g. 5 for ammo)
     * @param {string} decoratorID ID (found in spriteArchetypeArray) of the decorator to show when this pickup is collided with. 
     * @param {Sprite} sprite Reference to the sprite that was collected so that we can obtain its translation
     * @memberof MyGameStateManager
     */
    ShowPickupAnimatedDecorator(decoratorID, sprite, description) {
     
        let bUseCSS = true;

        //we can use our spritesheet
        if(!bUseCSS)
        {
            //clone the decorator from the archetypeArray
            let decorator = this.spriteArchetypeArray[decoratorID].Clone();
            //turn the decorator (i.e. the animated sprite on)
            decorator.statusType = StatusType.IsDrawn | StatusType.IsUpdated;
            //set the position of the sprite
            decorator.Transform2D.SetTranslation(Vector2.Subtract(sprite.transform2D.translation, sprite.transform2D.origin));
            //add to the object manager
            this.objectManager.Add(decorator);            
        }
//#region DEMO ONLY - ONLY DRAWS TO TOP SCREEN AND HAS BUG WHEN CAMERA MOVES
         //or we can use CSS instead
        else{
            //this is a rough approximation of the position based on the players position 
            let x = sprite.transform2D.translation.x;
            let y = sprite.transform2D.translation.y;

            //notice that I'm just sending this notification to the top screen 
            let container = document.querySelector("#" + this.screenObjectArray[0].uiID);
            //create element to store the score
            let div_score = document.createElement("div");
            //set text
            div_score.innerText = description;
            //now class for any effects e.g. fadein
            div_score.setAttribute("class", "ui-info-pickup-value");
            //now position
            div_score.setAttribute("style", "left:" + x + "px; top:" + y + "px;");
            //add to the container so that we actually see it on screen!
            container.appendChild(div_score);
        }
//#endregion

    }

    UpdateGameState(value, parent, sprite) {

    }

    UpdateUI(value, parent, sprite) {

    }

    Update(gameTime) {

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