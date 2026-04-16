import mongoose from "mongoose";

export interface TeamMember {
    teamId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    role: "owner" | "admin" | "member";
}

const teamMemberSchema = new mongoose.Schema<TeamMember>({
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["owner", "admin", "member"], required: true, default: "member" },
});

export default mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);