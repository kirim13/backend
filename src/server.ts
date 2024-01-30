import app from "./config/app";
import env from "./utils/env.envalid";

const PORT = env.PORT;

export const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
