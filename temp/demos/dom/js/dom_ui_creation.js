class Sentinel {

  static Infinite = -1;

  constructor(initialValue = true) {
    this.value = initialValue;
  }

  get Value() {
    return this.value;
  }

  set Value(value) {
    this.value = value;
  }
}

/********************************************** Demos  **********************************************/

RunDemos();

function RunDemos() {
  let demoChoice = Number.parseInt(prompt("Enter demo number (1-6):", "1"));
  if (demoChoice == 1)
    Demo1();
  else if (demoChoice == 2)
    Demo2();
  else if (demoChoice == 3)
    Demo3();
  else if (demoChoice == 4)
    Demo4();
  else if (demoChoice == 5)
    Demo5();
  else
    Demo6();

}


/**
 * Demo adds an element to a div container after 500ms then removes the element after 5000ms
 */
function Demo1() {
  SetElementText("#sub-title", "Adds an element to a div container after 500ms then removes the element after 5000ms");

  let container = document.querySelector(".canvas-container");
  let div_toast = document.createElement("div");
  div_toast.setAttribute("style", "position: absolute; top: 5%; left: 5%;"); //using percentages to position the element i.e. 5% in, 5% down
  div_toast.innerHTML = "This is demo 1 - the text appears after 500ms and disappears again after 5000ms!";

  let toast = showElementsFor(container, [div_toast], 500, 5000).then(resolve => {
    console.log("Demo 1 - showElementFor has finished!");
  });

  console.log("Demo 1 - this message shows even though the resolve function hasnt been called!");
}

/**
 * Demo adds two successive (i.e. sequenced) elements to a div container using the AWAIT/SYNC keywords and Promises
 */
function Demo2() {
  SetElementText("#sub-title", "Adds two successive (i.e. time sequenced) elements to a div container using the AWAIT/SYNC keywords and Promises");
  RunAsync();
}

async function RunAsync() {
  let container = document.querySelector(".canvas-container");
  let div_toast = document.createElement("div");
  div_toast.setAttribute("style", "color: green; font-family: Impact, Charcoal, sans-serif; font-size: 14pt;");
  div_toast.innerHTML = "This is demo 2a - the first text appears after 500ms and disappears again after 5000ms!";

  let toast = await showElementsFor(container,  [div_toast], 500, 5000).then(resolve => {
    console.log("Demo 2 - showElementFor - first toast is finished!");
  });

  div_toast.innerHTML = "This is demo 2b - the second text appears immediately after the first and disappears again after 8000ms!";
  div_toast.setAttribute("style", "color: red; font-size: 2em;  background: -webkit-linear-gradient(#eee, #333); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"); //2em = 2x default text size
  toast = await showElementsFor(container,  [div_toast], 0, 8000).then(resolve => {
    console.log("Demo 2 - showElementFor - second toast is finished!");
  });

  console.log("Demo 2 - I wont print until both ASYNC resolve functions have returned!");
}

/**
 * Demo adds a centered element to a div container until a sentinel object flag is changed by a timer
 */
function Demo3() {
  SetElementText("#sub-title", "Adds a centered element to a div container until a sentinel object flag is changed by a timer");

  let s = new Sentinel(true);
  let container = document.querySelector(".canvas-container");
  let div_toast = document.createElement("div");
  let text = "Text remains until timer(5 secs) controlled sentinel value is false!";
  div_toast.innerHTML = text;
  div_toast.style.font = "10pt Arial, sans serif";                            //set font size and family
  let width = GetTextDimensions(div_toast, div_toast.style.font).width;       //get dimensions of the specific text
  width /= 2;                                                                 //get half-width so we can use to center with margin-left
  div_toast.setAttribute("style", "position: absolute; top: 5%; left: 50%; margin-left: " + -1*width + ";");  //position and center horizonatally
  
  let toast = showElementsWhile(container,  [div_toast], s, 0, 500, Sentinel.Infinite);
  toast.then(resolve => {
    console.log("Demo 3 - Element is no longer showing!")
  });

  setTimeout(() => {
    s.Value = false; //set the Sentinel.Value to false to stop the showElementWhile interval timer
    console.log("Demo 3 - 5000ms timer has elapsed and will set the flag that stops the element from showing!");
  }, 5000);

  console.log("Demo 3 - Does this message show before the 5000ms timer elapsed?");
}


/**
 * Demo adds multiple UI elements to a div container
 */
