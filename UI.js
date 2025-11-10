const ContenedorCinta = document.getElementById('ContenedorCinta');
const DisplayEstado = document.getElementById('DisplayEstado');
const DisplayResultado = document.getElementById('DisplayResultado');

const CELL_WIDTH = 56;
const VIEWPORT_PADDING = 3;

export function RenderizarUI(maquina) {
    const estado = maquina.ObtenerEstadoMaquina();
    RenderizarCinta(estado.cinta, estado.posCabezal, maquina.SimboloBlanco);
    CentrarCintaEnCabezal(estado.posCabezal);
    DisplayEstado.textContent = estado.estadoActual;
    if (estado.estaDetenida) MostrarResultado(estado.estadoActual === maquina.EstadoAceptacion);
    else OcultarResultado();
}

function RenderizarCinta(cinta, posCabezal, simboloBlanco) {
    ContenedorCinta.innerHTML = '';
    const keys = Object.keys(cinta).map(Number);
    let minIndex = keys.length > 0 ? Math.min(...keys) : 0;
    let maxIndex = keys.length > 0 ? Math.max(...keys) : 0;
    minIndex = Math.min(minIndex, posCabezal);
    maxIndex = Math.max(maxIndex, posCabezal);
    const renderMin = minIndex - VIEWPORT_PADDING;
    const renderMax = maxIndex + VIEWPORT_PADDING;

    for (let i = renderMin; i <= renderMax; i++) {
        const cell = document.createElement('div');
        cell.className = 'tape-cell';
        const span = document.createElement('span');
        span.textContent = cinta[i] || simboloBlanco;
        cell.appendChild(span);
        cell.dataset.index = i;
        if (i === posCabezal) cell.classList.add('head-active');
        ContenedorCinta.appendChild(cell);
    }
}

function CentrarCintaEnCabezal(posCabezal) {
    const activeCell = ContenedorCinta.querySelector(`[data-index="${posCabezal}"]`);
    if (!activeCell) return;
    const viewportCenter = ContenedorCinta.parentElement.offsetWidth / 2;
    const cellOffset = activeCell.offsetLeft + (CELL_WIDTH / 2);
    const translation = viewportCenter - cellOffset;
    ContenedorCinta.style.transform = `translateX(${translation}px)`;
}

export function MostrarResultado(aceptada) {
    DisplayResultado.classList.remove('hidden');
    DisplayResultado.style.color = aceptada ? 'var(--verde-claro)' : 'tomato';
    DisplayResultado.textContent = aceptada ? 'ACEPTADA' : 'RECHAZADA';
}

export function OcultarResultado() {
    DisplayResultado.classList.add('hidden');
}
