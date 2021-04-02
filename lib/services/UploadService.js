const Upload = require('../models/Upload');
const deleteItem = require('../utils/amazonDelete')


module.exports = class UploadService {

    static async uploadSingleFile(req) {

        const response = await Upload.insert({url: req.file.location, name: req.body.name, type: req.file.contentType, timeStamp: req.file.key})

        return response;
    }
    static async deleteSingleFile(id) {
        const response = await Upload.delete(id);
        await deleteItem('glasswavs1', response.timeStamp);
        return `You have deleted ${response.name} from your collection. `
    }
    static async getAllFiles() {
        const response = await Upload.getAll();

        return response;
    }
    static async getOneFile(id) {
        const response = await Upload.getOne(id);

        return response;
    }
}
    
    
