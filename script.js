// all issue
let allIssues = [];

// tab
let currentTab = "all";

//LOGIN

function handleLogin() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  // console.log(username, password);

  if (username === "admin" && password === "admin123") {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("login-error").classList.add("hidden");
    loadAllIssues();
  } else {
    document.getElementById("login-error").classList.remove("hidden");
  }
}
// enter press to login
document
  .getElementById("password-input")
  .addEventListener("keydown", function (key) {
    if (key.key === "Enter") {
      handleLogin();
    }
  });

  // ISSUES LOADED HERE
async function loadAllIssues() {
  showSpinner();

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  // console.log(data);
  allIssues = data.data || data.issues || data;
  // console.log(allIssues);
  hideSpinner();
  updateStatusCount();
  showIssues(allIssues);
}
// ISSUES SHOW HERE
function showIssues(issues) {
  const grid = document.getElementById("cards-grid");
  const countText = document.getElementById("issues-count-text");

  grid.innerHTML = "";
  countText.textContent = issues.length + " Issues";

  if (issues.length === 0) {
    grid.innerHTML =
      "<p class='text-center py-10 text-gray-400'>No issues found</p>";
    return;
  }

  issues.forEach(function (issue) {
    // console.log(issue);
    const card = createCard(issue);
    grid.appendChild(card);
  });
}


//CARD MADE
function createCard(issue) {
  const card = document.createElement("div");
  const status = issue.status;
  const priority = issue.priority;
  const issueId = issue.id;
  const author = issue.author;
  const title = issue.title;
  const description = issue.description;
  const date = formatDate(issue.createdAt);

  // console.log(issueId, title, status, priority);

  // labels array koro
  let labels = issue.labels;
  if (!Array.isArray(labels)) {
    labels = [labels];
  }
  // console.log(labels);

  // if open then green if closed then purple
  if (status.toLowerCase() === "open") {
    card.className = "issue-card card-open";
  } else {
    card.className = "issue-card card-closed";
  }
  // priority color
  let priorityBg = "#f3f4f6";
  let priorityText = "#6b7280";
  if (priority.toUpperCase() === "HIGH") {
    priorityBg = "#ffedd5";
    priorityText = "#ea580c";
  } else if (priority.toUpperCase() === "MEDIUM") {
    priorityBg = "#fef9c3";
    priorityText = "#ca8a04";
  } else if (priority.toUpperCase() === "LOW") {
    priorityBg = "#f3f4f6";
    priorityText = "#6b7280";
  }

  // if open green dot, if closed purple dot
  let dotColor = "#22c55e";
  if (status.toLowerCase() === "closed") {
    dotColor = "#a855f7";
  }

  // labels html create here
  let labelsHTML = "";
  labels.forEach(function (label) {
    let lBg = "#f3f4f6";
    let lText = "#374151";
    if (label.toUpperCase() === "BUG") {
      lBg = "#fee2e2";
      lText = "#dc2626";
    } else if (label.toUpperCase() === "HELP WANTED") {
      lBg = "#f3e8ff";
      lText = "#9333ea";
    } else if (label.toUpperCase() === "ENHANCEMENT") {
      lBg = "#dcfce7";
      lText = "#16a34a";
    } else if (label.toUpperCase() === "GOOD FIRST ISSUE") {
      lBg = "#dbeafe";
      lText = "#2563eb";
    } else if (label.toUpperCase() === "DOCUMENTATION") {
      lBg = "#fef3c7";
      lText = "#d97706";
    }
    labelsHTML += `<span style="background:${lBg}; color:${lText}; font-size:10px; font-weight:700; padding:2px 8px; border-radius:20px;">${label}</span>`;
  });
  card.innerHTML = `
        <div class="flex justify-between items-center">
            <span class="w-2.5 h-2.5 rounded-full inline-block" style="background:${dotColor};"></span>
            <span style="background:${priorityBg}; color:${priorityText}; font-size:10px; font-weight:700; padding:2px 8px; border-radius:20px;">${priority}</span>
        </div>

        <h3 class="font-bold text-md text-gray-900 leading-snug">${title}</h3>

        <p class="text-sm text-gray-500 leading-relaxed line-clamp-2">${description}</p>

        <div class="flex gap-1 flex-wrap">${labelsHTML}</div>

        <div class="text-sm text-gray-400 border-t border-gray-100 pt-2">
            #${issueId} by ${author} <br> ${date}
        </div>
    `;


    