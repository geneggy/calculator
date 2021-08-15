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
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.previousOperand === undefined) this.clear();
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
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
  { text: "AC", dataType: "data-all-clear", class: "span-two" },
  { text: "DEL", dataType: "data-delete" },
  { text: "÷", dataType: "data-operation" },
  { text: "7", dataType: "data-number" },
  { text: "8", dataType: "data-number" },
  { text: "9", dataType: "data-number" },
  { text: "*", dataType: "data-operation" },
  { text: "4", dataType: "data-number" },
  { text: "5", dataType: "data-number" },
  { text: "6", dataType: "data-number" },
  { text: "+", dataType: "data-operation" },
  { text: "1", dataType: "data-number" },
  { text: "2", dataType: "data-number" },
  { text: "3", dataType: "data-number" },
  { text: "-", dataType: "data-operation" },
  { text: ".", dataType: "data-number" },
  { text: "0", dataType: "data-number" },
  { text: "=", dataType: "data-equals", class: "span-two" },
];

calculatorBtns.forEach((btn) => {
  let btnEl = document.createElement("button");
  btnEl.textContent = btn.text;
  btnEl.setAttribute(btn.dataType, "");
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

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
