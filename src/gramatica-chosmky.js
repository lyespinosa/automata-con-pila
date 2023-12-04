class ValidateFNC {
    constructor() {
        this.stack = ['$'];
    }

    pushToStack(symbols) {
        for (let i = symbols.length - 1; i >= 0; i--) {
            this.stack.push(symbols[i]);
        }
    }

    popFromStack() {
        return this.stack.pop();
    }

    topOfStack() {
        return this.stack[this.stack.length - 1];
    }

    isTerminal(symbol) {
        return symbol === symbol.toLowerCase();
    }

    validate(input) {

        this.pushToStack(['S']);
        let pointer = 0;

        while (true) {
            console.log(this.stack);
            const stackTop = this.topOfStack();
            const inputSymbol = input[pointer];

            if (stackTop === '$' && inputSymbol === undefined) {
                console.log('Cadena aceptada');
                break;
            }

            if (stackTop.length > 1 && this.isTerminal(stackTop)) {
                for (let i = 0; i < stackTop.length - 1; i++) {
                    if (stackTop[i] === input[pointer]) {
                    } else {
                        break;
                    }
                    this.popFromStack();
                    pointer += stackTop.length;
                }
            } else if (stackTop === inputSymbol) {
                this.popFromStack();
                pointer++;
            } else {
                const production = this.getProduction(stackTop, inputSymbol);
                if (production) {
                    this.popFromStack();
                    this.pushToStack(production);
                } else {
                    console.log('Error');
                    break;
                }
            }
        }
    }

    //ANTES DE EMPEZAR A PONER MI GRAMATICA

    getProduction(nonTerminal, terminal) {
        const ruleMappings = {
            'S': () => {
                const mappings = {
                    'i': () => ['V1', 'K'],
                    's': () => ['V2', 'L1'],
                    't': () => ['T40', 'L2'],
                    'r': () => ['R34', 'L3'],
                    'h': () => ['H', 'P4'],
                    'P': () => ['Q1', 'W'],
                };
                return mappings[terminal] ? mappings[terminal]() : null;
            },
            'L1': () => ['N', 'E2'],
            'K': () => ['N', 'E1'],
            'L2': () => ['N', 'P'],
            'J': () => {
                if (/[a-z]/.test(terminal)) {
                    return ['I', 'J'];
                } else if (/[A-Z]/.test(terminal)) {
                    return ['M', 'J'];
                }
                else {
                    return ' '
                }
            },
            'N': () => ['I', 'J'],
            'E1': () => ['E', 'X'],
            'E2': () => ['E', 'G'],
            'G': () => ['C1', 'G2'],
            'G2': () => ['N', 'C1'],
            'X': () => /[0-9]/.test(terminal) ? ['Z', 'X'] :  ' ',
            'L3': () => ['N', 'R3'],
            'R3': () => ['R2', 'Z1'],
            'Z1': () => ['Z', 'D1'],
            'D1': () => ['D', 'D2'],
            'D2': () => ['D', 'D3'],
            'D3': () => ['D', 'Z2'],
            'Z2': () => ['Z', 'B'],
            'B': () => ['B1', 'U'],
            'U': () => ['C24', 'B2'],
            'P': () => ['P1', 'Q'],
            'Q': () => ['V', 'R'],
            'R': () => ['N', 'F'],
            'F': () => ['P2', 'B'],
            'T2': () => ['T1', 'B'],
            'P4': () => ['P1', 'P5'],
            'P5': () => ['O', 'P6'],
            'P6': () => ['P2', 'T2'],
            'I': () => /[a-z]/.test(terminal) ? [terminal] : null,
            'M': () => /[A-Z]/.test(terminal) ? [terminal] : null,
            'Z': () => /[0-9]/.test(terminal) ? [terminal] : null,
            'V1': () => ['int '],
            'V2': () => ['string '],
            'C1': () => ['"'],
            'E': () => ['= '],
            'T40': () => ['task '],
            'P1': () => ['('],
            'P2': () => [')'],
            'B1': () => ['{ '],
            'B2': () => [' }'],
            'C24': () => ['contenido'],
            'V': () => terminal === 'i' ? ['int '] : ['string '],
            'R34': () => ['repetir '],
            'R2': () => ['in range '],
            'D': () => ['.'],
            'H': () => [' CIf '],
            'T1': () => [' then '],
            'O': () => [' == '],
            'Q1': () => ['Principal Task'],
        }
        return ruleMappings[nonTerminal] ? ruleMappings[nonTerminal]() : null;
    }


}

const automaton = new ValidateFNC();
let inputString1 = 'int iGI = 000 ';
let inputString = 'string hola = "vamos "';
let inputString2 = 'task eyyy (int i ){ contenido }';
let inputString3 = 'repetir i in range 0...9{ contenido }';




automaton.validate(inputString2);