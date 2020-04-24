/********************************************** Demos  **********************************************/

RunDemos();

function RunDemos() {
    let demoChoice = Number.parseInt(prompt("Enter demo number (1-5):", "1"));
    if (demoChoice == 1)
      Demo1();
    else if (demoChoice == 2)
      Demo2();
    else if (demoChoice == 3)
      Demo3();
    else if (demoChoice == 4)
      Demo4();
    else
      Demo5();
  
  }

function Demo1() {
  
}

function Demo2() {
  
}

function Demo3() {
  
}

function Demo4() {
  
}

function Demo5() {
  
}

/********************************************* Utility functions *********************************************/
function SetElementText(cssSelector, text) {
  let element = document.querySelector(cssSelector);
  element.innerText = text;
}
