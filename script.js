class Calculator {
  constructor(previousTextEl, currentTextEl) {
    this.previousTextEl = previousTextEl;
    this.currentTextEl = currentTextEl;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    if (this.previousOperand === undefined) return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.previousOperand === undefined) this.clear();
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.operation) {
      this.operation = operation;
    }

    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentTextEl.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation != null) {
      this.previousTextEl.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousTextEl.innerText = "";
    }
  }
}

const calculatorGridEl = document.querySelector(".calculator-grid");
const calculatorBtns = [
  { text: "AC", dataType: "data-all-clear", class: "span-two", dataKey: "27" },
  { text: "DEL", dataType: "data-delete", dataKey: "8" },
  { text: "÷", dataType: "data-operation", dataKey: "191" },
  { text: "7", dataType: "data-number", dataKey: "55" },
  { text: "8", dataType: "data-number", dataKey: "56" },
  { text: "9", dataType: "data-number", dataKey: "57" },
  { text: "*", dataType: "data-operation", dataKey: "56" },
  { text: "4", dataType: "data-number", dataKey: "52" },
  { text: "5", dataType: "data-number", dataKey: "53" },
  { text: "6", dataType: "data-number", dataKey: "54" },
  { text: "+", dataType: "data-operation", dataKey: "187" },
  { text: "1", dataType: "data-number", dataKey: "49" },
  { text: "2", dataType: "data-number", dataKey: "50" },
  { text: "3", dataType: "data-number", dataKey: "51" },
  { text: "-", dataType: "data-operation", dataKey: "189" },
  { text: ".", dataType: "data-number", dataKey: "190" },
  { text: "0", dataType: "data-number", dataKey: "48" },
  { text: "=", dataType: "data-equals", class: "span-two", dataKey: "187" },
];

calculatorBtns.forEach((btn) => {
  let btnEl = document.createElement("button");
  btnEl.textContent = btn.text;
  btnEl.setAttribute(btn.dataType, "");
  btnEl.setAttribute("data-key", btn.dataKey);
  if (btn.class) btnEl.classList.add(btn.class);
  calculatorGridEl.appendChild(btnEl);
});

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousTextEl = document.querySelector("[data-previous]");
const currentTextEl = document.querySelector("[data-current]");
const calculator = new Calculator(previousTextEl, currentTextEl);

const append = function (button) {
  calculator.appendNumber(button.innerText);
  calculator.updateDisplay();
};

const operation = function (button) {
  calculator.chooseOperation(button.innerText);
  calculator.updateDisplay();
};

const del = () => {
  calculator.delete();
  calculator.updateDisplay();
};

const compute = () => {
  calculator.compute();
  calculator.updateDisplay();
};

const clear = () => {
  calculator.clear();
  calculator.updateDisplay();
};

function keyPress(e) {
  const button = document.querySelector(`button[data-key="${e.keyCode}"]`);
  if (!button) return;
  if (button.hasAttribute("data-number")) {
    append(button);
  }
  if (button.hasAttribute("data-operation")) {
    operation(button);
  }
  if (button.hasAttribute("data-delete")) {
    del();
  }
  if (button.hasAttribute("data-equals")) {
    compute();
  }
  if (button.hasAttribute("data-all-clear")) {
    clear();
  }
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    append(button);
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    operation(button);
  });
});

equalsBtn.addEventListener("click", () => {
  compute();
});

allClearBtn.addEventListener("click", () => {
  clear();
});

deleteBtn.addEventListener("click", () => {
  del();
});

window.addEventListener("keydown", keyPress);
