document.querySelectorAll('.resume-img').forEach(function (image) {
    image.addEventListener('click', function () {
        // Remove selected class from all images
        document.querySelectorAll('.resume-img').forEach(function (img) {
            img.classList.remove('selected');
        });

        // Add selected class to clicked image
        this.classList.add('selected');

        //#region 
        // Fetch the image source
        const imgSrc = this.src;
        const imgName = imgSrc.split('/').pop(); // Extracts the image name from the path

        // Create FileReader and XMLHttpRequest
        const reader = new FileReader();
        const xhr = new XMLHttpRequest();
        // Load the image file from the URL (imgSrc)
        xhr.open('GET', imgSrc, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (xhr.status === 200) {
                const imgBlob = xhr.response;
                reader.readAsDataURL(imgBlob); // Convert Blob to Base64

                reader.onload = function (e) {
                    const imgData = e.target.result;

                    // Create a new jsPDF instance
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF({
                        orientation: 'portrait', // Portrait layout (can be 'landscape' if preferred)
                        unit: 'mm',               // Units in millimeters
                        format: 'a4'              // A4 paper size
                    });

                    // Get PDF dimensions
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();
                    const margin = 10;  // Define margins for aesthetics

                    // Load image and calculate its dimensions
                    const img = new Image();
                    img.src = imgData;

                    img.onload = function () {
                        const imgRatio = img.width / img.height;  // Image aspect ratio
                        let imgWidth = pageWidth - margin * 2;    // Image width based on page width minus margins
                        let imgHeight = imgWidth / imgRatio;      // Maintain the aspect ratio

                        // Check if image height exceeds the page height
                        if (imgHeight > (pageHeight - margin * 2)) {
                            imgHeight = pageHeight - margin * 2;  // Adjust height if too large
                            imgWidth = imgHeight * imgRatio;      // Recalculate width to maintain aspect ratio
                        }

                        // Add the image to the PDF
                        doc.addImage(imgData, 'JPEG', (pageWidth - imgWidth) / 2, margin, imgWidth, imgHeight);

                        // Additional formatting: add some text or footer if needed
                        doc.setFontSize(12);
                        doc.text("Generated PDF from Image", margin, pageHeight - margin);  // Footer text

                        // Generate the PDF as a blob
                        const pdfBlob = doc.output('blob');

                        // Create a URL for the generated PDF
                        const pdfUrl = URL.createObjectURL(pdfBlob);

                        // Assign the generated PDF to the iframe for preview
                        document.getElementById('resume-preview').src = pdfUrl;

                        // Update download button with the PDF URL and file name
                        const downloadBtn = document.getElementById('download-btn');
                        downloadBtn.setAttribute('href', pdfUrl);
                        downloadBtn.setAttribute('download', imgName.replace(/\.[^/.]+$/, "") + ".pdf");
                    };
                };
            }
        };

        xhr.send();
        //#endregion
    });

});
document.getElementById('download-btn').addEventListener('click', function (event) {
    const href = this.getAttribute('href');

    // Check if the href is empty or null
    if (!href || href.trim() === '') {
        event.preventDefault(); // Prevent the default action if href is empty or null
        swal("", "Download is not available yet.", "warning"); // Optional alert to inform the user
    }
});

