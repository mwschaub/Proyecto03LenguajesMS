const BLANK = 'B';
const ACCEPT = 'q_accept';
const REJECT = 'q_reject';

export const PROBLEMAS = {
    "a_b_star_abb": {
        description: "(a|b)*abb",
        rules: {
            q0: { 'a': { write: 'a', move: 'R', nextState: 'q1' }, 'b': { write: 'b', move: 'R', nextState: 'q0' }, [BLANK]: { move: 'S', nextState: REJECT } },
            q1: { 'a': { write: 'a', move: 'R', nextState: 'q1' }, 'b': { write: 'b', move: 'R', nextState: 'q2' }, [BLANK]: { move: 'S', nextState: REJECT } },
            q2: { 'a': { write: 'a', move: 'R', nextState: 'q1' }, 'b': { write: 'b', move: 'R', nextState: 'q3' }, [BLANK]: { move: 'S', nextState: REJECT } },
            q3: { 'a': { write: 'a', move: 'R', nextState: 'q3' }, 'b': { write: 'b', move: 'R', nextState: 'q3' }, [BLANK]: { move: 'S', nextState: ACCEPT } }
        },
        initialState: 'q0', acceptState: ACCEPT, rejectState: REJECT
    },
    "zero_star_one_star": {
        description: "0*1*",
        rules: {
            q0: { '0': { write: '0', move: 'R', nextState: 'q0' }, '1': { write: '1', move: 'R', nextState: 'q1' }, [BLANK]: { move: 'S', nextState: ACCEPT } },
            q1: { '0': { move: 'S', nextState: REJECT }, '1': { write: '1', move: 'R', nextState: 'q1' }, [BLANK]: { move: 'S', nextState: ACCEPT } }
        },
        initialState: 'q0', acceptState: ACCEPT, rejectState: REJECT
    },
    "a_b_star": {
        description: "(ab)*",
        rules: {
            q0: { 'a': { write: 'a', move: 'R', nextState: 'q1' }, 'b': { move: 'S', nextState: REJECT }, [BLANK]: { move: 'S', nextState: ACCEPT } },
            q1: { 'a': { move: 'S', nextState: REJECT }, 'b': { write: 'b', move: 'R', nextState: 'q0' }, [BLANK]: { move: 'S', nextState: REJECT } }
        },
        initialState: 'q0', acceptState: ACCEPT, rejectState: REJECT
    },
    "one_zero_one_star_zero": {
        description: "1(01)*0",
        rules: {
            q0: { '1': { write: '1', move: 'R', nextState: 'q1' }, '0': { move: 'S', nextState: REJECT }, [BLANK]: { move: 'S', nextState: REJECT } },
            q1: { '0': { write: '0', move: 'R', nextState: 'q2' }, [BLANK]: { move: 'S', nextState: REJECT } },
            q2: { '1': { write: '1', move: 'R', nextState: 'q1' }, [BLANK]: { move: 'S', nextState: ACCEPT }, '0': { move: 'S', nextState: REJECT } }
        },
        initialState: 'q0', acceptState: ACCEPT, rejectState: REJECT
    },
    "contains_a": {
        description: "(a+b)*a(a+b)* (Contiene al menos una 'a')",
        rules: {
            q0: { 'a': { write: 'a', move: 'R', nextState: 'q1' }, 'b': { write: 'b', move: 'R', nextState: 'q0' }, [BLANK]: { move: 'S', nextState: REJECT } },
            q1: { 'a': { write: 'a', move: 'R', nextState: 'q1' }, 'b': { write: 'b', move: 'R', nextState: 'q1' }, [BLANK]: { move: 'S', nextState: ACCEPT } }
        },
        initialState: 'q0', acceptState: ACCEPT, rejectState: REJECT
    }
};