export const form = ({ formName = "Form Name", formId = "", formHtml = "" }) => {
    return `
    <div class="col-md-6 col-xl-4">
        <div class="card">
            <div class="card-header">
                <div class="d-flex">
                    <div class="flex-grow-1 mx-3">
                        <h6 class="mb-1">${formName}</h6>
                        <p class="text-muted text-sm mb-0">Form Preview</p>
                    </div>
                </div>
            </div>
            <div class="card-body p-0" style="height: 250px; overflow: hidden;">
                <iframe
                    srcdoc="
                        <html>
                        <head>
                            <link rel='preconnect' href='https://fonts.googleapis.com'>
                            <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
                            <link href='https://fonts.googleapis.com/css2?family=Poppins&display=swap' rel='stylesheet'>
                            <style>
                                body {
                                    font-family: 'Poppins', sans-serif;
                                    margin: 0;
                                    padding: 10px;
                                    overflow: hidden;
                                }
                                * {
                                    box-sizing: border-box;
                                }
                                .primary { background-color: #0d6df9; color: white; }
                                .secondary { background-color: #6c757d; color: #ffffff; }
                                .success { background-color: #198754; color: white; }
                                .danger { background-color: #dc3545; color: white; }
                                .warning { background-color: #d4a20e; color: black; }
                                .info { background-color: #0dcaf0; color: black; }
                                .light { background-color: white; color: black; }
                                .dark { background-color: #212529; color: black; }
                                .dark:hover { background-color: #bcbcbc; color: white; }
                            </style>
                        </head>
                        <body>
                            ${formHtml.replace(/"/g, '&quot;')}
                        </body>
                        </html>"
                    style="width: 100%; height: 100%; border: none;" scrolling="no"
                ></iframe>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <a href="/dashboard/form.html?form=${formId}" class="btn btn-sm btn-outline-primary">Edit</a>
                <button onclick="deleteForm('${formId}')" class="btn btn-sm btn-outline-danger">Delete</button>
            </div>
        </div>
    </div>
    `;
};
