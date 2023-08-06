export class Util {

  static formatearFecha(d: Date) {
    const dia = d.getDate().toString().padStart(2, '0'); // Agrega un cero si el día es menor a 10
    const mes = (d.getMonth() + 1).toString().padStart(2, '0'); // El mes es 0-indexed, por lo que se suma 1
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }


}
