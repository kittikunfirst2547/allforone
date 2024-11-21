let emails = []; // Array to store email objects
let inboxemails = [
  { from: "alice@gmail.com", date: "2024-01-01", subject: "Hello!", read: false },
  { from: "bob@gmail.com", date: "2024-01-02", subject: "Meeting Reminder", read: false },
  { from: "charlie@gmail.com", date: "2024-01-03", subject: "Invoice Attached", read: false },
  { from: "david@gmail.com", date: "2024-01-04", subject: "New Project Proposal", read: false },
  { from: "emily@gmail.com", date: "2024-01-05", subject: "Happy New Year!", read: false },
  { from: "frank@gmail.com", date: "2024-01-06", subject: "Weekly Report", read: false },
  { from: "george@gmail.com", date: "2024-01-07", subject: "Feedback on Presentation", read: false },
  { from: "hannah@gmail.com", date: "2024-01-08", subject: "Birthday Invitation", read: false },
  { from: "irene@gmail.com", date: "2024-01-09", subject: "Follow-up Meeting", read: false },
  { from: "jack@gmail.com", date: "2024-01-10", subject: "Travel Itinerary", read: false },
  { from: "karen@gmail.com", date: "2024-01-11", subject: "Project Deadline", read: false },
  { from: "leo@gmail.com", date: "2024-01-12", subject: "Check this out!", read: false },
  { from: "mary@gmail.com", date: "2024-01-13", subject: "Lunch Meeting", read: false },
  { from: "nancy@gmail.com", date: "2024-01-14", subject: "Monthly Newsletter", read: false },
  { from: "oliver@gmail.com", date: "2024-01-15", subject: "Invoice Due", read: false },
  { from: "paul@gmail.com", date: "2024-01-16", subject: "Performance Review", read: false },
  { from: "oliver@gmail.com", date: "2024-01-15", subject: "Invoice Due", read: false },
  { from: "paul@gmail.com", date: "2024-01-16", subject: "Performance Review", read: false }
];
let trashemails = [];

// ====================================render program=========================================================

function renderEmailList(emails) {
  const emailList = document.getElementById("emails");
  emailList.innerHTML = "";
  emails.forEach((email, index) => {
    const emailItem = document.createElement("li");
    emailItem.classList.add(email.read ? "read" : "unread");
    
    const Info = document.createElement("div");
    emailItem.innerHTML = `
      <span><strong>Subject:</strong> ${email.subject}</span>
      <div class="info">
        <span><strong>From:</strong> ${email.from}</span>
      </div        
      <div class="info">
      <span><strong>Date:</strong> ${email.date}</span>
      </div>
    `;
    emailItem.onclick = () => viewEmail(emails.indexOf(email), index);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-icon");
    deleteButton.textContent = "";
    deleteButton.innerHTML = '<span><ion-icon name="trash-outline"></ion-icon></span>';
    deleteButton.onclick = (event) => {
    event.stopPropagation(); // หยุดการกระจายของ event ไปที่ li
    deletesentEmail(emails.indexOf(email), index); // ลบอีเมล
    };
    
    emailList.appendChild(deleteButton);
    emailList.appendChild(Info);
    emailList.appendChild(emailItem);
  });
}

function inboxrenderEmailList(inboxemails) {
  const inboxemailList = document.getElementById("inboxemails");
  inboxemailList.innerHTML = "";
  inboxemails.forEach((inboxemail, inboxindex) => {
    const inboxemailItem = document.createElement("li");
    inboxemailItem.classList.add(inboxemail.read ? "read" : "unread");
    
    const inboxInfo = document.createElement("div");
    inboxemailItem.innerHTML = `
      <span><strong>Subject:</strong> ${inboxemail.subject}</span>
      <div class="info">
        <span><strong>From:</strong> ${inboxemail.from}</span>
      </div        
      <div class="info">
      <span><strong>Date:</strong> ${inboxemail.date}</span>
      </div>
    `;
    inboxemailItem.onclick = () => viewinboxEmail(inboxemails.indexOf(inboxemail),inboxindex);

    const inboxdeleteButton = document.createElement("button");
    inboxdeleteButton.classList.add("delete-icon");
    inboxdeleteButton.textContent = "";
    inboxdeleteButton.innerHTML = '<span><ion-icon name="trash-outline"></ion-icon></span>';
    inboxdeleteButton.onclick = (event) => {
    event.stopPropagation(); // หยุดการกระจายของ event ไปที่ li
    deleteinboxEmail(inboxemails.indexOf(inboxemail)); // ลบอีเมล
    };
    
    inboxemailList.appendChild(inboxdeleteButton);
    inboxemailList.appendChild(inboxInfo);
    inboxemailList.appendChild(inboxemailItem);
  });
}

