// Function to add a new Work Experience field
function addNewWEField(): void {
    const newNode: HTMLTextAreaElement = document.createElement("textarea");
    newNode.classList.add("form-control", "weField", "mt-2");
    newNode.setAttribute("rows", "3");
    newNode.setAttribute("placeholder", "Enter here");
    const weOb: HTMLElement | null = document.getElementById("we");
    const weAddButtonOb: HTMLElement | null = document.getElementById("weAddButton");
    if (weOb && weAddButtonOb) {
        weOb.insertBefore(newNode, weAddButtonOb);
    } else {
        console.error("Element not found for Work Experience");
    }
}

// Function to add a new Academic Qualification field
function addNewAQField(): void {
    const newNode: HTMLTextAreaElement = document.createElement("textarea");
    newNode.classList.add("form-control", "aqField", "mt-2");
    newNode.setAttribute("rows", "3");
    newNode.setAttribute("placeholder", "Enter here");
    const aqOb: HTMLElement | null = document.getElementById("aq");
    const aqAddButtonOb: HTMLElement | null = document.getElementById("aqAddButton");
    if (aqOb && aqAddButtonOb) {
        aqOb.insertBefore(newNode, aqAddButtonOb);
    } else {
        console.error("Element not found for Academic Qualification");
    }
}

// Function to add a new Skills field
function addNewSkillsField(): void {
    const newNode: HTMLTextAreaElement = document.createElement("textarea");
    newNode.classList.add("form-control", "skillField", "mt-2");
    newNode.setAttribute("rows", "3");
    newNode.setAttribute("placeholder", "Enter here");
    const skillsOb: HTMLElement | null = document.getElementById("skills");
    const skillsAddButtonOb: HTMLElement | null = document.getElementById("skillsAddButton");
    if (skillsOb && skillsAddButtonOb) {
        skillsOb.insertBefore(newNode, skillsAddButtonOb);
    } else {
        console.error("Element not found for Skills");
    }
}

// Function to validate form fields
function validateFields(): boolean {
    let isValid = true;
    const fields: { id: string; message: string }[] = [
        { id: "nameField", message: "Name is required" },
        { id: "contactField", message: "Contact information is required" },
        { id: "addressField", message: "Address is required" },
        { id: "objectiveField", message: "Objective is required" }
    ];
    fields.forEach(field => {
        const element: HTMLInputElement | HTMLTextAreaElement | null = document.getElementById(field.id) as HTMLInputElement | HTMLTextAreaElement;
        if (element && !element.value.trim()) {
            alert(field.message);
            isValid = false;
        }
    });
    return isValid;
}

// Function to generate CV
function generateCV(): void {
    if (!validateFields()) {
        return; // Stop processing if validation fails
    }

    // Update sections with form values
    const nameField: string = (document.getElementById("nameField") as HTMLInputElement).value;
    (document.getElementById("nameT1") as HTMLElement).innerHTML = nameField;
    (document.getElementById("nameT2") as HTMLElement).innerHTML = nameField;

    const contactField: string = (document.getElementById("contactField") as HTMLInputElement).value;
    (document.getElementById("contactT") as HTMLElement).innerHTML = contactField;

    const addressField: string = (document.getElementById("addressField") as HTMLInputElement).value;
    (document.getElementById("addressT") as HTMLElement).innerHTML = addressField;

    const fbField: string = (document.getElementById("fbField") as HTMLInputElement).value;
    (document.getElementById("fbT") as HTMLElement).innerHTML = fbField;

    const instaField: string = (document.getElementById("instaField") as HTMLInputElement).value;
    (document.getElementById("instaT") as HTMLElement).innerHTML = instaField;

    const linkedField: string = (document.getElementById("linkedField") as HTMLInputElement).value;
    (document.getElementById("linkedT") as HTMLElement).innerHTML = linkedField;

    const objectiveField: string = (document.getElementById("objectiveField") as HTMLInputElement).value;
    (document.getElementById("objectiveT") as HTMLElement).innerHTML = objectiveField;

    // Work Experience
    const wes: HTMLCollectionOf<HTMLTextAreaElement> = document.getElementsByClassName("weField") as HTMLCollectionOf<HTMLTextAreaElement>;
    let weStr: string = "";
    for (let i = 0; i < wes.length; i++) {
        const weField: HTMLTextAreaElement = wes[i];
        if (weField.value.trim()) {
            weStr += `<li>${weField.value}</li>`;
        }
    }
    (document.getElementById("weT") as HTMLElement).innerHTML = weStr;

    // Academic Qualification
    const aqs: HTMLCollectionOf<HTMLTextAreaElement> = document.getElementsByClassName("aqField") as HTMLCollectionOf<HTMLTextAreaElement>;
    let aqStr: string = "";
    for (let i = 0; i < aqs.length; i++) {
        const aqField: HTMLTextAreaElement = aqs[i];
        if (aqField.value.trim()) {
            aqStr += `<li>${aqField.value}</li>`;
        }
    }
    (document.getElementById("aqT") as HTMLElement).innerHTML = aqStr;

    // Skills
    const skills: HTMLCollectionOf<HTMLTextAreaElement> = document.getElementsByClassName("skillField") as HTMLCollectionOf<HTMLTextAreaElement>;
    let skillStr: string = "";
    for (let i = 0; i < skills.length; i++) {
        const skillField: HTMLTextAreaElement = skills[i];
        if (skillField.value.trim()) {
            skillStr += `<li>${skillField.value}</li>`;
        }
    }
    (document.getElementById("skillsT") as HTMLElement).innerHTML = skillStr;

    // Code for setting image
    const fileInput: HTMLInputElement | null = document.getElementById("imgField") as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file: File = fileInput.files[0];
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            (document.getElementById("imgTemplate") as HTMLImageElement).src = reader.result as string;
        }
    }

    // Hide the form and show the generated CV template
    (document.getElementById("cv-form") as HTMLElement).style.display = "none";
    (document.getElementById("cv-template") as HTMLElement).style.display = "block";

    // Enable editing on the CV template
    enableEditing();
}

// Function to enable editing on CV template
function enableEditing(): void {
    const editableSections: HTMLElement[] = [
        document.getElementById("nameT1") as HTMLElement,
        document.getElementById("contactT") as HTMLElement,
        document.getElementById("addressT") as HTMLElement,
        document.getElementById("objectiveT") as HTMLElement,
        document.getElementById("weT") as HTMLElement,
        document.getElementById("aqT") as HTMLElement,
        document.getElementById("skillsT") as HTMLElement
    ];
    
    editableSections.forEach(section => {
        if (section) {
            section.contentEditable = "true";
            section.addEventListener("input", () => {
                updateGeneratedContent(section);
            });
        }
    });
}

// Function to update generated content
function updateGeneratedContent(section: HTMLElement): void {
    const id: string = section.id;
    const value: string = section.innerHTML;

    // Find corresponding form field
    const formFieldId: string = id.replace('T', 'Field');
    const formField: HTMLInputElement | HTMLTextAreaElement | null = document.getElementById(formFieldId) as HTMLInputElement | HTMLTextAreaElement;

    if (formField) {
        formField.value = value;
    }
}

// Function to print CV
function printCV(): void {
    window.print();
}
