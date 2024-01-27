import aws from "aws-sdk";
import env from "../utils/env.envalid";
import cuid from "cuid";

const userId = "0000";

const getPost = async () => {
  // Create new instance of S3 Bucket
  const s3 = new aws.S3({
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_KEY,
    },
    region: env.AWS_REGION,
  });

  // Updates main config class with region, credentials, and request options
  aws.config.update({
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_KEY,
    },
    region: env.AWS_REGION,
    signatureVersion: "v4",
  });

  // Generates a presigned URL to write to S3 Bucket
  const post = await s3.createPresignedPost({
    Bucket: env.AWS_S3_BUCKET_RECORDS,
    Conditions: [
      ["content-length-range", 0, 5048576],
      ["starts-with", "$Content-Type", "image/"],
      ["eq", "$x-amz-meta-userId", userId],
    ],
    Fields: {
      Key: `${cuid()}File`,
      "Content-Type": "image/",
      success_action_redirect: `http://localhost:${env.PORT}/success`,
      success_action_status: "201",
    },
    Expires: 60 * 60,
  });

  post.fields["x-amz-meta-userId"] = userId;

  // Return URL that will be used for file upload
  if (post) return { url: post.url, fields: post.fields };
  else throw new Error(`Return post failed`);
};

/* Cannot limit file size or type 
const getUrl = async (req: Request, res: Response) => {
  const type = req.query.type === "get" ? "getObject" : "putObject";
  const url = await s3.getSignedUrlPromise(type, {
    Bucket: env.AWS_S3_BUCKET_RECORDS,
    Key: `${req.query.key}`,
    Expires: 30 * 60,
  });
  return res.status(200).json({ url });
};
*/

export { getPost };
