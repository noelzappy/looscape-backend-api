import aws from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';

const spacesEndpoint: any = new aws.Endpoint('fra1.digitaloceanspaces.com');

const s3 = new S3Client({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: 'DO00EX2ZCLCJ9CYJ4FF9',
    secretAccessKey: '6tBhk0pEvSwccY6JxKvQ5Zzu5UfOcitqLCdTwWfK1fU',
  },
  region: 'fra1',
});

const storage = multerS3({
  s3,
  bucket: 'alvibeauty',
  acl: 'public-read',
  key: (request, file, cb) => {
    cb(null, `${crypto.randomUUID()}-${file.originalname}`);
  },
});

export const UploadMiddleware = multer({
  storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
