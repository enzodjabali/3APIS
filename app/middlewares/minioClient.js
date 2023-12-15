const Minio = require('minio');
const dotenv = require('dotenv');

dotenv.config();

const minioClient = new Minio.Client({
    endPoint: 'minio',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_S3_ACCESS_KEY,
    secretKey: process.env.MINIO_S3_SECRET_KET
});

module.exports = minioClient;
