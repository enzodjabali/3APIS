const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: 'minio',
    port: 9000,
    useSSL: false,
    accessKey: 'npLVOjSWgXDWxJFT2ASS',
    secretKey: 'MUD0pFfVFo8Zm74zIHNMuKwcf5MsOxiXEjYEnzez'
});

module.exports = minioClient;
