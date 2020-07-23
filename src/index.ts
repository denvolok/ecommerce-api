import App from "./config/app";

const app = new App();

app.init().then(() => app.run());
