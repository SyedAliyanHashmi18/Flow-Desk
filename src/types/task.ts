export interface Task {
  _id: string
  projectId: string
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  order: number
  dueDate: Date
  aiGenerated?: boolean
  createdAt: Date
  updatedAt: Date
}