function loadExample() {
  const exampleNotes = `We talked about redesigning the onboarding flow. Priya thinks the first screen has too much text and users may skip it. Alex said engineering needs final copy by Friday. We may need another version for new users versus returning users. Saisha will mock up the empty state. Jordan will review accessibility contrast. Still need to decide whether the progress indicator should stay at the top. Risk: copy may not be ready before engineering handoff.`;

  document.getElementById("meetingNotes").value = exampleNotes;
}

function generateBrief() {
  const meetingType = document.getElementById("meetingType").value;
  const notes = document.getElementById("meetingNotes").value.trim();

  if (!notes) {
    alert("Please paste meeting notes first.");
    return;
  }

  document.getElementById("outputPanel").classList.remove("hidden");
  document.getElementById("meetingTag").textContent = meetingType;
  document.getElementById("briefTitle").textContent = `${meetingType} Action Brief`;

  const lowerNotes = notes.toLowerCase();

  const summary = createSummary(meetingType, lowerNotes);
  const decisions = extractDecisions(lowerNotes);
  const actions = extractActions(lowerNotes);
  const questions = extractQuestions(lowerNotes);
  const risks = extractRisks(lowerNotes);
  const followUp = createFollowUp(meetingType, decisions, actions, questions, risks);

  document.getElementById("summaryOutput").textContent = summary;
  renderList("decisionsOutput", decisions);
  renderActionList("actionsOutput", actions);
  renderList("questionsOutput", questions);
  renderList("risksOutput", risks);
  document.getElementById("followUpOutput").textContent = followUp;
}

function createSummary(meetingType, notes) {
  if (notes.includes("onboarding")) {
    return `The ${meetingType.toLowerCase()} focused on improving the onboarding experience, reducing friction in the first screen, and clarifying next steps for design, copy, engineering, and accessibility review.`;
  }

  return `The ${meetingType.toLowerCase()} produced several discussion points that were organized into decisions, action items, risks, and open questions.`;
}

function extractDecisions(notes) {
  const decisions = [];

  if (notes.includes("redesign")) {
    decisions.push("Move forward with a redesign of the discussed experience.");
  }

  if (notes.includes("new users") || notes.includes("returning users")) {
    decisions.push("Explore separate experiences for new and returning users.");
  }

  if (notes.includes("final copy")) {
    decisions.push("Prioritize finalizing product copy before engineering handoff.");
  }

  if (decisions.length === 0) {
    decisions.push("No explicit decisions detected. The team should confirm decisions in the next follow-up.");
  }

  return decisions;
}

function extractActions(notes) {
  const actions = [];

  if (notes.includes("saisha")) {
    actions.push({
      owner: "Saisha",
      task: "Create the next design mockup or empty state exploration.",
      priority: "High"
    });
  }

  if (notes.includes("alex")) {
    actions.push({
      owner: "Alex",
      task: "Confirm engineering timeline and handoff requirements.",
      priority: "High"
    });
  }

  if (notes.includes("priya")) {
    actions.push({
      owner: "Priya",
      task: "Review first-screen copy and identify areas that feel too dense.",
      priority: "Medium"
    });
  }

  if (notes.includes("jordan") || notes.includes("accessibility")) {
    actions.push({
      owner: "Jordan",
      task: "Review accessibility contrast and flag any usability issues.",
      priority: "Medium"
    });
  }

  if (actions.length === 0) {
    actions.push({
      owner: "Team",
      task: "Assign clear owners for each next step.",
      priority: "High"
    });
  }

  return actions;
}

function extractQuestions(notes) {
  const questions = [];

  if (notes.includes("need to decide") || notes.includes("still need to decide")) {
    questions.push("What decision still needs to be made before the team can move forward?");
  }

  if (notes.includes("progress indicator")) {
    questions.push("Should the progress indicator remain at the top of the onboarding flow?");
  }

  if (notes.includes("new users") || notes.includes("returning users")) {
    questions.push("How should the experience differ for new users versus returning users?");
  }

  if (questions.length === 0) {
    questions.push("No open questions detected. The team should still confirm alignment before execution.");
  }

  return questions;
}

function extractRisks(notes) {
  const risks = [];

  if (notes.includes("risk")) {
    risks.push("A timeline or handoff risk was mentioned and should be tracked.");
  }

  if (notes.includes("friday")) {
    risks.push("The Friday deadline may create pressure for design, copy, or engineering handoff.");
  }

  if (notes.includes("too much text")) {
    risks.push("The current experience may create cognitive overload for users.");
  }

  if (notes.includes("accessibility")) {
    risks.push("Accessibility issues may affect usability if not reviewed before launch.");
  }

  if (risks.length === 0) {
    risks.push("No major risks detected, but ownership and deadlines should be confirmed.");
  }

  return risks;
}

function createFollowUp(meetingType, decisions, actions, questions, risks) {
  const actionText = actions
    .map(action => `${action.owner}: ${action.task}`)
    .join(" ");

  return `Thanks everyone — here is the action brief from our ${meetingType.toLowerCase()}. Key decisions: ${decisions.join(" ")} Next steps: ${actionText} Open questions: ${questions.join(" ")} Risks to watch: ${risks.join(" ")}`;
}

function renderList(elementId, items) {
  const list = document.getElementById(elementId);
  list.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderActionList(elementId, actions) {
  const list = document.getElementById(elementId);
  list.innerHTML = "";

  actions.forEach(action => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="priority">${action.priority}</span><strong>${action.owner}</strong>: ${action.task}`;
    list.appendChild(li);
  });
}

function copyFollowUp() {
  const text = document.getElementById("followUpOutput").textContent;
  navigator.clipboard.writeText(text);
  alert("Follow-up message copied.");
}