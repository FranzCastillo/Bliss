import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10, //Sets virtual users
  duration: '1m', //Sets test duration
};

export default function () {
    //Makes a POST request with parameters to log in.
    const response = http.post('https://bliss-three.vercel.app/login', {
      email: "cas21562@uvg.edu.gt",
      password: "cas21562",
    });
  
    sleep(1);
  
    const getResponse = http.get('https://bliss-three.vercel.app/grid', {
      cookies: { token: response.cookies.token }, // Uses de auth cookie and gets the page's response
    });
  
    check(getResponse, {
      'Página "Productos" cargada correctamente': (r) => r.status === 200, //Prints results
    });
  
    sleep(1);
  }
  
  
  
  
