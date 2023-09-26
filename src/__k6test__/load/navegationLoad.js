import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10,
  duration: '1m',
};

export default function () {
    const response = http.post('https://bliss-three.vercel.app/login', {
      email: "cas21562@uvg.edu.gt",
      password: "cas21562",
    });
  
    sleep(1);
  
    const getResponse = http.get('https://bliss-three.vercel.app/grid', {
      cookies: { token: response.cookies.token }, // Utiliza la cookie de autenticación
    });
  
    check(getResponse, {
      'Página "Productos" cargada correctamente': (r) => r.status === 200,
    });
  
    sleep(1);
  }
  
  
  
  
