const { v4: uuidv4 } = require('uuid');
uuidv4();

module.exports.fileUploader = async (file = null) => {
    if(!file) {
        return null
    }

    // * get file extension
    const fileExtension = file.name.split('.')[1];

    // ! set a UUID to secure file name
    const fileName = uuidv4();

    // * create full file name and extension  
    const fileNameWithExtension = `${fileName}.${fileExtension}`;
    console.log(fileNameWithExtension , 'fileNameWithExtension')
    // * move file to created address
    // * proccess.cwd() is address of current nodeJS process
    const saveFolderPath = `${process.cwd()}/uploads/post-images/${fileNameWithExtension}` 
    await file.mv(saveFolderPath , (err) => {
        if(err) {
            throw err
        }
    })
    // * return filename to store in database
    return fileNameWithExtension
}