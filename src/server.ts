import app from "./config/app";
import env from "./utils/env.envalid";

const PORT = env.PORT;

// Listening for http requests
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

// Listening for web socket connections
export const server = app.listen(Number(PORT) + 1, () => {
  console.log(`Server listening on port: ${Number(PORT) + 1}`);
});
