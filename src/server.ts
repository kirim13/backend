import app from "./app";
import env from "./utils/env.envalid";

const PORT: number = env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
