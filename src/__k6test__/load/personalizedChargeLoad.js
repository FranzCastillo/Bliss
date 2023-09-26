import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10, // Usuarios virtuales simultáneos
  duration: '30s', // Duración de la prueba
};

export default function () {
    http.get('https://bliss-three.vercel.app/login');
  sleep(1);
}
