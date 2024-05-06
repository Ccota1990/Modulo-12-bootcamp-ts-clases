import "./style.css";

//DATOS
interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

const reservas: Reserva []= [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

//CASO 1 
class CasoUno {
  reservas: Reserva[];
  iva: number;
  
  constructor (reservas: Reserva []){
    this.reservas = reservas;
    this.iva = 0.21;
  }
  calcularPrecio (){
    return this.reservas.map((reserva) => {
      const subtotal= (reserva.tipoHabitacion === "standard" ? 100 : 150) * reserva.noches + (reserva.pax >1 ?  40 * reserva.noches : 0);
      const precioConIva = subtotal * (1 + this.iva);
      return {
        subtotal : subtotal,
        totalSinIVA: subtotal,
        totalConIVA: precioConIva,
      };
    })
  } 
}

const caso = new CasoUno(reservas);
console.log(caso.calcularPrecio());

//CASO 2
class CasoDos extends CasoUno {

  constructor(reservas: Reserva[]){
    super(reservas);
  }
  calcularPrecioTouOperador () {
    return this.reservas.map((reserva) => {
      const subtotal = 100 * reserva.noches;
      const descuento = subtotal * 0.15;
      const subtotalConDescuento = subtotal - descuento;
      const precioConIVA = subtotalConDescuento * (1 + this.iva);
      return {
        subtotal: subtotalConDescuento,
        totalSinIVA: subtotalConDescuento,
        totalConIVA: precioConIVA
  };
  });
}
}

const casoTourOperador = new CasoDos (reservas);
console.log(casoTourOperador.calcularPrecioTouOperador());

//DESAFIO
const preciosHabitaciones = { standard: 100, suite: 150 };
class CasoBase {
  reservas: Reserva[];
  precios: { standard: number, suite: number };
  iva: number;
  
  constructor(reservas: Reserva[], precios: { standard: number, suite: number }) {
    this.reservas = reservas;
    this.precios = precios;
    this.iva = 0.21; 
  }
}

class CasoClienteParticular extends CasoBase {
  constructor(reservas: Reserva[], precios: { standard: number, suite: number }) {
    super(reservas, precios);
  }
  
  calcularPrecio() {
    return this.reservas.map((reserva) => {
      const subtotal = (reserva.tipoHabitacion === "standard" ? this.precios.standard : this.precios.suite) * reserva.noches + (reserva.pax > 1 ? 40 * reserva.noches : 0);
      const precioConIVA = subtotal * (1 + this.iva);
      return {
        subtotal: subtotal,
        totalSinIVA: subtotal,
        totalConIVA: precioConIVA
      };
    });
  }
}

class CasoTourOperadorDesafio extends CasoBase {
  constructor(reservas: Reserva[], precios: { standard: number, suite: number }) {
    super(reservas, precios);
  }
  
  calcularPrecioTourOperador() {
    return this.reservas.map((reserva) => {
      const subtotal = this.precios.standard * reserva.noches; 
      const descuento = subtotal * 0.15; 
      const subtotalConDescuento = subtotal - descuento;
      const precioConIVA = subtotalConDescuento * (1 + this.iva);
      return {
        subtotal: subtotalConDescuento,
        totalSinIVA: subtotalConDescuento,
        totalConIVA: precioConIVA
      };
    });
  }
}

const casoClienteParticular = new CasoClienteParticular(reservas, preciosHabitaciones);
console.log(casoClienteParticular.calcularPrecio());

const CasoTourOperador1 = new CasoTourOperadorDesafio(reservas, preciosHabitaciones);
console.log(CasoTourOperador1.calcularPrecioTourOperador());