function Demo4() {
  SetElementText("#sub-title", "Adds multiple UI elements to a div container");

  let container = document.querySelector(".canvas-container");

  let element1 = document.createElement("div");
  element1.setAttribute("style", "position: absolute; top: 5%; left: 5%; color: white; background-color: red;"); 
  element1.innerText = "Player 1";

  let element2 = document.createElement("b");
  element2.setAttribute("style", "position: absolute; top: 10%; left: 5%; color: white; background-color: green;"); 
  element2.innerText = "Score: 4/10";

  let element3 = document.createElement("u");
  element3.setAttribute("style", "position: absolute; top: 15%; left: 5%; color: white; background-color: blue;"); 
  element3.innerText = "Something important!";

  container.appendChild(element1);
  container.appendChild(element2);
  container.appendChild(element3);
}


/**
 * Demo adds multiple UI elements to a div container and uses a CSS class to set styling
 */
function Demo5() {
  SetElementText("#sub-title", "Adds multiple UI elements to a div container and uses a CSS class to set styling");

  let container = document.querySelector(".canvas-container");
  
  /*****************************************************************/
  let element1 = document.createElement("div");
  element1.setAttribute("class", "ui-info-player"); 
  element1.innerText = "Player 1";

  /*****************************************************************/
  let element2 = document.createElement("b");
  element2.setAttribute("class", "ui-info-score"); 
  element2.innerText = "Score: 4/10";

  /*****************************************************************/
  let element3 = document.createElement("div");
  element3.setAttribute("class", "ui-info-inventory"); 
  element3.innerText = "Inventory";

  /*****************************************************************/
  let element4 = document.createElement("div");
  element4.innerText = "Capture the Flag";
  element4.setAttribute("class", "ui-info-goal"); 

  /*****************************************************************/ 
  let element5 = document.createElement("div");
  let starImgArchetype = document.createElement("img");
  starImgArchetype.src = "../../assets/images/demos/UI/Star.png";

  let star1 = starImgArchetype.cloneNode(true);
  star1.setAttribute("style", "position: absolute; width: 20px; height; 20px; bottom: 5%; right: 15%");
  element5.appendChild(star1);

  let star2 = starImgArchetype.cloneNode(true);
  star2.setAttribute("style", "position: absolute; width: 20px; height; 20px; bottom: 5%; right: 10%");
  element5.appendChild(star2);

  let star3 = starImgArchetype.cloneNode(true);
  star3.setAttribute("style", "position: absolute; width: 20px; height; 20px; bottom: 5%; right: 5%");
  element5.appendChild(star3);

  /*****************************************************************/
  container.appendChild(element1);
  container.appendChild(element2);
  container.appendChild(element3);
  container.appendChild(element4);
  container.appendChild(element5);
}



/**
 * Demo adds an ARRAY of UI elements to a div container for a user-prompted period of time in ms
 */
function Demo6() {
  SetElementText("#sub-title", "Adds an ARRAY of UI elements to a div container for a user-prompted period of time in ms");

  let container = document.querySelector(".canvas-container");

  let element1 = document.createElement("div");
  element1.innerHTML = "<h2><i>Player 1</i></h2>";

  let element2 = document.createElement("b");
  element2.innerText = "Score: 4/10";

  let br = document.createElement("br");

  let element3 = document.createElement("a");
  element3.href = "www.dkit.ie";
  element3.innerText = "Click me!";

  let timeInMs = Number.parseInt(prompt("How long would you like to see the elements for in ms?", "4000"));
  let ui_info = showElementsFor(container, [element1, element2, br, element3], 0, timeInMs);
}



/********************************************************* Utility Functions *********************************************************/

function SetElementText(cssSelector, text) {
  let element = document.querySelector(cssSelector);
  element.innerText = text;
}

/**
 * Adds an array of HTML elements to a parent element for a duration of time in ms.
 *
 * @param {HTMLElement} parentElement Parent HTML element into which the childElement is added 
 * @param {HTMLElement} childElementArray Array of child elements added to the parent
 * @param {number} delayTimeInMs Delay in ms before adding the child element to the parent
 * @param {number} timeToLiveInMs Time in ms after which the child is removed from the parent
 * @returns Promise which allows calling code to attach a resolve callback function
 * @author niall mcguinness
 * @see https://javascript.info/promise-basics
 * @see https://www.w3schools.com/jsref/met_win_settimeout.asp
 */
