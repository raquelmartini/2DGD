
/********************************************** Demos  **********************************************/

RunDemos();

function RunDemos() {
  Demo1();
}


/**
 * Demo creates common game elements (canvas, score, loader) and uses custom CSS properties to set CSS property values from JS
 */
function Demo1() {
  SetElementText("#sub-title", "Creates common game elements (canvas, score, loader) and uses custom CSS properties to set CSS property values from JS");

  let container = document.querySelector(".canvas-container");

  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas-top");
  canvas.setAttribute("class", "game-canvas");
  canvas.setAttribute("style", "width:640; height:480; z-index: 1;");

  let score = document.createElement("div");
  score.innerText = "Score: 5/10";
  score.setAttribute("style", "position:absolute; top: 5%; left: 50%; z-index: 2; margin-left: -50;");

  let loader = document.createElement("div");
  loader.setAttribute("class", "loader");
  
  let width = Number.parseInt(prompt("Enter loader width: ", "100"));
  let height = Number.parseInt(prompt("Enter loader height: ", "100"));
  let loaderSpinDuration = Number.parseInt(prompt("Enter loader spin duraton: ", "3"));
  let color = prompt("Enter loader color (e.g. #f00, red, #0f0, green): ", "red");
  let halfWidth = width/2;
  let halfHeight = height/2;

  //notice how we can set the custom properties (e.g. --loader-spin-duration) using JS which will set the CSS style in the CSS file
  loader.setAttribute("style", "position:absolute; top: 50%; left: 50%; margin-top: " + -1*halfWidth + "px; margin-left: " + -1*halfHeight + "px; --loader-width: " + width + "px; --loader-height: " + height + "px; --loader-spin-duration: " + loaderSpinDuration + "s; --loader-color: " + color + "; z-index: 3;");

  container.appendChild(canvas);
  container.appendChild(score);
  container.appendChild(loader);
}

/********************************************************* Utility Functions *********************************************************/

function SetElementText(cssSelector, text) {
  let element = document.querySelector(cssSelector);
  element.innerText = text;
}
