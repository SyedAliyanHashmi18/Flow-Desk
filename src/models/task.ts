import mongoose,{Schema,Document, Types} from "mongoose";


export interface Task extends Document{
    userId: Types.ObjectId;
    projectId: Types.ObjectId;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    order: number;
    dueDate: Date;
    aiGenerated: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: Schema<Task> = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    order: { type: Number, default: 0, index:true },
    dueDate: { type: Date, required: false },
    aiGenerated: { type: Boolean, default: false },
}, { timestamps: true });
taskSchema.index({ projectId: 1, status: 1 });
taskSchema.index({ projectId: 1, order: 1 });
taskSchema.index({ userId: 1 });

const TaskModel =  (mongoose.models.Task as mongoose.Model<Task>)||(mongoose.model<Task>('Task', taskSchema));
export default TaskModel;