function showElementsFor(parentElement, childElementArray, delayTimeInMs, timeToLiveInMs) {

  setTimeout(() => {
    for (let element of childElementArray)
      parentElement.appendChild(element);
  }, delayTimeInMs); //start timer to add elements to parent after delayTimeInMs

  return new Promise(resolve => { //return Promise and start timer for removal
    setTimeout(() => {
        for (let element of childElementArray)
          parentElement.removeChild(element);
        resolve();
      },
      timeToLiveInMs)
  });
}

/**
 * Adds an array of HTML elements to a parent element until a sentinel getter returns false.
 *
 * @param {HTMLElement} parentElement Parent HTML element into which the childElement is added 
 * @param {HTMLElement} childElementArray Array of child elements added to the parent
 * @param {Sentinel} sentinel Instance of a class which provides a getter (i.e. Value) on boolean flag
 * @param {number} delayTimeInMs Delay in ms before adding the child element to the parent
 * @param {number} repeatIntervalInMs Delay in ms before repeating the interval timer
 * @param {number} maxRepeatCount Maximum number of times the interval timer will loop, -1 to loop infinitely
 * @returns Promise which allows calling code to attach a resolve callback function
 * @author niall mcguinness
 * @see https://javascript.info/promise-basics
 * @see https://www.w3schools.com/jsref/met_win_setinterval.asp
 */
function showElementsWhile(parentElement, childElementArray, sentinel, delayTimeInMs, repeatIntervalInMs, maxRepeatCount) {

  let executionCount = 0; //if sentinel is false OR we have exceeded the maximum number of repeats (excluding -1 which means loop forever) then remove child, stop interval timer and call resolve callback
  return new Promise(function (resolve) { //return Promise and start timer for checking sentinel
    if (sentinel.Value) {
      //does the sentinel flag allow us to start?    
      setTimeout(() => {
        for (let element of childElementArray)
          parentElement.appendChild(element);
      }, delayTimeInMs); //start timer to add elements to parent after delayTimeInMs

      timer = setInterval(() => { //start a repeating timer to check if sentinel is still true
        if (!sentinel.Value || (maxRepeatCount != Sentinel.Infinite && executionCount >= maxRepeatCount)) { //if sentinel is false OR we have exceeded the maximum number of repeats (excluding -1 which means loop forever) then remove child, stop interval timer and call resolve callback
          for (let element of childElementArray)
            parentElement.removeChild(element);
          clearInterval(timer);
          resolve();
        } else //if we are not finishing then increment the executionCount which is used to prevent us from running indefinitely
          executionCount++;
      }, repeatIntervalInMs);
    }
  });
}

/**
 * Returns the dimensions of text when drawn to a specified context (i.e. a canvas)
 *
 * @param {Context} context Context on which the text will be rendered
 * @param {HTMLElement} element HTML element containing text (e.g. div, b, p)
 * @param {string} textBaseline Indicates the horizontal line where text is vertically aligned with the canvas (e.g. top, hanging, middle, alphabetic, ideographic, and bottom)
 * @returns Object containing width and height of the text when rendered to the context
 * @see https://www.w3schools.com/tags/canvas_textbaseline.asp
 * @author niall mcguinness
 */
function GetTextDimensions(context, element, textBaseline) {
  if (element.font)
    context.font = element.font;
  else
    throw "Error: element has no specified font!";

  context.textBaseline = textBaseline;
  let dimensions = context.measureText(element.innerHTML || element.innerText);
  return {
    width: Math.ceil(dimensions.width),
    height: Math.ceil(dimensions.actualBoundingBoxAscent - dimensions.actualBoundingBoxDescent)
  };
}

/**
 * Returns the dimensions of text when drawn to a dynamially generated context (i.e. a canvas)
 *
 * @param {HTMLElement} element HTML element containing text (e.g. div, b, p)
 * @param {string} font Font string indicating the size and font family (e.g. "12pt Arial, sans serif")
 * @returns Object containing width and height of the text when rendered to the context
 * @see https://www.w3schools.com/tags/canvas_textbaseline.asp
 * @author niall mcguinness
 */
function GetTextDimensions(element, font) {
  let context = GetTextDimensions.context || (GetTextDimensions.context = document.createElement("canvas").getContext("2d"));
  context.font = font;
  let dimensions = context.measureText(element.innerHTML || element.innerText);
  return {
    width: Math.ceil(dimensions.width),
    height: Math.ceil(dimensions.actualBoundingBoxAscent - dimensions.actualBoundingBoxDescent)
  };
}