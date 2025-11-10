import { MaquinaTuring } from './MaquinaTuring.js';
import { PROBLEMAS } from './Problemas.js';
import { RenderizarUI, OcultarResultado } from './UI.js';

let Maquina = null;
let IntervaloSim = null;

const SelectProblema = document.getElementById('SelectProblema');
const InputCinta = document.getElementById('InputCinta');
const BtnCargar = document.getElementById('BtnCargar');
const BtnPaso = document.getElementById('BtnPaso');
const BtnCorrer = document.getElementById('BtnCorrer');
const SliderVelocidad = document.getElementById('SliderVelocidad');

function LlenarSelect() {
    for (const key in PROBLEMAS) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = PROBLEMAS[key].description;
        SelectProblema.appendChild(opt);
    }
}

function CargarMaquina() {
    PararSimulacion();
    const id = SelectProblema.value;
    const problema = PROBLEMAS[id];
    if (!problema) return;
    const entrada = InputCinta.value || '';
    Maquina = new MaquinaTuring(problema.rules, problema.initialState, problema.acceptState, problema.rejectState, 'B');
    Maquina.CargarCinta(entrada);
    RenderizarUI(Maquina);
    BtnPaso.disabled = false;
    BtnCorrer.disabled = false;
}

function EjecutarPaso() {
    if (Maquina && !Maquina.EstaDetenida) {
        Maquina.Paso();
        RenderizarUI(Maquina);
    }
    if (Maquina && Maquina.EstaDetenida) PararSimulacion();
}

function CorrerSimulacion() {
    PararSimulacion();
    const vel = parseInt(SliderVelocidad.value);
    IntervaloSim = setInterval(() => EjecutarPaso(), vel);
}

function PararSimulacion() {
    if (IntervaloSim) {
        clearInterval(IntervaloSim);
        IntervaloSim = null;
    }
}

BtnCargar.addEventListener('click', () => {
    OcultarResultado();
    CargarMaquina();
});

BtnPaso.addEventListener('click', EjecutarPaso);
BtnCorrer.addEventListener('click', CorrerSimulacion);

LlenarSelect();
