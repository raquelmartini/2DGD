/**
 * Renders a rectangle primitive for the parent sprite
 * @author niall mcguinness
 * @version 1.0
 * @class RectangleSpriteArtist
 */
class RectangleSpriteArtist extends Artist {
    //#region  Fields 
    //#endregion 

    //#region  Properties
    get LineWidth() {
        return this.lineWidth;
    }
    set LineWidth(lineWidth) {
        this.lineWidth = lineWidth;
    }
    get StrokeStyle() {
        return this.strokeStyle;
    }
    set StrokeStyle(strokeStyle) {
        this.strokeStyle = strokeStyle;
    }
    get FillStyle() {
        return this.fillStyle;
    }
    set FillStyle(fillStyle) {
        this.fillStyle = fillStyle;
    }
    get Alpha() {
        return this.alpha;
    }
    set Alpha(alpha) {
        this.alpha = alpha > 1 || alpha < 0 ? 1 : alpha;
    }
    //#endregion

    constructor(lineWidth, strokeStyle, fillStyle, alpha = 1) {
        super(alpha);
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }

    /**
     * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @param {Camera2D} activeCamera 
     * @memberof RectangleSpriteArtist
     */
    Update(gameTime, parent) {

    }

    /**
     * Renders rectangle to canvas
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof RectangleSpriteArtist
     */
    Draw(gameTime, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();

        //apply the sprite transformations to the sprite 
        parent.SetContext(activeCamera.Context);

        //access the transform for the parent that this artist is attached to
        let transform = parent.transform2D;

        activeCamera.context.lineWidth = this.lineWidth;
        activeCamera.context.strokeStyle = this.strokeStyle;
        activeCamera.context.fillStyle = this.fillStyle;
        activeCamera.context.strokeRect(
            transform.translation.x - transform.origin.x, 
            transform.translation.y - transform.origin.y, 
            transform.dimensions.x, transform.dimensions.y);
        activeCamera.context.fillRect(
            transform.translation.x - transform.origin.x, 
            transform.translation.y - transform.origin.y, 
            transform.dimensions.x, transform.dimensions.y);
        activeCamera.context.restore();
    }

    DrawParented(gameTime, attached, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();

        //apply the transformations coming from the attached parent
        attached.SetContext(activeCamera.context);

        //apply the sprite transformations to the sprite 
        parent.SetContext(activeCamera.context);

        //access the transform for the parent that this artist is attached to
        let transform = parent.transform2D;

        activeCamera.context.lineWidth = this.lineWidth;
        activeCamera.context.strokeStyle = this.strokeStyle;
        activeCamera.context.fillStyle = this.fillStyle;
        activeCamera.context.strokeRect(
            transform.translation.x - transform.origin.x, 
            transform.translation.y - transform.origin.y, 
            transform.dimensions.x, transform.dimensions.y);
        activeCamera.context.fillRect(
            transform.translation.x - transform.origin.x, 
            transform.translation.y - transform.origin.y, 
            transform.dimensions.x, transform.dimensions.y);
        activeCamera.context.restore();
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        return super.Equals(other) && this.rect.Equals(other.Rect) && this.lineWidth === other.Cells &&
            this.strokeStyle === other.StrokeStyle && this.fillStyle === other.FillStyle &&
            this.alpha === other.Alpha;
    }

    Clone() {
        return new RectangleSpriteArtist(this.rect.Clone(), this.lineWidth, this.strokeStyle, this.fillStyle, this.Alpha);
    }

    ToString() {
        return "[" + this.rect + "," + this.lineWidth + "," + this.strokeStyle + "," + this.fillStyle + "," + this.alpha + "]";
    }

    //#endregion
}