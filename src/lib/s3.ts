import AWS from 'aws-sdk';

export async function uploadToS3(file: File, storeName: string) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        });

        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
            },
            region: 'af-south-1',
        });


        const file_key =  "stores/" + storeName + "/" + file.name.replace(' ', '+');
        const params = {
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
            Key: file_key,
            Body: file,
        };

        const uplaod =  s3.upload(params).on('httpUploadProgress', function (evt) {
            console.log("uploading...", parseInt(((evt.loaded * 100)/evt.total).toString()));
        }).promise();

        await uplaod.then((data) => {
            console.log(data);
            console.log("File uploaded successfully", file_key);
        })

        return Promise.resolve({
            file_key,
            file_name: file.name,
        });
    } catch (error) {}
}

export async function deleteFromS3(file_key: string) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        });

        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
            },
            region: 'af-south-1',
        });

       

        const params = {
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,

            Key: file_key,
        };

        const deleteObject = await s3.deleteObject(params).promise();

        return Promise.resolve(deleteObject);

    } catch (error) {}
}