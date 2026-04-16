'use client'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function ImproveAItasks({ projectId }: { projectId: string }){

    const [loading,setLoading] = useState(false)
      const router = useRouter()
      
    
        const handleImprove = async () => {
          try {
            setLoading(true);
    
            const result = await axios.post(
              `/api/projects/${projectId}/improve-task` 
            );
    
            if (result?.data?.success && result?.data?.tasks.length > 0) {
              toast.success("Tasks improved successfully");
              router.refresh();
            } else {
              toast.error(result?.data?.message || "No AI Tasks found to improve");
            }
          } catch (error) {
            toast.error("Failed to improve tasks");
          } finally {
            setLoading(false); 
          }
        }
    
    return(
    <>
    <Button 
                    onClick={handleImprove}
                    disabled={loading}
                  >
                    {loading ? "Improving..." : "Improve AI Tasks"}

                    <Badge variant="secondary" className="flex items-center gap-1 ml-2">
                      <Sparkles size={14} />
                    </Badge>
                  </Button>
    </>
    )
}