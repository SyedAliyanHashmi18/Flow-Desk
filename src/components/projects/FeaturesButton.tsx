'use client'

import { Button } from "../ui/button"
import { UpgradeBanner } from "./UpgradeBanner"

type Props = {
  projectId: string;
  user: any;
}
export function FeaturesButton({ projectId, user }: Props) {
     const downloadFile = async (url: string, filename: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Download failed");
    }

    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
    alert("Failed to download file");
  }
};
if(user.plan === "free"){
  return (
    <>
    <Button
  onClick={() =>
    downloadFile(
      `/api/projects/${projectId}/tasks/export-pdf`,
      "report.pdf"
    )
  }
>
  Export PDF
</Button>

<Button
  onClick={() =>
    downloadFile(
      `/api/projects/${projectId}/tasks/export-csv`,
      "tasks.csv"
    )
  }
>
  Export CSV
</Button>
</>
  )}else {
    <UpgradeBanner />
    
  }
}
  