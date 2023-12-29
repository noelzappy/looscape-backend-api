import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import { S3Client } from '@/config/s3config';
import { DO_SPACES_BUCKET } from '@/config';

const storage = multerS3({
  s3: S3Client,
  bucket: DO_SPACES_BUCKET,
  acl: 'public-read',
  key: (request, file, cb) => {
    cb(null, `${crypto.randomUUID()}-${file.originalname}`);
  },
});

export const UploadMiddleware = multer({
  storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
