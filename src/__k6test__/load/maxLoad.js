import http from 'k6/http'
import { sleep, check } from 'k6'

export let options = {
  vus: 100, // Número de usuarios virtuales
  duration: '1m', // Duración de la prueba (1 minuto)
};

export default function () {
  // Genera una solicitud GET a tu proyecto Vite
  const response = http.get('https://bliss-three.vercel.app')

  // Verifica si la solicitud fue exitosa (código de respuesta 200)
  check(response, {
    'Respuesta exitosa': (r) => r.status === 200,
  })

  // Simula una pausa corta entre solicitudes
  sleep(0.5)
}
