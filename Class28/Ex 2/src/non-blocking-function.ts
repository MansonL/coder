const nonBlockingFunction = () => {
    let addition = 0;
    for (let i = 0; i < 5e9; i++) {
        addition+=i;
    }
  return addition
}

const result = nonBlockingFunction();

process.emit("exit", result)