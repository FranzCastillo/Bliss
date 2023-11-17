import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // 10 users in 30s
    { duration: '1m', target: 20 }, // 20 users in 1 min
    { duration: '30s', target: 0 }, // 0 users in 30s
  ],
};

export default function () {
  //Makes a POST request to the web page with parameters to make a log in.
  const response = http.post('https://bliss-three.vercel.app/', {
    email: "cas21562@uvg.edu.gt",
    password: "cas21562",
  });

  http.get('https://bliss-three.vercel.app/', {
    cookies: { token: response.cookies.token }, // Uses the auth cookie
  });

  sleep(1);
}
