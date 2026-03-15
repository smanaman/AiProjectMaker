// REQUIRED IMPORTS
import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const generateProjectPDF = async (data, outputPath) => {

  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { height } = page.getSize();

  let y = height - 50;

  // DRAW FUNCTION
  const draw = (text) => {

    page.drawText(String(text), {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0)
    });

    y -= 20;

  };

  // SAFE ARRAY CONVERTER
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [val];
    }
  };

  const pages = toArray(data.pages);
  const features = toArray(data.features);

  // ======================
  // TITLE
  // ======================

  draw(`Project Name: ${data.projectName || "N/A"}`);
  draw(`Project Type: ${data.projectType || "N/A"}`);
  draw(`Level: ${data.level || "N/A"}`);
  draw("");

  // ======================
  // TECHNOLOGY STACK
  // ======================

  draw("Technology Stack");
  draw(`Frontend: ${data.frontend || "Not specified"}`);
  draw(`Backend: ${data.backend || "Not specified"}`);
  draw(`Database: ${data.database || "Not specified"}`);
  draw("");

  // ======================
  // INTRODUCTION
  // ======================

  draw("1. Introduction");
  draw(`The ${data.projectName} project is developed using modern web technologies.`);
  draw("The system provides an efficient and user-friendly platform.");
  draw("");

  // ======================
  // SYSTEM ANALYSIS
  // ======================

  draw("2. System Analysis");
  draw("Problem Definition:");
  draw("Traditional systems are manual and inefficient.");
  draw("");

  draw("Feasibility Study:");
  draw("Technical Feasibility: Development using modern tools.");
  draw("Operational Feasibility: Easy for users to operate.");
  draw("");

  // ======================
  // PAGES
  // ======================

  draw("3. Application Pages");

  if (pages.length === 0) {
    draw("No pages specified");
  } else {
    pages.forEach((p, i) => {
      draw(`${i + 1}. ${p}`);
    });
  }

  draw("");

  // ======================
  // FEATURES
  // ======================

  draw("4. Features");

  if (features.length === 0) {
    draw("No features specified");
  } else {
    features.forEach((f, i) => {
      draw(`${i + 1}. ${f}`);
    });
  }

  draw("");

  // ======================
  // SYSTEM DESIGN
  // ======================

  draw("5. System Design");

  draw("DFD (Data Flow Diagram)");
  draw("Describes how data moves in the system.");

  draw("");

  draw("Level 0 Diagram:");
  draw("High level overview of system processes.");

  draw("");

  draw("Level 1 Diagram:");
  draw("Detailed view of internal modules.");

  draw("");

  draw("E-R Diagram:");
  draw("Defines relationships between database entities.");

  draw("");

  // SAVE PDF
  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(outputPath, pdfBytes);

};