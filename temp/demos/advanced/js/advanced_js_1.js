/********************************************** Demos  **********************************************/
RunDemos();

function RunDemos() {
  let demoChoice = Number.parseInt(prompt("Enter demo number (1-14):", "1"));
  switch (demoChoice) {
    case 1:
      SetElementText("#sub-title", "Timers as asynchronous threads");
      Demo1();
      break;
    case 2:
      SetElementText("#sub-title", "Passing arguments");
      Demo2();
      break;
    case 3:
      SetElementText("#sub-title", "Calling a timer handler using an arrow function");
      Demo3();
      break;
    case 4:
      SetElementText("#sub-title", "Calling a timer handler using an anonymous function");
      Demo4();
      break;
    case 5:
      SetElementText("#sub-title", "Passing more complex arguments (e.g. an object)");
      Demo5();
      break;
    case 6:
      SetElementText("#sub-title", "Using a repeating timer with setInterval");
      Demo6();
      break;
    case 7:
      SetElementText("#sub-title", "Add a callback to a function");
      Demo7();
      break;
    case 8:
      SetElementText("#sub-title", "Handling success/failure with a promise");
      Demo8();
      break;
    case 9:
      SetElementText("#sub-title", "Catching resolve, reject and adding finally to a promise");
      Demo9();
      break;
    case 10:
      SetElementText("#sub-title", "Returning a promise from a function, catches the resolve callback ");
      Demo10();
      break;
    case 11:
      SetElementText("#sub-title", "Calls a chain of promises which executes a sequence of operations (i.e. console.log()) in a definite sequence A->B->C");
      Demo11();
      break;
    case 12:
      SetElementText("#sub-title", "Shows a message in a container parent element for a period of time in ms and then calls a callback function");
      Demo12();
      break;
    case 13:
      SetElementText("#sub-title", "Aadds an array of elements to a parent element for a period of time in ms and then calls a callback function");
      Demo13();
      break;
    default:
      SetElementText("#sub-title", "Attaching callbacks to common window events (onload) - code is outside a function to execute when JS file is loaded");
      Demo14();
  }

}

//timers as asynchronous threads
function Demo1() {
  //once only
  setTimeout(demoHandlerSimple, 2000); //asynchronous - non-blocking - separate thread
  console.log("demo1 all done!");
}

//passing arguments
function Demo2() {
  setTimeout(demoHandlerWithParameters, 3000, "alex", true, 21); //asynchronous - non-blocking - separate thread
  console.log("demo2 all done!");
}

//calling a timer handler using an arrow function
function Demo3() {
  //passing arguments into an arrow function
  setTimeout((str, flag, age) => {
    console.log("demo 1c handler..." + str + "," + flag + "," + age);
  }, 3000, "alex", true, 21);

  console.log("demo3 all done!");
}

//calling a timer handler using an anonymous function
function Demo4() {
  //passing arguments into an anonymous function
  setTimeout(function (str, flag, age) {
    console.log("demo 1d handler..." + str + "," + flag + "," + age);
  }, 3000, "alex", true, 21);

  console.log("demo4 all done!");
}
//passing more complex arguments (e.g. an object)
function Demo5() {
  //passing object as an argument into anonymous function
  setTimeout(function (obj) {
    console.log("demo 1e handler..." + obj.name);
  }, 3000, {
    name: "jack",
    age: 21
  });

  console.log("demo5 all done!");
}

//using a repeating timer with setInterval
function Demo6() {
  let count = 1;
  //repeat using setInterval
  let intTimer = setInterval((msg) => {
    console.log(count + ":" + msg);
    count++;
  }, 1000, "hello, I repeat!");

  //time passes or something happens and the interval is cleared
  setTimeout(() => {
    clearInterval(intTimer);
    console.log("i stopped the timer!");
  }, 5000);

  console.log("demo6 all done!");
}

function demoHandlerSimple() {
  console.log("simple demo handler...");
}

function demoHandlerWithParameters(str, flag, age) {
  console.log("demo 1b handler..." + str + "," + flag + "," + age);
}


//add a callback to a function
function Demo7() {
  loadResource(35, false, "a", loadNotifyHandler);

  console.log("demo7 all done!");
}

function loadResource(num, flag, str, callbackFn) {

  setTimeout((a, b, c) => {
    console.log("loadResource: working with " + a + "," + b + "," + c);
    callbackFn({
      id: 1234,
      x: 15,
      y: 60
    });
  }, 4000, num, flag, str);
}

function loadNotifyHandler(obj) {
  console.log("loadNotifyHandler:" + obj.id);
}

//handling success/failure with a promise
function Demo8() {
  let promise = new Promise(function (resolve, reject) {
    //any code that does any operation lasting a period of time
    setTimeout(() => {
      console.log("work complete...");
      resolve("msg");
    }, 4000);
  });

  //handling the resolve (success) state
  promise.then((msg) => {
    console.log("resolve handler 1:" + msg);
  });

  //register another handler
  promise.then(anotherHandler);

  //register yet another handler if we want to
  promise.then(function (msg) {
    console.log("resolve handler 3:" + msg);
  });

  console.log("demo8 all done!");
}

