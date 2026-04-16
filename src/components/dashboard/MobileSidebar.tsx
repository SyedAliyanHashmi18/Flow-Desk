import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Sidebar from "./Sidebar";
import { Button } from "../ui/button";

export default function MobileSidebar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:hidden">☰</Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-65 h-full">
        <Sidebar />
      </DialogContent>
    </Dialog>
  )
}