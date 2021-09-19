import Mongoose  from "mongoose";

const todoSchema = new Mongoose.Schema ({
        user:String,
        details:  {
            type:String,
            unique: true,
            required:true
        },
    },
    { timestamps:true },
)

export default Mongoose.model('todo', todoSchema);