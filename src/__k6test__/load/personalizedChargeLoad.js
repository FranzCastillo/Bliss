import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10, // Se establecen los usuarios simultáneos de la evaluación
  duration: '30s', // Tiempo de duración de la prueba
};

export default function () {
    http.get('https://bliss-three.vercel.app/login'); // Se establece la URL de la página a la cual realizar los tests.
  sleep(1);
}
