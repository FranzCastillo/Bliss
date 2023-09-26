import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  vus: 50,           // Número de usuarios virtuales simultáneos
  duration: '2m',    // Duración total de la prueba
}

export default function () {
  // Simula la actividad de compra
  for (let i = 0; i < 5; i++) { // Realiza 5 compras por usuario
    // Realiza una compra simulada
    http.post('https://bliss-three.vercel.app/product/1', {
      producto: 'zapato de charol',
      cantidad: 1,
    })

    // Pausa breve para simular el tiempo entre compras
    sleep(2) // 2 segundos de pausa entre compras
  }
}
