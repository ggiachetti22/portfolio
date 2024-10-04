export const environment = {
    // production: false, // para desarrollo;
    // apiUrl: 'http://localhost:4200'  // API local;
  
    production: true, // para produccion/publicado;
    apiUrl: 'https://www.sendemail.somee.com'  // API en producción/publicado y eliminar proxy.conf.json;
  };
  
  
  
  /* 
  package.json
  "scripts": {
    "start": "ng serve --proxy-config proxy.conf.json -o",
  */
  
  
  /* 
    proxy.conf.json
  {
    "/api/mime": {
        "target": "https://www.sendemail.somee.com",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/api/userauth": {
        "target": "https://www.userauth.somee.com",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/api/messager": {
        "target": "https://www.sendmessages.somee.com",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
  
  }
  */