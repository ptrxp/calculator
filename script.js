const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "=" && output !== "") {
    if (output.includes("%")) {
      // If output contains '%', replace it with '/100' before evaluating.
      output = output.replace("%", "/100");
    }
    try {
      output = eval(output);
      if (!isFinite(output)) {
        output = "Error: Division by zero";
      }
    } catch (error) {
      output = "Error: Invalid expression";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.slice(0, -1);
  } else {
    if (output === "" && specialChars.includes(btnValue)) {
      return;
    }
    output += btnValue;
  }
  display.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculate(e.target.dataset.value);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || specialChars.includes(key) || key === "Enter") {
    calculate(key);
  } else if (key === "Backspace") {
    output = output.slice(0, -1);
    display.value = output;
  }
});