function anotherHandler(msg) {
  console.log("resolve handler 2:" + msg);
}

//catching resolve, reject and adding finally to a promise
function Demo9() {
  let promise = new Promise(function (resolve, reject) {

    let x = Math.random() * 10;
    console.log("shows text and x is " + x);
    if (x <= 4)
      resolve(x);
    else
      reject("value was " + x + " so a reject was called!");
  });

  //register for resolve and reject notification
  promise.then(result => {
      console.log("resolve returned: " + result);
    },
    error => {
      console.log("reject returned: " + error);
    });

  //add finally to always execute even if the reject is called
  promise.finally(function () {
    console.log("code in a finally block (just like in try...catch..finally in Java is always done!");
  });

  console.log("demo9 all done!");
}

//returning a promise from a function, catches the resolve callback 
function Demo10() {

  let p = doSomething("show the score!");

  p.then(() => {
    console.log("promise resolved!");
  });

  console.log("demo10 all done!");
}

//executes work (i.e. the log message) and calls a resolve callback once the Promise completes
function doSomething(msg) {
  return new Promise(function (resolve, reject) {
    console.log(msg);
    resolve();
  });
}

//calls a chain of promises which executes a sequence of operations (i.e. console.log()) in a definite sequence A->B->C
function Demo11() {
  //chaining promises
  doSomething("hello!").then(() => {
    doSomething("how are you?").then(() => {
      doSomething("im fine!");
    });
  });

  console.log("demo11 all done!");
}


//shows a message in a container parent element for a period of time in ms and then calls a callback function
function Demo12() {
  showMessageForMs("Hello", 4000, messageCompleteCallback);
}

//adds an array of elements to a parent element for a period of time in ms and then calls a callback function
function Demo13() {
  let container = document.querySelector(".canvas-container");
  let div_img = document.createElement("img");
  let div_msg = document.createElement("div");
  div_msg.innerHTML = "<b>Another element</b>";
  div_img.src = "../../../temp/assets/images/demos/ui/star.png"; //url('')
  div_img.setAttribute("style", "width:50px; height:50px;");
  showElementsForMs(container, [div_img, div_msg], 15000, messageCompleteCallback);
}

/*
//convert this code to use a setTimeout to fix the "single-thread" blocking problem
function showMessageForMs(msg, timeMs, callbackFn){
  
  //add the HTML element to the DOM
  let container = document.querySelector(".canvas-container");
  let div_msg = document.createElement("div");
  div_msg.innerHTML = "<b>" + msg + "</b>";
  container.appendChild(div_msg);

  //start a TERRIBLE synchronous (blocking) process to remove after timeMs and call callback - NO!!!!!!!!!
  let count = 0;
  while(count <= timeMs * 1000)
  {
    count++;
  }

  container.removeChild(div_msg);
  callbackFn();
}
*/

//shows a message in a container parent element for a period of time in ms and then calls a callback function
function showMessageForMs(msg, timeMs, callbackFn) {

  //add the HTML element to the DOM
  let container = document.querySelector(".canvas-container");
  let div_msg = document.createElement("div");
  div_msg.innerHTML = "<b>" + msg + "</b>";
  // div_msg.setAttribute("style", "position: absolute; top: 50%; left: 50%; color: red;");
  div_msg.setAttribute("class", "info-msg");
  container.appendChild(div_msg);

  //remove the element when elapsed and invoke the callback function
  setTimeout(() => {
    container.removeChild(div_msg);
    callbackFn("removed element...");
  }, timeMs);
}

//adds an array of elements to a parent element for a period of time in ms and then calls a callback function
function showElementsForMs(parentElement, newElementArray, timeMs, callbackFn) {

  //add the HTML element to the DOM
  for (let element of newElementArray) //for(of) iterate through the values, for(in) iterates through keys
    parentElement.appendChild(element);

  //remove the element when elapsed and invoke the callback function
  setTimeout(() => {
    for (let element of newElementArray)
      parentElement.removeChild(element);
    callbackFn("removed element...");
  }, timeMs);
}

//call this when showMessageForMs returns
function messageCompleteCallback(msg) {
  console.log(msg);
}

//attaching callbacks to common window events (onload) - code is outside a function to execute when JS file is loaded
function Demo14() {
  //to do...
}



/********************************************* Exercises *********************************************/

//write the code to add the text "Game Over!" to the center of the screen and remove the text after 4000ms
function exercise1() {

}

//write the code to add the text "Game Over!" to the center of the screen and remove the text after 4000ms and repeat until a flag == false
function exercise2() {

}

/********************************************* Utility functions *********************************************/
function SetElementText(cssSelector, text) {
  let element = document.querySelector(cssSelector);
  element.innerText = text;
}