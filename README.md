# Pre-requisitos
- Se requiere el servicio web del repositorio: ServiciosWebEquipo-1 https://github.com/CLA-TC2005B-FJ2025/ServiciosWebEquipo-1
- Modificar el archivo .env.development para configurar la variable REACT_APP_API_BASE_URL con el link del puerto de ServiciosWebEquipo-1

##  Tecnologías Utilizadas

* **React:** Librería de JavaScript para construir interfaces de usuario.
* **React Router DOM:** Librería para la navegación y el enrutamiento dentro de la aplicación React.
* **Context API:** Es una característica de React para gestionar el estado de manera global.
* **`fetch` API:** API nativa de JavaScript para realizar peticiones HTTP al servicio web.
* **JavaScript (ES6+):** El lenguaje de programación principal utilizado.
* **CSS:** Lenguaje de diseño gráfico.
* **Node.js:** Entorno en tiempo de ejecución multiplataforma para la capa del servidor basado en JavaScript.

## Instalar dependencias
* npm install
* npm install react-circular-progressbar
* npm install jspdf html2canvas

## Iniciar la aplicación
npm start

## Estructura del Proyecto

Este ejemplo de proyecto de React sigue una estructura de componentes y utiliza el Context API para gestionar el estado de autenticación de manera global. A continuación, se describen los principales archivos y directorios:

```
react-ejemplo-login/
├── public/
│   └── ... (archivos estáticos como index.html)
└── src/
    ├── components/
    │   ├── LoginPage.js        # Componente para la página de inicio de sesión
    │   ├── MenuPage.js         # Componente para la página del menú protegido
    │   └── PrivateRoute.js     # Componente para proteger rutas
    ├── contexts/
    │   └── AuthContext.js      # Contexto para gestionar la autenticación
    ├── App.js                # Componente principal de la aplicación
    └── index.js              # Punto de entrada de la aplicación
    └── ... (otros archivos de configuración y estilos)
```
