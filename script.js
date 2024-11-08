var _a;
// Handle form submission
(_a = document.getElementById('cvForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b;
    event.preventDefault();
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var age = document.getElementById('age').value;
    var about = document.getElementById('about').value;
    var objective = document.getElementById('objective').value;
    var skills = document.getElementById('skills').value.split(',');
    var hobbies = document.getElementById('hobbies').value.split(',');
    var education = document.getElementById('education').value.split(',');
    // Populate CV fields
    document.getElementById('cvName').textContent = name;
    document.getElementById('cvEmail').textContent = "Email: ".concat(email);
    document.getElementById('cvPhone').textContent = "Phone: ".concat(phone);
    document.getElementById('cvAge').textContent = "Age: ".concat(age);
    document.getElementById('cvAbout').textContent = about;
    document.getElementById('cvObjective').textContent = objective;
    // Dynamically add education
    var educationList = document.getElementById('cvEducation');
    educationList.innerHTML = ''; // Clear existing content
    education.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.trim();
        educationList.appendChild(li);
    });
    // Add skills dynamically
    var skillsList = document.getElementById('cvSkills');
    skillsList.innerHTML = ''; // Clear existing content
    skills.forEach(function (skill) {
        var li = document.createElement('li');
        li.textContent = skill.trim();
        skillsList.appendChild(li);
    });
    // Add hobbies dynamically
    var hobbiesList = document.getElementById('cvHobbies');
    hobbiesList.innerHTML = ''; // Clear existing content
    hobbies.forEach(function (hobby) {
        var li = document.createElement('li');
        li.textContent = hobby.trim();
        hobbiesList.appendChild(li);
    });
    // Handle image update
    var imageFile = (_b = (_a = document.getElementById('profileImage')) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var img = document.getElementById('cvProfileImage');
            img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(imageFile);
    }
    // Hide the form and show the CV
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('resumeContainer').style.display = 'block';
    document.getElementById('toggleBtn').style.display = 'block';
});
// Toggle CV visibility
function toggleResume() {
    var resume = document.getElementById('resumeContainer');
    var toggleBtn = document.getElementById('toggleBtn');
    if (resume.style.display === 'none' || resume.style.display === '') {
        resume.style.display = 'block';
        toggleBtn.textContent = 'Hide CV';
    }
    else {
        resume.style.display = 'none';
        toggleBtn.textContent = 'Show CV';
    }
}
// Edit Resume
function editResume() {
    // Show the form and hide the CV
    document.querySelector('.form-container').style.display = 'block';
    document.getElementById('resumeContainer').style.display = 'none';
    document.getElementById('toggleBtn').style.display = 'none';
}

function shareResume() {
    const name = document.getElementById("name").value.replace(/\s+/g, '').toLowerCase();
    const userURL = `https://${name}.vercel.app/resume`;
    navigator.clipboard.writeText(userURL)
        .then(() => alert("Resume link copied to clipboard: " + userURL))
        .catch(error => console.error("Copy failed", error));
}

// Download Resume as PDF

function downloadPDF() {
    // Get the buttons to hide
    const editBtn = document.getElementById("editBtn");
    const shareBtn = document.querySelector("button[onclick='shareResume()']");
    const downloadBtn = document.querySelector("button[onclick='downloadPDF()']");
    
    // Hide the buttons
    editBtn.style.display = "none";
    shareBtn.style.display = "none";
    downloadBtn.style.display = "none";
    
    const resumeContainer = document.getElementById("resumeContainer");
    const name = document.getElementById("name").value || "resume"; // Use CV name if provided

    const options = {
        margin:       0.5,
        filename:     `${name}_resume.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    // Generate and download the PDF
    html2pdf()
        .set(options)
        .from(resumeContainer)
        .save()
        .then(() => {
            // Show the buttons again after PDF is generated
            editBtn.style.display = "inline-block";
            shareBtn.style.display = "inline-block";
            downloadBtn.style.display = "inline-block";
        });
}
