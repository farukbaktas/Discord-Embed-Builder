import mongoose from "mongoose"

export default mongoose.model("members", new mongoose.Schema({
    member_id: { type: String, default: 'select', required: true },
    premium: {
        status: { type: Boolean, default: false, required: true },
        unlimited: { type: Boolean, default: false, required: true  },
        time: { type: Number, default: Date.now(), required: true }
    },
    status: {
        point: { type: Number, default: 0, required: true },
        black_list: {
            status: { type: Boolean, default: false, required: true },
            unlimited: { type: Boolean, default: false, required: true },
            time: { type: Number, default: Date.now(), required: true },
            reason: { type: String, default: 'You are a bad person 😡', required: true }
        }
    },
}))