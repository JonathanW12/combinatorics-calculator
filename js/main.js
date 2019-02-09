const tuple1Box = document.getElementById("tuple-1");
const tupleType = document.getElementById("tuple-type");
const outputBox = document.getElementById("output-box");
const uniqueBox = document.getElementById("unique-box");
let steps = document.getElementsByClassName("step");

const keywords = {"AND":"&&", "OR":"||", "NOT":"!"};


const unique = list => list.slice().sort((a, b) => a > b)
.reduce((accumulator, currentValue) => {
  if (!arrayEquals(currentValue, accumulator.slice(-1)[0])) accumulator.push(currentValue);
  return accumulator;
}, []);
const arrayEquals = (a1, a2 = []) => a1.length == a2.length && a1.every((element, i) => element == a2[i]);

const check = () => {
  let tuple1 = tuple1Box.value.replace(/\s/g, "").split(",");
  let length = tuple1.length;
  let x = [...G.clone[tupleType.value](tuple1)];

  let y = [];

  Array.from(steps).forEach((step) => {
    let command1 = step.getElementsByClassName("command-box")[0].value
    .replace(/AND|OR|NOT/g, input => keywords[input])
    .replace(/[^-+*/()\d\&|!=><(?:Xn,)]/g, "")
    .replace(/=/g, "==");

    x.forEach((xN) => {
      let command2 = command1.replace(/Xn,\d+/g, input => (xN[input.match(/\d+/)[0]-1]));
      if (!eval(command2)) {
        y.push(xN);
      }
    });

    x = y;
    y = [];
  });

  if (uniqueBox.checked) x = unique(x);

  outputBox.readonly = false;
  outputBox.value = x.join("\n");
  outputBox.readonly = true;
};

const add = (element) => {
  let clone = element.parentElement.cloneNode(true);
  element.parentElement.parentElement.appendChild(clone);
  Array.from(document.getElementsByClassName("minus")).forEach((toShow) => {toShow.hidden = false;});
};

const minus = (element) => {
  steps = document.getElementsByClassName("step");
  if (steps.length > 1) {
    element.parentElement.remove();
    if (steps.length == 1) {
      document.getElementsByClassName("minus")[0].hidden = true;
    }
  }
};
