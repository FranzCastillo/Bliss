import http from 'k6/http'

export let options = {
  vus: 5,  // Número de usuarios virtuales simultáneos
  duration: '5s',  // Duración total de la prueba
}

export default function () {
  // Navegación a través de las páginas clave del sitio
  let pages = ['https://bliss-three.vercel.app', 'https://bliss-three.vercel.app/grid', 'https://bliss-three.vercel.app/product/1']

  for (let i = 0; i < pages.length; i++) {
    let page = pages[i]
    let response = http.get(page)

    // Registro del tiempo de respuesta de la página en los resultados
    let pageName = page.split('/').pop()
    console.log(`Página ${pageName} - Tiempo de Respuesta: ${response.timings.duration} ms`)
  }
}
