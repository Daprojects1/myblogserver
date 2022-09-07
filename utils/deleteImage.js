const fs = require('fs')
const { resolve } = require('path')

const deleteImage = (data) => {
    if (!data) return console.log('Sorry cannot delete images as there is no data.')

    if (!data?.image || data?.image === 'No image uploaded') return console.log('Image doesnt exists')
    
        // delteting the image as well in the folder
        const filePath = resolve(__dirname + "/../"  +data?.image)
        
        fs.stat(filePath, (err, stats) => {
            if (err) {
                return console.log(err)
            }
            fs.unlink(filePath, (err) => {
                if(err) return console.log("unlink err",err);
                console.log('image deleted successfully');
            })

        })

}

module.exports = deleteImage