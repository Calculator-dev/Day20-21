const keys = document.querySelectorAll(".keys");
const textArea = document.querySelector("#textarea");
const okBtn = document.querySelector("#submit");
let output = [];
const specialKeys = ["capslock", "space", "backspace", "enter", "shift"];
let capsLock = false;
let rowCounter = 0;
let shiftPressed = false;

keys.forEach(key => {
    key.addEventListener("click", e => {
        if (specialKeys.indexOf(e.target.value) != -1) {
            if (e.target.value == "capslock" && capsLock == false) {
                capsLock = true;
            } else if (capsLock == true) {
                capsLock = false;
            } else if (e.target.value === "space") {
                output.push(" ");
                textArea.innerText += output.join("");
            } else if (e.target.value == "backspace") {
                if (rowCounter >= textArea.cols + 1) {
                    let i = output.length - 1;
                    while (output[i] == " ") {
                        output.pop();
                        i--;
                    }
                    textArea.innerText += output.join("");
                }
                output.pop();
                textArea.selectionStart = output.length;
                textArea.innerText += output.join("");
            } else if (e.target.value == "enter") {
                rowCounter += textArea.cols + 65;
                for (let i = output.length; i < rowCounter; i++) {
                    output.push(" ");
                }
                textArea.selectionStart = rowCounter;
            } else if (e.target.value == "shift") {
                capsLock = true;
                shiftPressed = true;
            }
        }

        if (e.target.value != "shift" && capsLock === true && shiftPressed) {
            output.push(e.target.value.toUpperCase());
            textArea.innerText += output.join("");
            capsLock = false;
            shiftPressed = false;
        } else if (e.target.value != "shift" && capsLock === true && e.target.value != "capslock") {
            output.push(e.target.value.toUpperCase());
            textArea.innerText += output.join("");
        } else if (specialKeys.indexOf(e.target.value) == -1 && capsLock == false) {
            output.push(e.target.value);
            textArea.innerText += output.join("");
        }
    })
});

okBtn.addEventListener("click", () => window.alert(output.join("")));