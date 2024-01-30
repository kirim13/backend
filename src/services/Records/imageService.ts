import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import env from "../../utils/env.envalid";
import cuid from "cuid";

const userId = "0000";

const getPost = async () => {
  // Create new instance of S3 Bucket
  const s3 = new S3Client({
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_KEY,
    },
    region: env.AWS_REGION,
  });

  // Generates a presigned URL to write to S3 Bucket
  const post = await createPresignedPost(s3, {
    Bucket: env.AWS_S3_BUCKET_RECORDS,
    Key: `${cuid()}File`,
    Conditions: [
      ["content-length-range", 0, 5048576],
      ["starts-with", "$Content-Type", "image/"],
      ["eq", "$x-amz-meta-userId", userId],
    ],
    Fields: {
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

// Cannot limit file size or type with getSignedUrlPromise

export { getPost };
