import aws from 'aws-sdk';
import { S3 } from '@aws-sdk/client-s3';
import { DO_SPACES_ENDPOINT, DO_SPACES_KEY, DO_SPACES_SECRET } from '.';

const spacesEndpoint: any = new aws.Endpoint(DO_SPACES_ENDPOINT);

export const S3Client = new S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: DO_SPACES_KEY, // process.env.SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET, // process.env.SPACES_SECRET,
  },
  region: 'fra1',
});
