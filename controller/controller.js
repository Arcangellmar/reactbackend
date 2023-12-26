import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client();
const bucketName = 'react-node-prueba';

export const getData = async (req, res) => {
    try {
        const response = [
            {
                id: 1,
                name: "John Doe",
                email: ""
            },
            {
                id: 2,
                name: "Jane Doe",
                email: ""
            }
        ];
        res.json(response);
    }
    catch(err){
        res.json({mensaje: err});
    }
}

export const contacto = async (req, res) => {
    try{
        console.log(req.body);

        let contacto = req.body;
        
        const key = 'Contactos.json';

        let listarjson = [];
        listarjson.push(contacto);

        if (await isExistObjectS3(key)) {
            const datajson = await readContentJsonFile(key);
            if (datajson) {
                listarjson = JSON.parse(datajson);
            }
            if (!listarjson.some(c => JSON.stringify(c) === JSON.stringify(contacto))) {
                listarjson.push(contacto);
            }
        } else {
            listarjson.push(contacto);
        }

        const command = new PutObjectCommand({
            "Body": JSON.stringify(listarjson),
            "Bucket": bucketName,
            "Key": key
          });
        const response = await s3.send(command);

        res.json({mensaje: 'Contacto guardado correctamente.', status: true});
    }
    catch(err){
        res.json({mensaje: err});
    }
}

async function isExistObjectS3(_BucketKey) {
    try {
        const command = new GetObjectCommand({
            "Bucket": bucketName,
            "Key": _BucketKey
        });
        const response = await s3.send(command);
        return true;
    } catch (error) {
        return false;
    }
}

async function readContentJsonFile(bucketKey) {
    try {
        const command = new GetObjectCommand({
            "Bucket": bucketName,
            "Key": bucketKey
        });
        const response = await s3.send(command);
        const responseBody = await response.Body.transformToString();
        return responseBody;
    } catch (error) {
        if (error.code === 'NoSuchKey') {
            console.error('El objeto no existe en S3.');
        } else {
            console.error(`Error al leer el contenido del archivo JSON: ${error.message}`);
        }
        return '';
    }
}