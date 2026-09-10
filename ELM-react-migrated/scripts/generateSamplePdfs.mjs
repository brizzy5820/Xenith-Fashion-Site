import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "public", "materials");

function escapePdf(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function buildPdf(title, pages) {
  const pageCount = pages.length;
  const kids = [];
  for (let i = 0; i < pageCount; i++) kids.push(4 + 2 * i);

  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] =
    `<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(" ")}] /Count ${pageCount} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  for (let i = 0; i < pageCount; i++) {
    const pageObj = 4 + 2 * i;
    const contentObj = pageObj + 1;
    const lines = pages[i];

    let stream = "BT\n/F1 22 Tf\n72 720 Td\n";
    stream += `(${escapePdf(title)}  —  Page ${i + 1}) Tj\n`;
    stream += "/F1 13 Tf\n0 -34 Td\n18 TL\n";
    for (const line of lines) {
      stream += `(${escapePdf(line)}) Tj\nT*\n`;
    }
    stream += "ET";

    objects[pageObj] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ` +
      `/Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObj} 0 R >>`;
    objects[contentObj] =
      `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`;
  }

  const header = "%PDF-1.4\n";
  let body = "";
  const offsets = [];

  for (let num = 1; num < objects.length; num++) {
    offsets[num] = header.length + body.length;
    body += `${num} 0 obj\n${objects[num]}\nendobj\n`;
  }

  const xrefStart = header.length + body.length;
  const totalObjs = objects.length;

  let xref = `xref\n0 ${totalObjs}\n`;
  xref += "0000000000 65535 f \n";
  for (let num = 1; num < totalObjs; num++) {
    xref += `${String(offsets[num]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${totalObjs} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(header + body + xref, "latin1");
}

const docs = {
  "functions-and-limits": {
    title: "Functions and Limits",
    pages: [
      [
        "A function maps each input to exactly one output: f(x).",
        "Domain = allowed inputs. Range = possible outputs.",
        "Vertical line test: crosses once => it is a function.",
      ],
      [
        "A limit describes the value a function approaches.",
        "Notation: lim(x->a) f(x) = L",
        "Limits can exist even when f(a) is undefined.",
      ],
      [
        "Evaluating limits:",
        "1. Try direct substitution.",
        "2. Factor and cancel for 0/0.",
        "3. Use conjugates for radicals.",
      ],
    ],
  },
  differentiation: {
    title: "Differentiation",
    pages: [
      [
        "The derivative f'(x) is the instantaneous rate of change.",
        "Geometrically it is the slope of the tangent line.",
        "Power rule: d/dx x^n = n x^(n-1).",
      ],
      [
        "Sum rule: (f + g)' = f' + g'.",
        "Product rule: (fg)' = f'g + fg'.",
        "Chain rule: d/dx f(g(x)) = f'(g(x)) g'(x).",
      ],
    ],
  },
  "applications-differentiation-1": {
    title: "Applications of Differentiation I",
    pages: [
      [
        "Optimisation steps:",
        "1. Draw a diagram, define variables.",
        "2. Write the quantity to optimise.",
        "3. Differentiate and find critical points.",
      ],
      [
        "Kinematics:",
        "v(t) = s'(t),  a(t) = v'(t) = s''(t).",
        "v = 0 marks a change of direction.",
      ],
    ],
  },
  "techniques-differentiation-1": {
    title: "Techniques of Differentiation I",
    pages: [
      [
        "Product rule: (uv)' = u'v + uv'.",
        "Quotient rule: (u/v)' = (u'v - uv') / v^2.",
        "Chain rule for composite functions.",
      ],
      [
        "Derivative of common functions:",
        "d/dx sin x = cos x",
        "d/dx e^x = e^x",
        "d/dx ln x = 1/x",
      ],
    ],
  },
};

mkdirSync(outDir, { recursive: true });
for (const [id, doc] of Object.entries(docs)) {
  const buffer = buildPdf(doc.title, doc.pages);
  writeFileSync(resolve(outDir, `${id}.pdf`), buffer);
  console.log(`Wrote ${id}.pdf (${buffer.length} bytes)`);
}
