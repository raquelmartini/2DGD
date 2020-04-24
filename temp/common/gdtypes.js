
/**
 * A parent class for primitives (i.e. GDSprite and GDRect) with common attributes (e.g. x, y, originX, alpha etc).
 *
 * @class GDPrimitive
 */
class GDPrimitive{

    /**
     * Returns an instance of a GDPrimitive. Never called directly since it is a parent for GDRect and GDSprite.
     * @param {number} x X-ordinate of the top-left corner of the drawn primitive in coordinate space (e.g. (0,0) is top-left corner of the canvas).
     * @param {number} y Y-ordinate of the top-left corner of the drawn primitive in coordinate space (e.g. (0,0) is top-left corner of the canvas).
     * @param {number} width Width of the drawn primitive.
     * @param {number} height Height of the drawn primitive.
     * @param {number} originX X-ordinate of the origin of the drawn primitive in coordinate space.
     * @param {number} originY Y-ordinate of the origin of the drawn primitive in coordinate space.
     * @param {number} rotationInDegrees Rotation, in degrees, of the drawn primitive around the Z-axis (i.e. points out from the screen). Clockwise rotation is positive.
     * @param {number} alpha Opacity of the drawn primitive, in the range [0,1].
     * @memberof GDPrimitive
     */
    constructor(x, y, width, height, originX, originY, rotationInDegrees, alpha) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.originX = originX;
        this.originY = originY;
        this.rotationInDegrees = rotationInDegrees || 0;
        this.alpha = alpha || 1;
    }

    /**
     * Returns the rotation in degrees converted to radians
     *
     * @returns {number} Rotation in radians
     * @memberof GDPrimitive
     */
    GetRotationInRadians() {
        return this.rotationInDegrees * Math.PI / 180;
    }

    Clone(){
        return new GDPrimitive(this.x, this.y, this.width, this.height, 
            this.originX, this.originY, this.rotationInDegrees, this.alpha);
    }

}

/**
 * Represents the parameters required to draw a simple rectangle primitive on canvas.
 *
 * @class GDRect
 */
class GDRect extends GDPrimitive{

    /**
     * Returns an instance of a GDRect.
     * @param {number} x X-ordinate of the top-left corner of the drawn primitive in coordinate space (e.g. (0,0) is top-left corner of the canvas).
     * @param {number} y Y-ordinate of the top-left corner of the drawn primitive in coordinate space (e.g. (0,0) is top-left corner of the canvas).
     * @param {number} width Width of the drawn primitive.
     * @param {number} height Height of the drawn primitive.
     * @param {number} originX X-ordinate of the origin of the drawn primitive in coordinate space.
     * @param {number} originY Y-ordinate of the origin of the drawn primitive in coordinate space.
     * @param {number} rotationInDegrees Rotation, in degrees, of the drawn primitive around the Z-axis (i.e. points out from the screen). Clockwise rotation is positive.
     * @param {string} strokeColor Color used to drawn the rectangle primitive perimeter.
     * @param {number} lineWidth Integer value indicating the thickness of the rectangle primitive perimeter.
     * @param {number} alpha Opacity of the drawn primitive, in the range [0,1].
     * @memberof GDRect
     */
    constructor(x, y, width, height, originX, originY, rotationInDegrees, strokeColor, lineWidth, alpha) {
        
        super(x, y, width, height, originX, originY, rotationInDegrees, alpha);
        this.strokeColor = strokeColor || "rgb(255,255,255)";  
        this.lineWidth = lineWidth || 1;
    }

    Draw(context) {
        context.save();
        context.translate(this.x + this.originX, this.y + this.originY);
        context.rotate(this.GetRotationInRadians());
        context.translate(-1 * (this.x + this.originX), -1 * (this.y + this.originY));
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeColor;
        context.globalAlpha = this.alpha;
        context.strokeRect(this.x, this.y, this.width, this.height);
        context.restore();
    }

    Clone(){
        return new GDRect(this.x, this.y, this.width, this.height, 
            this.originX, this.originY, this.rotationInDegrees, 
            this.strokeColor, this.lineWidth, this.alpha);
    }
}

/**
 * Represents the parameters required to draw a portion of pixel data (defined by source (x, y, width, height)) of a spritesheet on canvas.
 *
 * @class GDSprite
 */
class GDSprite extends GDPrimitive{

    /**
     * Returns an instance of a GDSprite.
     * @param {Image} spritesheet Image data for the sprite.
     * @param {number} x X-ordinate of the top-left corner of the drawn primitive in coordinate space (e.g. (0,0) is top-left corner of the canvas).
     * @param {number} y Y-ordinate of the top-left corner of the drawn primitive in coordinate space (e.g. (0,0) is top-left corner of the canvas).
     * @param {number} width Width of the drawn primitive.
     * @param {number} height Height of the drawn primitive.
     * @param {number} sX X-ordinate of the top-left corner of the pixel data to use from the spritesheet in texture space (i.e. from (0,0) to sprite sheet (width, height)).
     * @param {number} sY Y-ordinate of the top-left corner of the pixel data to use from the spritesheet in texture space (i.e. from (0,0) to sprite sheet (width, height)).
     * @param {number} sWidth Width of the source pixel data in texture space (i.e. the images width in an image editor like Paint/Photoshop/Gimp).
     * @param {number} sHeight Height of the source pixel data in texture space (i.e. the images height in an image editor like Paint/Photoshop/Gimp).
     * @param {number} originX X-ordinate of the origin of the drawn primitive in coordinate space.
     * @param {number} originY Y-ordinate of the origin of the drawn primitive in coordinate space.
     * @param {number} rotationInDegrees Rotation, in degrees, of the drawn primitive around the Z-axis (i.e. points out from the screen). Clockwise rotation is positive.
     * @param {number} alpha Opacity of the drawn primitive, in the range [0,1].
     * @memberof GDSprite
     */
    constructor(spritesheet, x, y, width, height, sX, sY, sWidth, sHeight, 
                                    originX, originY, rotationInDegrees, alpha) {

        super(x, y, width, height, originX, originY, rotationInDegrees, alpha);
        this.spritesheet = spritesheet;
        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
    }

    Draw(context, rotateParent, translateParent) {
        context.save();

        context.translate(translateParent.x, translateParent.y);
        context.rotate(GDMath.ToRadians(rotateParent));
        context.translate(-translateParent.x, -translateParent.y);

        context.translate(this.x, this.y);
        context.rotate(this.GetRotationInRadians());
        context.translate(-1 * this.x, -1 * this.y);

        context.globalAlpha = this.alpha;
        context.drawImage(this.spritesheet,this.sX, this.sY, 
            this.sWidth, this.sHeight,
            this.x - this.originX, 
            this.y - this.originY, 
            this.width, this.height);
    
        context.restore();
    }

    Clone(){
        return new GDSprite(this.spritesheet, this.x, this.y, this.width, this.height, 
            this.sX, this.sY, this.sWidth, this.sHeight, 
            this.originX, this.originY, this.rotationInDegrees, this.alpha);
    }
}