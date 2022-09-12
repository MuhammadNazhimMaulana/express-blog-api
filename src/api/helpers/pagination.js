const Encryption = require('../helpers/encryption');

class Pagination{

    constructor(req, res, model) {
        const limit = parseInt(req.query.limit)
        const cursor = req.query.cursor

        let decryptedCursor
        let collections

        if (cursor) {
          decryptedCursor = Encryption.decrypt(cursor)
          let decrypedDate = new Date(decryptedCursor * 1000)
          collections = model.find({
            created_at: {
              $lt: new Date(decrypedDate),
            },
          })
            .sort({ created_at: -1 })
            .limit(limit + 1)
            .exec()
        } else {
          collections = model.find({})
            .sort({ created_at: -1 })
            .limit(limit + 1)
        }
        const hasMore = collections.length === limit + 1
        let nextCursor = null
        if (hasMore) {
          const nextCursorRecord = collections[limit]
          var unixTimestamp = Math.floor(nextCursorRecord.created_at.getTime() / 1000)
          nextCursor = Encryption.encrypt(unixTimestamp.toString())
          collections.pop()
        }

        let data = {
            result: collections,
            nextCursor, 
            hasMore
        }

        return collections;
    }

    paginate = () => {
        
    };

}

module.exports = Pagination