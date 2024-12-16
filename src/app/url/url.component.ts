export const environment = {
    // production: false, // para desarrollo;
    // apiUrl: 'http://localhost:4200'  // API local;
  
    production: true, // para produccion/publicado;
    apiUrlEmail: 'https://www.sendemail.somee.com',  // API en producción/publicado y eliminar proxy.conf.json;
    apiUrlLoginUser: 'https://www.loginusertoken.somee.com', // 'https://www.loginusertoken.somee.com'
    apiMessager: 'https://www.mychatmessager.somee.com'
    // https://www.sendemail.somee.com/swagger/index.html
    // http://www.mychatmessager.somee.com/swagger/index.html
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