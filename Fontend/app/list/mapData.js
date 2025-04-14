export const form = ({ formName = "Form Name", formId = "" }) => {
    return `
    <div class="col-md-6 col-xl-4">
        <div class="card">
            <div class="card-header">
                <div class="d-flex">
                    <div class="flex-shrink-0">
                        <i class="bi bi-card-checklist fs-3"></i>
                    </div>
                    <div class="flex-grow-1 mx-3">
                        <h6 class="mb-1">${formName}</h6>
                        <p class="text-muted text-sm mb-0">Category</p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex align-items-center justify-content-between">
                    <a href="/dashboard/form.html?form=${formId}" class="btn btn-sm btn-outline-primary">Edit</a>
                    <button onclick="deleteForm('${formId}')" class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `;
};