function trashrenderEmailList() {
  const trashemailList = document.getElementById("trashemails");
  trashemailList.innerHTML = "";
  trashemails.forEach((trashemail, trashindex) => {
    const trashemailItem = document.createElement("li");
    trashemailItem.classList.add(trashemail.read ? "read" : "unread");
    
    const trashInfo = document.createElement("div");
    trashemailItem.innerHTML = `
      <span><strong>Subject:</strong> ${trashemail.subject}</span>
      <div class="info">
        <span><strong>From:</strong> ${trashemail.from}</span>
      </div        
      <div class="info">
      <span><strong>Date:</strong> ${trashemail.date}</span>
      </div>
    `;
    trashemailItem.onclick = () => viewtrashEmail(trashindex);
    
    trashemailList.appendChild(trashInfo);
    trashemailList.appendChild(trashemailItem);
  });
}

// ====================================send program=========================================================

function addEmail(email) {
  if (emails.length < 18) {
    emails.push(email);
    return true;
  } else {
    console.log("Cannot add more emails. Limit reached.");
    return false;
  }
}

// Function to send email
function sendEmail(event) {
  event.preventDefault();
  const to = document.getElementById("to").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  const from = localStorage.getItem('useremail');

  const newEmail = {
    from, 
    to,
    subject,
    message,
    date: new Date().toLocaleString(),
    read: false,
  };

  if (addEmail(newEmail)) {
    renderEmailList(emails);
    document.getElementById("email-form").reset();
    showSent();
    console.log("Initial emails:", emails);
  } else {
    alert("Cannot send email. Email inbox is full.");
  }
}

// ====================================view program=========================================================

// Function to view an email's details
function viewEmail(index) {
  const email = emails[index];
  email.read = true; // Mark email as read
  renderEmailList(emails); // Re-render list to update read status
  
  document.getElementById("email-details").classList.remove("hidden");
  document.getElementById("inboxemail-list").classList.add("hidden");
  document.getElementById("sentemail-list").classList.add("hidden");
  document.getElementById("deleteemail-list").classList.add("hidden");
  document.getElementById("email-content").innerHTML = `
    <div class="container">
      <strong>From:</strong> <p1>${email.from}</p1><br>
      <strong>Date:</strong> <p1>${email.date}</p1><br>
    </div>
    <div class="container">
    <strong>To:</strong> <p1>${email.to}</p1><br>
    </div>
    <div class="container"> 
    <strong>Subject:</strong> <p1>${email.subject}</p1><br>
    </div>
    <strong>Message:</strong> <p>${email.message}</p><br>

    <button onclick="showSent()" class="back-btn"><ion-icon name="arrow-back-outline"></ion-icon></button>
  `;
}

// Function to view an email's details
function viewinboxEmail(inboxindex) {
  const inboxemail = inboxemails[inboxindex];
  inboxemail.read = true; // Mark email as read
  inboxrenderEmailList(inboxemails); // Re-render list to update read status
  
  document.getElementById("email-details").classList.remove("hidden");
  document.getElementById("inboxemail-list").classList.add("hidden");
  document.getElementById("sentemail-list").classList.add("hidden");
  document.getElementById("deleteemail-list").classList.add("hidden");
  document.getElementById("email-content").innerHTML = `
    <div class="container">
      <strong>From:</strong> <p1>${inboxemail.from}</p1><br>
      <strong>Date:</strong> <p1>${inboxemail.date}</p1><br>
    </div>
    <div class="container">
    <strong>To:</strong> <p1>${inboxemail.to}</p1><br>
    </div>
    <div class="container"> 
    <strong>Subject:</strong> <p1>${inboxemail.subject}</p1><br>
    </div>
    <strong>Message:</strong> <p>${inboxemail.message}</p><br>

    <button onclick="showInbox()" class="back-btn"><ion-icon name="arrow-back-outline"></ion-icon></button>
  `;
}

// Function to view an email's details
function viewtrashEmail(trashindex) {
  const trashemail = trashemails[trashindex];
  trashemail.read = true; // Mark email as read
  trashrenderEmailList(); // Re-render list to update read status
  
  document.getElementById("email-details").classList.remove("hidden");
  document.getElementById("inboxemail-list").classList.add("hidden");
  document.getElementById("sentemail-list").classList.add("hidden");
  document.getElementById("deleteemail-list").classList.add("hidden");
  document.getElementById("email-content").innerHTML = `
    <div class="container">
      <strong>From:</strong> <p1>${trashemail.from}</p1><br>
      <strong>Date:</strong> <p1>${trashemail.date}</p1><br>
    </div>
    <div class="container">
    <strong>To:</strong> <p1>${trashemail.to}</p1><br>
    </div>
    <div class="container"> 
    <strong>Subject:</strong> <p1>${trashemail.subject}</p1><br>
    </div>
    <strong>Message:</strong> <p>${trashemail.message}</p><br>

    <button onclick="showTrash()" class="back-btn"><ion-icon name="arrow-back-outline"></ion-icon></button>
  `;
}

