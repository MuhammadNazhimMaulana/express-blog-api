const Encryption = require('../helpers/encryption');

class Pagination{

    constructor(req, model, populate) {
        this.limit = parseInt(req.query.limit);
        this.cursor = req.query.cursor;
        this.decryptedCursor;
        this.collections;
        this.model = model;
        this.populate = populate;
    }

    // Pagination
    paginate = async () => {
        try{
            if (this.cursor) {
                this.decryptedCursor = Encryption.decrypt(this.cursor)
                let decrypedDate = new Date(this.decryptedCursor * 1000)

                // Check Populate Field
                if(this.populate){
                  // If there is a populate field
                  this.collections = await this.model.find({
                    created_at: {
                      $lt: new Date(decrypedDate),
                    },
                  })
                    .sort({ created_at: -1 })
                    .limit(this.limit + 1)
                    .populate(this.populate)
                    .exec()
                }else{
                  this.collections = await this.model.find({
                    created_at: {
                      $lt: new Date(decrypedDate),
                    },
                  })
                    .sort({ created_at: -1 })
                    .limit(this.limit + 1)
                    .exec()
                }

              } else {
                // Check Populate Field
                if(this.populate){
                  // If there is a populate field
                  this.collections = await this.model.find({})
                    .sort({ created_at: -1 })
                    .limit(this.limit + 1)
                    .populate(this.populate)
                }else{
                  this.collections = await this.model.find({})
                    .sort({ created_at: -1 })
                    .limit(this.limit + 1)
                }
              }
              
              const hasMore = this.collections.length === this.limit + 1
              let nextCursor = null
              if (hasMore) {
                const nextCursorRecord = this.collections[this.limit]
                var unixTimestamp = Math.floor(nextCursorRecord.created_at.getTime() / 1000)
                nextCursor = Encryption.encrypt(unixTimestamp.toString())
                this.collections.pop()
              }
      
              let data = {
                  result: this.collections,
                  nextCursor, 
                  hasMore
              }
    
           return data;
        }catch (error) {
            // If Error
            return console.log(error.message);
        }
    }

}

module.exports = Pagination