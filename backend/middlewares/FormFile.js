const multer = require ("multer")
const Exception = require ("../models/Exception")
const convertFieldToFolder = require ("../utils/FieldNameToFolderName")
const path = require ("path")
const uuid = require ("uuid")

function getUploadFile (fieldNames)
{
    let store = multer.diskStorage ({
        destination (req, file, cb) 
        {
            let folder = convertFieldToFolder (file.fieldname)
            cb (null, path.join ("public", "img", folder))
        },
    
        filename (req, file, cb)
        {
            let ext = path.extname (file.originalname)
            let fileName = uuid.v4 ()
            cb (null, fileName + ext)
        }
    })

    let upload = multer ({storage: store})
    return upload.fields (fieldNames.map (elem => { return {name: elem, maxCount: 3}}))
}

function uploadFileMiddleware (...fieldNames)
{
    let upload = getUploadFile (fieldNames)
    return (req,res,next) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError || err) 
            {
                return next (new Exception (err,400))   
            }         
            
            Object.keys (req.files).forEach (key => {
                let file = req.files[key][0]
                let folder = convertFieldToFolder (file.fieldname)
                let fileName = file.filename
                let imageRoute = `img/${folder}/${fileName}`
                req.body[key] = imageRoute
            })

            next ()
        })
    }
}

module.exports = uploadFileMiddleware