// ====================================delete program=========================================================

function addTrashEmail(email) {
  if (trashemails.length < 18) {
    trashemails.push(email);
    return true;
  } else {
    console.log("Cannot move more emails to trash. Trash is full.");
    return false;
  }
}

function deleteinboxEmail(inboxindex) {
  const emailToDelete = { ...inboxemails[inboxindex] };
  if (addTrashEmail(emailToDelete)) {
    inboxemails.splice(inboxindex, 1); // ลบอีเมลจาก inbox ตาม index
    searchEmail(); // อัพเดตการแสดงผลของ inbox
    trashrenderEmailList(); // อัพเดตการแสดงผลของถังขยะ
  } else {
    alert("Cannot move email to trash. Trash is full.");
  }
}

function deletesentEmail(index) {
  const emailToDelete = { ...emails[index] };
  if (addTrashEmail(emailToDelete)) {
    emails.splice(index, 1); // ลบอีเมลจาก inbox ตาม index
    renderEmailList(emails); // อัพเดตการแสดงผลของ inbox
    trashrenderEmailList(); // อัพเดตการแสดงผลของถังขยะ
  } else {
    alert("Cannot move email to trash. Trash is full.");
  }
  console.log("Before delete:", emails);
  console.log("Deleting email at index:", index);
  emails.splice(index, 1);
  console.log("After delete:", emails);
}

function clearTrash() {
  trashemails = []; // ล้างอีเมลทั้งหมดในถังขยะ
  trashrenderEmailList(); // อัพเดตการแสดงผลของถังขยะ
  console.log("Trash has been cleared.");
}

// ====================================show program========================================================= 
// Function to go back to inbox
function showInbox() {
  document.getElementById("compose-email").classList.add("hidden");
  document.getElementById("email-details").classList.add("hidden");
  document.getElementById("sentemail-list").classList.add("hidden");
  document.getElementById("deleteemail-list").classList.add("hidden");
  document.getElementById("inboxemail-list").classList.remove("hidden");
  
  document.getElementById("inboxbtn").classList.add("active")
  document.getElementById("sentbtn").classList.remove("active")
  document.getElementById("trashbtn").classList.remove("active")
}

function showSent() {
  document.getElementById("compose-email").classList.add("hidden");
  document.getElementById("email-details").classList.add("hidden");
  document.getElementById("inboxemail-list").classList.add("hidden");
  document.getElementById("deleteemail-list").classList.add("hidden");
  document.getElementById("sentemail-list").classList.remove("hidden");
  
  document.getElementById("sentbtn").classList.add("active")
  document.getElementById("inboxbtn").classList.remove("active")
  document.getElementById("trashbtn").classList.remove("active")
}

function showTrash() {
  document.getElementById("compose-email").classList.add("hidden");
  document.getElementById("email-details").classList.add("hidden");
  document.getElementById("sentemail-list").classList.add("hidden");
  document.getElementById("inboxemail-list").classList.add("hidden");
  document.getElementById("deleteemail-list").classList.remove("hidden");

  document.getElementById("trashbtn").classList.add("active")
  document.getElementById("sentbtn").classList.remove("active")
  document.getElementById("inboxbtn").classList.remove("active")
}

// Function to show the compose email form
function showCompose() {
  document.getElementById("inboxemail-list").classList.add("hidden");
  document.getElementById("email-details").classList.add("hidden");
  document.getElementById("sentemail-list").classList.add("hidden");
  document.getElementById("deleteemail-list").classList.add("hidden");
  document.getElementById("compose-email").classList.remove("hidden");

  document.getElementById("trashbtn").classList.remove("active")
  document.getElementById("sentbtn").classList.remove("active")
  document.getElementById("inboxbtn").classList.remove("active")
}

// ====================================search program========================================================= 

function searchEmail() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filteredEmails = inboxemails.filter(inboxemail => 
    inboxemail.subject.toLowerCase().includes(input)
  );
  inboxrenderEmailList(filteredEmails); // แสดงรายการอีเมลที่กรองแล้ว
}

function logout() {
  // ลบข้อมูลที่เก็บไว้ใน localStorage หรือ sessionStorage (เช่น การเก็บข้อมูลผู้ใช้)
  localStorage.removeItem('useremail'); // ลบอีเมลจาก localStorage

  // เปลี่ยนหน้าไปยัง Login.html
  window.location.href = "index.html";
}

// Initial call to render email list
renderEmailList(emails);

inboxrenderEmailList(inboxemails);

trashrenderEmailList();



