import http from 'k6/http'; 
import { sleep } from 'k6';

export default function () {
  http.get('https://bliss-three.vercel.app/login'); //Se establece el URL de la página a realizar el test.
  sleep(1);
}