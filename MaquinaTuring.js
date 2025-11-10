export class MaquinaTuring {
    constructor(reglas, EstadoInicial, EstadoAceptacion, EstadoRechazo, SimboloBlanco = 'B') {
        this.Reglas = reglas;
        this.EstadoInicial = EstadoInicial;
        this.EstadoAceptacion = EstadoAceptacion;
        this.EstadoRechazo = EstadoRechazo;
        this.SimboloBlanco = SimboloBlanco;
        this.Reset();
    }

    Reset() {
        this.Cinta = {};
        this.PosCabezal = 0;
        this.EstadoActual = this.EstadoInicial;
        this.EstaDetenida = false;
    }

    CargarCinta(entrada) {
        this.Reset();
        const chars = Array.from(entrada);
        for (let i = 0; i < chars.length; i++) this.Cinta[i] = chars[i];
    }

    ObtenerSimboloActual() {
        return this.Cinta[this.PosCabezal] || this.SimboloBlanco;
    }

    Paso() {
        if (this.EstaDetenida) return;
        const simbolo = this.ObtenerSimboloActual();
        const trans = this.Reglas[this.EstadoActual]?.[simbolo];
        if (!trans) {
            this.EstaDetenida = true;
            this.EstadoActual = this.EstadoRechazo;
            return;
        }
        if (trans.write) this.Cinta[this.PosCabezal] = trans.write;
        if (trans.move === 'R') this.PosCabezal++;
        else if (trans.move === 'L') this.PosCabezal--;
        this.EstadoActual = trans.nextState;
        if (this.EstadoActual === this.EstadoAceptacion || this.EstadoActual === this.EstadoRechazo)
            this.EstaDetenida = true;
    }

    ObtenerEstadoMaquina() {
        return {
            cinta: this.Cinta,
            posCabezal: this.PosCabezal,
            estadoActual: this.EstadoActual,
            estaDetenida: this.EstaDetenida
        };
    }
}