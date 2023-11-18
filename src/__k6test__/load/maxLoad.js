import http from 'k6/http'
import { sleep, check } from 'k6'

export let options = {
  vus: 100, // Users
  duration: '1m', // Test duration
};

export default function () {
  // Makes a GET request with the URL as parameter
  const response = http.get('https://bliss-three.vercel.app')

  // Verifies if the response is correct
  check(response, {
    'Respuesta exitosa': (r) => r.status === 200,
  })

  sleep(0.5)
}
