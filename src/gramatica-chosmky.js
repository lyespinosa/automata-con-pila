class ValidateFNC {
    constructor() {
        this.stack = ['$'];
        this.states = []
    }

    add(symbols) {
        for (let i = symbols.length - 1; i >= 0; i--) {
            this.stack.push(symbols[i]);
        }
    }

    remove() {
        return this.stack.pop();
    }

    topOfStack() {
        return this.stack[this.stack.length - 1];
    }

    isTerminal(symbol) {
        return symbol === symbol.toLowerCase();
    }

    validate(input) {

        this.add(['S']);
        let pointer = 0;

        while (true) {
            console.log(this.stack);
            this.states.push([...this.stack]);
            const stackTop = this.topOfStack();
            const inputSymbol = input[pointer];

            if (stackTop === '$' && inputSymbol === undefined) {
                return {isValid: true, stack: this.states};
            }

            if (stackTop.length > 1 && this.isTerminal(stackTop)) {
                for (let i = 0; i < stackTop.length - 1; i++) {
                    if (stackTop[i] === input[pointer]) {
                    } else {
                        break;
                    }
                    this.remove();
                    pointer += stackTop.length;
                }
            } else if (stackTop === inputSymbol) {
                this.remove();
                pointer++;
            } else {
                const production = this.getProduction(stackTop, inputSymbol);
                if (production) {
                    this.remove();
                    this.add(production);
                } else {
                    return {isValid: false, stack: this.states};
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
                    'c': () => ['H', 'P4'],
                    'p': () => ['Q1', 'W'],
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
            'P4': () => ['P1', 'P8'],
            'P5': () => ['O', 'P9'],
            'P6': () => ['P2', 'T2'],
            'P7': () => ['P2', 'B'],
            'P8': () => ['N', 'P5'],
            'P9': () => ['X', 'P6'],
            'W': () => ['P1', 'P7'],
            'I': () => /[a-z]/.test(terminal) ? [terminal] : null,
            'M': () => /[A-Z]/.test(terminal) ? [terminal] : null,
            'Z': () => /[0-9]/.test(terminal) ? [terminal] : null,
            'V1': () => ['int '],
            'V2': () => ['string '],
            'C1': () => ['"'],
            'E': () => ['= '],
            'T40': () => ['task '],
            'P1': () => ['( '],
            'P2': () => [')'],
            'B1': () => ['{ '],
            'B2': () => [' }'],
            'C24': () => ['contenido'],
            'V': () => terminal === 'i' ? ['int '] : ['string '],
            'R34': () => ['repetir '],
            'R2': () => ['in range '],
            'D': () => ['.'],
            'H': () => ['condition '],
            'T1': () => [' then '],
            'O': () => ['== ' ],
            'Q1': () => ['principal task '],
        }
        return ruleMappings[nonTerminal] ? ruleMappings[nonTerminal]() : null;
    }


}

export default function validateAutomaton(inputString){
    const automaton = new ValidateFNC();
    const result = automaton.validate(inputString);
    return result;
}
/*
let inputString1 = 'int iGI = 000 ';
let inputString = 'string hola = "vamos "';
let inputString2 = 'task eyyy ( int i ){ contenido }';
let inputString3 = 'repetir i in range 0...9{ contenido }';
let inputString4 = 'principal task ( ){ contenido }';
let inputString5 = 'condition (edad == 18 ) then { contenido }';
*/


