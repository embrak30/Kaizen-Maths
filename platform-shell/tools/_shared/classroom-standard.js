(() => {
  const VERSION = "1.1.0";
  const root = document.documentElement;
  if (root.dataset.kaizenClassroomStandard === VERSION) return;
  root.dataset.kaizenClassroomStandard = VERSION;
  root.classList.add("kaizen-classroom-standard");

  const CONTROL_HOSTS = ".controls, .toolbar";
  const ACTION_HOSTS = [
    ".toolbar .button-row",
    ".controls > .action-buttons",
    ".controls > .button-row",
    ".actions",
    ".action-buttons"
  ].join(",");
  const TIMER_HOSTS = ".timer-section, .timerWrap";

  function textOf(element) {
    return (element?.textContent || element?.value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function isConnectedVisible(element) {
    if (!element || !element.isConnected) return false;
    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  function unique(elements) {
    return [...new Set(elements.filter(Boolean))];
  }

  function closestControlHost(element) {
    return element?.closest?.(CONTROL_HOSTS);
  }

  function tagButton(button) {
    if (!button || button.dataset.kaizenAction) return;
    const label = textOf(button).toLowerCase();
    const id = (button.id || "").toLowerCase();
    const joined = `${label} ${id}`;
    let action = "default";

    if (/^(new|generate)\b/.test(label) || /generate|new/.test(id)) action = "new";
    else if (/answer|solution|show all/.test(joined)) action = "answers";
    else if (/step|hint|worked/.test(joined)) action = "steps";
    else if (/capture/.test(joined)) action = "capture";
    else if (/stop|end/.test(joined)) action = "stop";
    else if (/practice|example|mode/.test(joined)) action = "mode";
    else if (/\b(2|min|5|min|timer|time)\b/.test(joined)) action = "timer";

    button.dataset.kaizenAction = action;
  }

  function tagButtons(rootElement = document) {
    rootElement.querySelectorAll("button, input[type='button']").forEach(tagButton);
  }

  function isMeaningfullyEmpty(element) {
    if (!element) return true;
    return ![...element.childNodes].some((node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim();
      if (node.nodeType !== Node.ELEMENT_NODE) return false;
      return !node.classList.contains("kaizen-standard-empty");
    });
  }

  function markEmptyHosts(hosts) {
    hosts.forEach((host) => {
      if (isMeaningfullyEmpty(host)) host.classList.add("kaizen-standard-empty");
    });
  }

  function insertBeforeFirstHost(container, firstHost, bar) {
    if (firstHost?.parentElement) {
      firstHost.parentElement.insertBefore(bar, firstHost);
      return;
    }
    const header = container.querySelector(".tabs, .header");
    if (header?.parentElement === container) {
      header.insertAdjacentElement("afterend", bar);
      return;
    }
    container.prepend(bar);
  }

  function findContainer(firstHost) {
    return firstHost?.closest(".container, main, .app, #game-container") ||
      document.querySelector(".container, main, .app, #game-container") ||
      document.body;
  }

  function collectStandardPieces() {
    const hosts = unique([...document.querySelectorAll(CONTROL_HOSTS)])
      .filter((host) => !host.closest(".sidebar, .modal-content, .teacher-panel"));
    if (!hosts.length) return null;

    const firstHost = hosts[0];
    const levelInfo = document.querySelector(".level-info");
    const typeControl = document.querySelector(".type-control");
    const dropdown = document.querySelector(".dropdown-container");
    const timerHost = document.querySelector(TIMER_HOSTS);

    const actionHosts = unique([...document.querySelectorAll(ACTION_HOSTS)])
      .filter((host) => {
        if (!isConnectedVisible(host)) return false;
        if (timerHost && host === timerHost) return false;
        if (timerHost && timerHost.contains(host)) return false;
        if (host.closest(".sidebar, .modal-content, .teacher-panel")) return false;
        if (host.closest(".kaizen-standard-controlbar")) return false;
        return [...host.querySelectorAll("button, input[type='button']")]
          .some((button) => isConnectedVisible(button));
      });

    const hasContext = levelInfo || typeControl || dropdown;
    const hasActions = actionHosts.length > 0;
    const hasTimer = timerHost && isConnectedVisible(timerHost);
    if (!hasContext && !hasActions && !hasTimer) return null;

    return { hosts, firstHost, levelInfo, typeControl, dropdown, timerHost, actionHosts };
  }

  function standardizeControls() {
    if (document.querySelector(".kaizen-standard-controlbar")) {
      tagButtons(document.querySelector(".kaizen-standard-controlbar"));
      return;
    }

    const pieces = collectStandardPieces();
    if (!pieces) {
      tagButtons();
      return;
    }

    const { hosts, firstHost, levelInfo, typeControl, dropdown, timerHost, actionHosts } = pieces;
    const container = findContainer(firstHost);

    const bar = document.createElement("section");
    bar.className = "kaizen-standard-controlbar";
    bar.setAttribute("aria-label", "Classroom controls");

    const context = document.createElement("div");
    context.className = "kaizen-control-context";
    const actions = document.createElement("div");
    actions.className = "kaizen-control-actions";
    const timer = document.createElement("div");
    timer.className = "kaizen-control-timer";

    if (levelInfo) context.appendChild(levelInfo);
    if (typeControl && typeControl !== levelInfo) context.appendChild(typeControl);
    if (dropdown && dropdown !== typeControl && !typeControl?.contains(dropdown)) context.appendChild(dropdown);

    actionHosts.forEach((host) => {
      if (!host.closest(".kaizen-standard-controlbar")) actions.appendChild(host);
    });

    if (timerHost && !timerHost.closest(".kaizen-standard-controlbar")) timer.appendChild(timerHost);

    bar.append(context, actions, timer);
    insertBeforeFirstHost(container, firstHost, bar);
    tagButtons(bar);
    markEmptyHosts(hosts);

    document.body.classList.add("kaizen-standardized-controls");
  }

  function scheduleStandardize() {
    window.requestAnimationFrame(() => {
      standardizeControls();
      window.requestAnimationFrame(() => tagButtons());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleStandardize, { once: true });
  } else {
    scheduleStandardize();
  }

  window.addEventListener("load", scheduleStandardize, { once: true });

  const observer = new MutationObserver((mutations) => {
    if (!mutations.some((mutation) => mutation.addedNodes.length)) return;
    tagButtons();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
