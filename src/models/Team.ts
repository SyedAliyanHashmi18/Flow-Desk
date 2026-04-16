import mongoose from "mongoose";

export interface Team {
    name: string;
    ownerId: mongoose.Types.ObjectId;
    createdAt: Date;
}
const teamSchema = new mongoose.Schema<Team>({
    name: { type: String, required: true },
    ownerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Team || mongoose.model("Team", teamSchema);