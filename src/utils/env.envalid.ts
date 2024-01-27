import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port(),
  AWS_ACCESS_KEY: str(),
  AWS_SECRET_KEY: str(),
  AWS_REGION: str(),
  AWS_S3_BUCKET_RECORDS: str(),
});
