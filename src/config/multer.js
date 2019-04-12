const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
 


module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),//Os uploads dos arquivos cairão na pasta tmp.
    
    storage: multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },

        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                file.key = `${hash.toString("Hex")}-${file.originalname}`;  

                cb(null,file.key);
            })
        }

    }),
}; 