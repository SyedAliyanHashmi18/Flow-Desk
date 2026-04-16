import { PDFDocument, StandardFonts } from "pdf-lib";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/models/task";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  await dbConnect();

  const { id: projectId } = await params;
  const tasks = await TaskModel.find({ projectId });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 750;

  page.drawText("Project Tasks Report", { x: 50, y, size: 18, font });
  y -= 30;

  tasks.forEach((task, index) => {
    page.drawText(
      `${index + 1}. ${task.title} (${task.status})`,
      { x: 50, y, size: 12, font }
    );
    y -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}