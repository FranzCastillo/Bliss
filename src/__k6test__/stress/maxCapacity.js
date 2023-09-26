import http from 'k6/http'

export let options = {
  stages: [
    { duration: '1m', target: 1 },   // Aumento gradual a 1 usuario virtual en 1 minuto.
    { duration: '5m', target: 10 },  // Aumento gradual a 10 usuarios virtuales en 5 minutos.
    { duration: '2m', target: 10 },  // Mantener 10 usuarios virtuales durante 2 minutos.
    { duration: '1m', target: 0 },   // Reducción a 0 usuarios virtuales en 1 minuto.
  ],
};

export default function () {
  http.get('https://bliss-three.vercel.app')
}
