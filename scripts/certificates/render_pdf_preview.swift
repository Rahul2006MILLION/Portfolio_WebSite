// Renders every page of a PDF to PNG with macOS PDFKit and prints its text (used to verify the
// certificate facts and to make the preview images in public/certificates; the PDFs are untouched).
//   swiftc -O render_pdf_preview.swift -o render && ./render cert.pdf out/prefix 3.0
//   cwebp -q 86 out/prefix-p1.png -o cert.webp && cwebp -q 80 -resize 900 0 out/prefix-p1.png -o cert-thumb.webp

import PDFKit
import AppKit
let args = CommandLine.arguments
let url = URL(fileURLWithPath: args[1]); let out = args[2]; let scale = CGFloat(Double(args[3]) ?? 2.0)
guard let doc = PDFDocument(url: url) else { print("FAILED TO OPEN"); exit(1) }
print("pages:", doc.pageCount, "encrypted:", doc.isEncrypted, "locked:", doc.isLocked)
for i in 0..<doc.pageCount {
  let p = doc.page(at: i)!
  let b = p.bounds(for: .mediaBox)
  print("--- page \(i+1) size \(Int(b.width))x\(Int(b.height))")
  print(p.string ?? "")
  let w = Int(b.width*scale), h = Int(b.height*scale)
  let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
  NSGraphicsContext.saveGraphicsState()
  let ctx = NSGraphicsContext(bitmapImageRep: rep)!; NSGraphicsContext.current = ctx
  let cg = ctx.cgContext
  cg.setFillColor(NSColor.white.cgColor); cg.fill(CGRect(x:0,y:0,width:w,height:h))
  cg.scaleBy(x: scale, y: scale); cg.translateBy(x: -b.origin.x, y: -b.origin.y)
  p.draw(with: .mediaBox, to: cg)
  NSGraphicsContext.restoreGraphicsState()
  try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(out)-p\(i+1).png"))
}
