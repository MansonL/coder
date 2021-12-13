const input = process.argv.slice(2);
const notNumbers = input.filter(number => isNaN(Number(number)));
if(input.length === 0){
    console.log({
        error: {
            description: "Empty input"
        }
    })
    process.exit(-4)
}else if(notNumbers.length > 0){
    const types : string[] = input.map(number => {
        if(isNaN(Number(number))) return typeof number
        return typeof Number(number)
    });
    console.log({
        error: {
            description: "Input type error.",
            input: input,
            types: types,
        }
    });
    process.exit(-5)
}else{
    const numbers = input.map(string => Number(string));
    const max = numbers.reduce((previous, current) => previous > current ? previous : current
    );
    const min = numbers.reduce((previous, current) => previous < current ? previous : current);
    const average = numbers.reduce((previous, current) => previous + current) / numbers.length;
    console.log({
        data : {
            input: input,
            average: average,
            max: max,
            min: min,
            executable: process.execPath,
            pid: process.pid
        }
    })
}
