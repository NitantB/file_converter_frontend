async function convertPDF() {
  const file = document.getElementById("file").files[0];
  const status = document.getElementById("status");
  if (!file) {
    status.innerText = "Please upload a PDF file.";
    return;
  }

  status.innerText = "Uploading and converting...";

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://file-converter-backend-snhe.onrender.com", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.docx";
    a.click();
    status.innerText = "Download ready!";
  } else {
    status.innerText = "Conversion failed. Please try again.";
  }
}
