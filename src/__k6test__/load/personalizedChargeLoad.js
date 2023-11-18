import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10, // Users
  duration: '30s', // Test duration
};

export default function () {
    http.get('https://bliss-three.vercel.app/login'); // The webpage's URL is established
  sleep(1);
}
