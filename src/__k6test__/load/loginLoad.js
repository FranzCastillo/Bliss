import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // 10 usuarios durante 30 segundos
    { duration: '1m', target: 20 }, // 20 usuarios durante 1 minuto
    { duration: '30s', target: 0 }, // Desaceleración: 0 usuarios durante 30 segundos
  ],
};

export default function () {
  const response = http.post('https://bliss-three.vercel.app/', {
    email: "cas21562@uvg.edu.gt",
    password: "cas21562",
  });

  http.get('https://bliss-three.vercel.app/', {
    cookies: { token: response.cookies.token }, // Utiliza la cookie de autenticación
  });

  sleep(1);
}
