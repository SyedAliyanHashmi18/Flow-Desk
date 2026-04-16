import mongoose,{Schema,Document, ObjectId} from "mongoose";

export interface Project extends Document{
    
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: "active" | "archived";
    aiGenerated: boolean;
    taskCount: number;
    createdAt: Date;
    updatedAt: Date;
    teamId?: mongoose.Types.ObjectId;
}

const projectSchema: Schema<Project> = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["active", "archived"], default: "active" },
    aiGenerated: { type: Boolean, default: false },
    taskCount: { type: Number, default: 0 },
    teamId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team",
                },
}, { timestamps: true });


const ProjectModel =  (mongoose.models.Project as mongoose.Model<Project>)||(mongoose.model<Project>('Project', projectSchema));

export default ProjectModel;