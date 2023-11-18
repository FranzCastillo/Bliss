import http from 'k6/http'; 
import { sleep } from 'k6';

export default function () {
  http.get('https://bliss-three.vercel.app/login'); //Sets URL to test
  sleep(1);
}