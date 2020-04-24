/**
 * Represents a 2D vector within the game engine.
 * @author niall mcguinness
 * @version 1.0
 * @class Vector2
 */
class Vector2 {
  //#region Fields
  //#endregion

  //#region Properties
  static get Zero() {
    return new Vector2(0, 0);
  }
  static get One() {
    return new Vector2(1, 1);
  }
  static get UnitX() {
    return new Vector2(1, 0);
  }
  static get UnitY() {
    return new Vector2(0, 1);
  }
  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
  }
  set X(x) {
    this.x = x;
    this.isDirty = true;
  }
  set Y(y) {
    this.y = y;
    this.isDirty = true;
  }
  //#endregion

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isDirty = true;
  }

  Add(otherVector) {
    this.x += otherVector.x;
    this.y += otherVector.y;
  }

  //v1.Subtract(v2);
  Subtract(otherVector) {
    this.x -= otherVector.x;
    this.y -= otherVector.y;
  }

  Multiply(otherVector) {
    this.x *= otherVector.x;
    this.y *= otherVector.y;
  }

  MultiplyScalar(s) {
    this.x *= s;
    this.y *= s;
  }

  Divide(otherVector) {
    this.x /= otherVector.x;
    this.y /= otherVector.y;
  }

  DivideScalar(s) {
    this.x /= s;
    this.y /= s;
  }

  Dot(otherVector) {
    return this.x * otherVector.x + this.y * otherVector.y;
  }

  Length() {
    if (this.isDirty) {
      this.length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); //PYTHAGORAS
      this.isDirty = false;
    }
    return this.length;
  }

  AngleInRadiansBetween(otherVector) {
    return Math.acos(this.Dot(otherVector) / (this.Length() * otherVector.Length()));
  }

  Distance(otherVector) {
    return Math.sqrt(
      Math.pow(this.x - otherVector.x, 2) + Math.pow(this.y - otherVector.y, 2)
    );
  }

  Abs() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
  }

  Round(precision){
    this.x = GDMath.ToFixed(this.x, precision, 10);
    this.y = GDMath.ToFixed(this.y, precision, 10);
  }

  Normalize() {
    var len = this.Length();

    if(len == 0)
    {
      this.x /= len;
      this.y /= len;
    }
    else
      throw "Error: Divide by zero error on Normalize()! Is the vector non-zero?";
  }

  //#region Equals, Clone, ToString
  Equals(otherVector) {
    return GDUtility.IsSameTypeAsTarget(this, otherVector) && this.x === otherVector.x && this.y === otherVector.y;
  }

  Clone() {
    return new Vector2(this.x, this.y);
  }

  ToString() {
    return "[" + this.x + "," + this.y + "]";
  }
  //#endregion

  //#region Static Methods
  static Add(vector1, vector2) {
    return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  //let vC = Vector2.Substract(vA, vB);
  static Subtract(vector1, vector2) {
    return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  static Multiply(vector1, vector2) {
    return new Vector2(vector1.x * vector2.x, vector1.y * vector2.y);
  }

  static MultiplyScalar(vector, scalar) {
    return new Vector2(vector.x * scalar, vector.y * scalar);
  }

  static Divide(vector1, vector2) {

    if(vector2.x == 0 || vector2.y == 0)
      throw "Error: Cannot divide by zero!";

    return new Vector2(vector1.x / vector2.x, vector1.y / vector2.y);
  }

  static DivideScalar(vector, scalar) {
    return new Vector2(vector.x / scalar, vector.y / scalar);
  }

  static Normalize(vector) {
    var len = vector.Length();

    if(len != 0)
      return new Vector2(vector.x / len, vector.y / len);
    else
      throw "Error: Divide by zero error on Normalize()! Is the vector non-zero?";
  }

  static Distance(vector1, vector2) {
    return vector1.Distance(vector2);
  }

  static Abs(vector) {
    return new Vector2(Math.abs(vector.x), Math.abs(vector.y));
  }

  static Transform(vector, matrix){
    let x = vector.x * matrix.a11 + vector.y * matrix.a21 + matrix.a31;
    let y = vector.x * matrix.a12 + vector.y * matrix.a22 + matrix.a32;
    return new Vector2(x, y);
  }

  static Round(vector, precision){
    return new Vector2(GDMath.ToFixed(vector.x, precision, 10), GDMath.ToFixed(vector.y, precision, 10));
  }

  //#endregion
}