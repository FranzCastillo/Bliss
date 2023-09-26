import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  stages: [
    { duration: '1m', target: 10 },  // Aumento a 10 usuarios en 1 minuto.
    { duration: '2m', target: 10 },  // Mantener 10 usuarios durante 2 minutos.
    { duration: '1m', target: 0 },   // Reducir a 0 usuarios en 1 minuto.
  ],
}

export default function () {
  http.get('https://bliss-three.vercel.app')
  sleep(1)
}
