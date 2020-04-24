/**
 * Represents a camera within a game with position information (e.g. camera, sprite, menu element) and a collisionPrimitive object 
 * available through its parent class, Actor2D. 
 * 
 * Note that this class contains a reference to the context in its constructor. Remember a reference to a context is a reference to a
 * canvas. By passing the reference we are associating a camera with a particular canvas. This is important for two reasons:
 * 
 * 1) Camera culling - A camera has a collision primitive (typically a rectangle) and as the camera moves over the game world this collision primitive,
 * the rectangle changes its (x,y) values to reflect the cameras new position. If we know where the cameras collision primitive is then we
 * can cull (i.e. draw/not draw) the primitives seen by the camera for the associated canvas (pointed to by the context passed as a constructor parameter)
 * 
 * 2) Camera transformations - If we attach a behavior to the camera that causes it to translate, rotate, or scale then we need to be able to apply
 * those transformations to the canvas when the behavior is activated. For example, if pressing the Z key causes the camera to zoom in then we
 * need to be able to tell the canvas to apply a scale to the context (i.e. scale all drawn sprites up or down based on the zoom direction). We
 * apply the cameras transformations to every sprite by calling activeCamera.SetContext() - see RenderManager::Draw().
 *
 * @author niall mcguinness
 * @version 1.0
 * @class Camera2D
 */

class Camera2D extends Actor2D {

    //#region Fields
    //#endregion 

    //#region Properties
    get Context()
    {
        return this.context;
    }
    //#endregion

    constructor(id, actorType, transform2D, statusType, context) {
        super(id, actorType, CollisionType.Collidable, transform2D, statusType);

        //a handle to the context (and in turn the canvas) that this camera is drawing to.
        this.context = context;
    }

    /**
     * Updates state information and executes attached behavior(s)
     *
     * @param {GameTime} gameTime
     * @see Actor2D::Update()
     * @memberof Camera2D
     */
    Update(gameTime) {
        super.Update(gameTime); //call parent, do nothing else
    }

    /**
     * Allows the canvas to be transformed (i.e. translation, rotation, scale) based on the transform values of the camera.
     * 
     * @see DebugDrawer::DrawBoundingBox()
     * @memberof Camera2D
     */
    SetContext() {
        let transform = this.Transform2D;
        this.context.translate(transform.origin.x, transform.origin.y);
        this.context.scale(transform.scale.x, transform.scale.y);
        this.context.rotate(transform.rotationInRadians);
       // this.context.translate(-transform.origin.x, -transform.origin.y);
        this.context.translate(-transform.translation.x, -transform.translation.y);
    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other) && this.context === other.Context; 
    }

    ToString() {
        return super.ToString() + "," + this.context;
    }

    Clone() {
        return new Camera2D(this.ID, this.ActorType, this.CollisionType, this.Transform2D, this.StatusType, this.context);

    }
    //#endregion
}