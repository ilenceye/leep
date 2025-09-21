/**
 * Trigger a download of a text-based file in the browser.
 *
 * This function creates a temporary `<a>` element, generates a Blob URL
 * from the given content, and programmatically clicks the link to prompt
 * the user to download the file.
 *
 * @param options - Options for the file download.
 * @param options.content - The text content of the file.
 * @param options.filename - The name of the file to be downloaded (including extension).
 * @param options.type - The MIME type of the file content (e.g. "text/plain", "application/json").
 *
 * @example
 * downloadFile({
 *   content: "Hello, world!",
 *   filename: "hello.txt",
 *   type: "text/plain",
 * });
 */
export function downloadFile({
  content,
  filename,
  type,
}: {
  content: string;
  filename: string;
  type: string;
}) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
