# Pre-requisitos
- Se requiere el servicio web del repositorio: ServiciosWebEquipo-1 https://github.com/CLA-TC2005B-FJ2025/ServiciosWebEquipo-1
- Modifica el archivo .env.development para configurar la variable REACT_APP_API_BASE_URL a tus necesidades

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

##  Tecnologías Utilizadas

* **React:** Librería de JavaScript para construir interfaces de usuario.
* **React Router DOM:** Librería para la navegación y el enrutamiento dentro de la aplicación React.
* **Context API:** Es una característica de React para gestionar el estado de manera global.
* **`fetch` API:** API nativa de JavaScript para realizar peticiones HTTP al servicio web.
* **JavaScript (ES6+):** El lenguaje de programación principal utilizado.
* **CSS:** Lenguaje de diseño gráfico.
* **Node.js:** Entorno en tiempo de ejecución multiplataforma para la capa del servidor basado en JavaScript.

## Instalar dependencias
npm install
npm install react-circular-progressbar
npm install jspdf html2canvas

## Iniciar la aplicación
npm start

## Consideraciones para el Desarrollo

* **Manejo de Errores:** Se implementa un manejo básico de errores al mostrar mensajes en la interfaz de usuario. En aplicaciones más complejas, se podría implementar un manejo de errores más sofisticado (por ejemplo, logging, retries, creación de usuarios, etc.).
* **Seguridad:** Este proyecto se centra en la lógica de autenticación MUY básica. En un entorno de producción, se deben considerar medidas de seguridad adicionales como el uso de HTTPS, protección contra ataques CSRF, almacenamiento seguro de tokens (si se implementara una autenticación basada en tokens), etc.
* **Interfaz de Usuario:** La interfaz de usuario es MUY básica y con fines demostrativos. Se podría mejorar significativamente con estilos CSS y una estructura visual más detallada.
* **Pruebas:** Para asegurar la calidad del código, habría que escribir pruebas unitarias e de integración para los componentes de React y para la lógica de autenticación en el `AuthContext`.
* **Estado Persistente:** El estado de autenticación actual se pierde al recargar la página. Para mantener la sesión del usuario, se podría utilizar mecanismos como `localStorage` o `sessionStorage` (con las consideraciones de seguridad adecuadas) o implementar una autenticación basada en tokens con almacenamiento en cookies o `localStorage`.

## Referencias:
https://react.dev/reference/react/createContext
https://github.com/bezkoder/react-js-login-registration-hooks
https://chatgpt.com

