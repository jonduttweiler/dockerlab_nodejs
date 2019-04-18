//init database IF IS EMPTY
async function init_database_if_is_empty(db){
    let is_empty_database = false;

    let collections = await db.collections();
    if(collections.length === 0){
        is_empty_database = true;
    }

    if(is_empty_database){

        await db.collection("binnacle").insertOne({
            message:"Initializing database with test data",
            date: new Date()
        })

        await db.collection("memos").insertMany([
            {date:new Date(),
             message:"It takes a village to keep the dropbox organized."
            },
            {date:new Date(),
             message:"Respect headpones as a sign of intentional isolation."
            },
            {date:new Date(),
             message:"It's your responsibility to know how to use your tools."
            },
            {date:new Date(),
             message:"Meetings are for finding solutions or making decisions."
            },
            {date:new Date(),
             message:"Multi-tasking is a myth. Do more by doing less at once."
            }
        ]);
    }

}


module.exports.init_database_if_is_empty = init_database_if_is_empty;