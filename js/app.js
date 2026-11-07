/* SWAYAM x GUVI Interactive Controller, Smart Consistency Notifications & Multi-Layer Session Persistence */
// =========================================================================
// APPLICATION STATE, MULTI-LAYER PERSISTENCE & CONSISTENCY NOTIFICATION ENGINE
// =========================================================================
    const STORAGE_KEY = "shanjai_swayam_guvi_state_v1";
    const IDB_NAME = "SwayamGuviPlacementDB";
    const IDB_STORE = "session_store";
    const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    function getDefaultState() {
      return {
        selectedWeek: 1,
        activeTab: "curriculum",
        phaseFilter: "all",
        selectedKataIdx: 0,
        completedTasks: {},
        watchedVideos: {},
        quizScores: {},
        quizAnswers: {},
        solvedKatas: {},
        kataSubmissions: {},
        completedMilestones: {},
        customTasks: {},
        notifications: [],
        lastActiveDate: "",
        uiTheme: "light",
        uiDensity: "standard",
        updatedAtEpoch: 0,
        lastSavedLabel: "",
        guviProfile: {
          email: "shanjaikumar2812@gmail.com",
          profileUrl: "https://www.guvi.in/shanjaikumar2812",
          codekataSolved: 45,
          geekCoins: 1250,
          streakDays: 7,
          modules: [
            { id: "gm_1", title: "GUVI x HCL: Data Science and Analytics (Certification)", pct: 100, done: true },
            { id: "gm_2", title: "GUVI x HCL: Data Science Foundation (Certification)", pct: 100, done: true },
            { id: "gm_3", title: "GUVI CodeKata: Python Arrays, Strings & HashMaps Track", pct: 60, done: false },
            { id: "gm_4", title: "GUVI Machine Learning: Decision Trees, Random Forest & XGBoost", pct: 40, done: false },
            { id: "gm_5", title: "GUVI SQLKata: Relational Queries & Window Functions", pct: 55, done: false }
          ]
        }
      };
    }

    let appState = getDefaultState();

    function mergeIntoAppState(parsed) {
      if (!parsed || typeof parsed !== "object") return false;
      const defaults = getDefaultState();
      appState.selectedWeek = Number(parsed.selectedWeek) || defaults.selectedWeek;
      appState.activeTab = parsed.activeTab || defaults.activeTab;
      appState.phaseFilter = parsed.phaseFilter || defaults.phaseFilter;
      appState.selectedKataIdx = Number.isInteger(parsed.selectedKataIdx) ? parsed.selectedKataIdx : defaults.selectedKataIdx;
      appState.uiTheme = parsed.uiTheme || defaults.uiTheme;
      appState.uiDensity = parsed.uiDensity || defaults.uiDensity;
      appState.updatedAtEpoch = Number(parsed.updatedAtEpoch) || appState.updatedAtEpoch || 0;
      appState.lastSavedLabel = parsed.lastSavedLabel || appState.lastSavedLabel || "";
      appState.lastActiveDate = parsed.lastActiveDate || appState.lastActiveDate || "";

      appState.completedTasks = Object.assign({}, defaults.completedTasks, parsed.completedTasks || {});
      appState.watchedVideos = Object.assign({}, defaults.watchedVideos, parsed.watchedVideos || {});
      appState.quizScores = Object.assign({}, defaults.quizScores, parsed.quizScores || {});
      appState.quizAnswers = Object.assign({}, defaults.quizAnswers, parsed.quizAnswers || {});
      appState.solvedKatas = Object.assign({}, defaults.solvedKatas, parsed.solvedKatas || {});
      appState.kataSubmissions = Object.assign({}, defaults.kataSubmissions, parsed.kataSubmissions || {});
      appState.completedMilestones = Object.assign({}, defaults.completedMilestones, parsed.completedMilestones || {});
      appState.customTasks = Object.assign({}, defaults.customTasks, parsed.customTasks || {});

      if (Array.isArray(parsed.notifications)) {
        appState.notifications = parsed.notifications.slice(0, 25);
      }

      if (parsed.guviProfile && typeof parsed.guviProfile === "object") {
        appState.guviProfile = Object.assign({}, defaults.guviProfile, parsed.guviProfile);
        if (!Array.isArray(appState.guviProfile.modules) || appState.guviProfile.modules.length === 0) {
          appState.guviProfile.modules = defaults.guviProfile.modules;
        }
      }
      return true;
    }

    function hasMeaningfulProgress(st) {
      if (!st || typeof st !== "object") return false;
      const tasksDone = Object.keys(st.completedTasks || {}).some(k => st.completedTasks[k]);
      const vidsDone = Object.keys(st.watchedVideos || {}).some(k => st.watchedVideos[k]);
      const quizzesDone = Object.keys(st.quizScores || {}).length > 0 || Object.keys(st.quizAnswers || {}).length > 0;
      const katasDone = Object.keys(st.solvedKatas || {}).some(k => st.solvedKatas[k]) || Object.keys(st.kataSubmissions || {}).length > 0;
      const milesDone = Object.keys(st.completedMilestones || {}).some(k => st.completedMilestones[k]);
      const customsAdded = Object.keys(st.customTasks || {}).some(w => (st.customTasks[w] || []).length > 0);
      return tasksDone || vidsDone || quizzesDone || katasDone || milesDone || customsAdded || Number(st.updatedAtEpoch) > 0;
    }

    // =========================================================================
    // SMART PUSH NOTIFICATION ENGINE (MODULE COMPLETION + SKIPPED-DAY DETECTION)
    // =========================================================================
    function renderNotificationCenter() {
      const listEl = document.getElementById("notif-history-list");
      const badgeEl = document.getElementById("notif-unread-badge");
      if (!listEl || !badgeEl) return;

      const items = appState.notifications || [];
      badgeEl.textContent = String(items.length);

      listEl.innerHTML = "";
      if (items.length === 0) {
        listEl.innerHTML = `<div class="p-4 rounded-xl bg-slate-50 text-xs text-slate-500 text-center">No notifications yet. Complete a module or daily task to receive consistency updates.</div>`;
        return;
      }

      items.forEach(item => {
        const card = document.createElement("div");
        const pillStyle = item.type === "warning"
          ? "bg-amber-50 text-amber-800 border border-amber-200"
          : item.type === "success"
          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
          : "bg-slate-100 text-slate-800";
        card.className = "p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1";
        card.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${pillStyle}">${item.tag}</span>
            <span class="text-[10px] text-slate-400 font-mono">${item.time}</span>
          </div>
          <div class="text-xs font-semibold text-slate-950">${item.title}</div>
          <p class="text-xs text-slate-600 leading-relaxed">${item.message}</p>
        `;
        listEl.appendChild(card);
      });
    }

    function pushConsistencyNotification(opts) {
      const tag = opts.tag || "Consistency Alert";
      const title = opts.title || "Stay Consistent";
      const message = opts.message || "";
      const type = opts.type || "info"; // "success" | "warning" | "info"
      const actionLabel = opts.actionLabel || "";
      const onAction = opts.onAction || null;
      const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      if (!Array.isArray(appState.notifications)) {
        appState.notifications = [];
      }
      appState.notifications.unshift({
        id: "notif_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
        tag,
        title,
        message,
        type,
        time: nowTime
      });
      appState.notifications = appState.notifications.slice(0, 25);
      renderNotificationCenter();

      // 1. Render Apple-style floating push banner in top-right
      const container = document.getElementById("push-banner-container");
      if (container) {
        const banner = document.createElement("div");
        const badgeStyle = type === "warning"
          ? "bg-amber-50 text-amber-800 border border-amber-200"
          : type === "success"
          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
          : "bg-slate-100 text-slate-800";

        banner.className = "apple-notif-card pointer-events-auto rounded-2xl p-4 transition-all duration-300 space-y-2";
        banner.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <span class="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeStyle}">${tag}</span>
            <div class="flex items-center gap-2">
              <span class="text-[10px] text-slate-400 font-mono">now</span>
              <button type="button" class="notif-dismiss-btn text-xs text-slate-400 hover:text-slate-800 font-medium">Dismiss</button>
            </div>
          </div>
          <div class="text-xs sm:text-sm font-semibold text-slate-950">${title}</div>
          <p class="text-xs text-slate-600 leading-relaxed">${message}</p>
          ${actionLabel ? `<div class="pt-1"><button type="button" class="notif-action-btn text-xs font-medium px-3.5 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white transition">${actionLabel}</button></div>` : ""}
        `;

        const dismissBtn = banner.querySelector(".notif-dismiss-btn");
        if (dismissBtn) {
          dismissBtn.addEventListener("click", () => {
            banner.remove();
          });
        }
        const actionBtn = banner.querySelector(".notif-action-btn");
        if (actionBtn && typeof onAction === "function") {
          actionBtn.addEventListener("click", () => {
            onAction();
            banner.remove();
          });
        }

        container.prepend(banner);
        while (container.children.length > 2) {
          container.lastElementChild.remove();
        }
        setTimeout(() => {
          if (banner.parentNode) banner.remove();
        }, 7000);
      }

      // 2. Also fire Native Browser OS Push Notification if granted
      try {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(title, { body: message });
        }
      } catch (e) {
        // Ignore in sandboxed contexts
      }
    }

    // Detect skipped days in the active week and uncompleted modules
    function evaluateWeekConsistency(w, triggeredDay) {
      const skippedDays = [];
      const targetIdx = triggeredDay ? DAY_ORDER.indexOf(triggeredDay) : -1;

      if (targetIdx > 0) {
        // Check all days before the day the user just checked off
        for (let i = 0; i < targetIdx; i++) {
          const dayName = DAY_ORDER[i];
          const dayTask = w.dailyTasks.find(t => t.day === dayName);
          if (dayTask && !appState.completedTasks[dayTask.id]) {
            skippedDays.push(dayName);
          }
        }
      } else {
        // General scan: find any unchecked day that comes before a checked day, or earlier in the current week
        let highestCheckedIdx = -1;
        w.dailyTasks.forEach((t, idx) => {
          if (appState.completedTasks[t.id]) highestCheckedIdx = idx;
        });
        const checkLimit = highestCheckedIdx >= 0 ? highestCheckedIdx : Math.min(w.dailyTasks.length - 1, 2);
        for (let i = 0; i <= checkLimit; i++) {
          const t = w.dailyTasks[i];
          if (t && !appState.completedTasks[t.id]) {
            skippedDays.push(t.day);
          }
        }
      }

      const pendingModules = w.concepts.filter(c => !appState.watchedVideos[c.id]);
      return { skippedDays, pendingModules };
    }

    function runConsistencyScan(showEvenIfClean) {
      const w = WEEKS_DATA.find(item => item.week === appState.selectedWeek) || WEEKS_DATA[0];
      const { skippedDays, pendingModules } = evaluateWeekConsistency(w, null);
      const todayStr = new Date().toISOString().slice(0, 10);
      const missedPreviousDay = appState.lastActiveDate && appState.lastActiveDate !== todayStr;
      appState.lastActiveDate = todayStr;

      if (skippedDays.length > 0) {
        pushConsistencyNotification({
          tag: "Skipped Day Detected",
          title: `Week ${w.week}: Complete Skipped Day (${skippedDays.join(", ")}) & Stay Consistent`,
          message: `You have uncompleted task(s) on ${skippedDays.join(", ")}${pendingModules.length > 0 ? ` and ${pendingModules.length} pending SWAYAM lecture module(s)` : ""} in Week ${w.week}. Complete your pending module and daily task to maintain consistency!`,
          type: "warning",
          actionLabel: "Open Weekly Tasks",
          onAction: () => openWeeklyMenu()
        });
      } else if (pendingModules.length > 0 && (missedPreviousDay || showEvenIfClean)) {
        pushConsistencyNotification({
          tag: "Module Reminder",
          title: `Complete Week ${w.week} Module & Stay Consistent`,
          message: `Next up in Week ${w.week}: "${pendingModules[0].title}". Complete this lecture module today to keep your placement readiness streak on track!`,
          type: "info",
          actionLabel: "View Module",
          onAction: () => switchTab("curriculum")
        });
      } else if (showEvenIfClean) {
        pushConsistencyNotification({
          tag: "Consistency Verified",
          title: `Week ${w.week} Streak On Track`,
          message: `No skipped days detected in Week ${w.week}. Keep completing your daily tasks and SWAYAM modules consistently!`,
          type: "success"
        });
      }
    }

    // IndexedDB Helper for resilient browser persistence
    function openSessionDB() {
      return new Promise((resolve, reject) => {
        if (typeof indexedDB === "undefined") {
          reject(new Error("IndexedDB unavailable"));
          return;
        }
        try {
          const req = indexedDB.open(IDB_NAME, 1);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(IDB_STORE)) {
              db.createObjectStore(IDB_STORE);
            }
          };
          req.onsuccess = (e) => resolve(e.target.result);
          req.onerror = () => reject(req.error);
        } catch (err) {
          reject(err);
        }
      });
    }

    async function saveToIndexedDB(stateObj) {
      try {
        const db = await openSessionDB();
        await new Promise((resolve, reject) => {
          const tx = db.transaction(IDB_STORE, "readwrite");
          tx.objectStore(IDB_STORE).put(JSON.stringify(stateObj), STORAGE_KEY);
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      } catch (e) {}
    }

    async function loadFromIndexedDB() {
      try {
        const db = await openSessionDB();
        const raw = await new Promise((resolve, reject) => {
          const tx = db.transaction(IDB_STORE, "readonly");
          const req = tx.objectStore(IDB_STORE).get(STORAGE_KEY);
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        });
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Number(parsed.updatedAtEpoch || 0) > Number(appState.updatedAtEpoch || 0)) {
            mergeIntoAppState(parsed);
            writeBrowserStorage();
            refreshAllViews();
            updateSessionBadge("Restored from IndexedDB");
          }
        }
      } catch (e) {}
    }

    // Optional Server-Side SQLite / JSON API Sync (works automatically with server.py and server.js)
    async function syncFromServer() {
      if (window.location.protocol === "file:") return;
      try {
        const res = await fetch("/api/state", { method: "GET", headers: { "Accept": "application/json" } });
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.state && typeof data.state === "object") {
          const serverTime = Number(data.state.updatedAtEpoch || 0);
          const localTime = Number(appState.updatedAtEpoch || 0);
          if (serverTime > localTime) {
            mergeIntoAppState(data.state);
            writeBrowserStorage();
            refreshAllViews();
            updateSessionBadge("Synced from Server");
          } else if (localTime > serverTime) {
            pushToServer();
          }
        }
      } catch (e) {
        // Static hosting has no /api/state endpoint; browser storage handles persistence
      }
    }

    async function pushToServer() {
      if (window.location.protocol === "file:") return;
      try {
        await fetch("/api/state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: appState })
        });
      } catch (e) {
        // Ignore on static hosts
      }
    }

    // Slide-Over Menu Drawer Controls (Hidden When Not In Use)
    function openWeeklyMenu() {
      const drawer = document.getElementById("weekly-menu-drawer");
      const backdrop = document.getElementById("weekly-menu-backdrop");
      const toggleBtn = document.getElementById("btn-toggle-menu");
      if (drawer) {
        drawer.classList.remove("hidden");
        drawer.classList.add("flex");
      }
      if (backdrop) {
        backdrop.classList.remove("hidden");
      }
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    }

    function closeWeeklyMenu() {
      const drawer = document.getElementById("weekly-menu-drawer");
      const backdrop = document.getElementById("weekly-menu-backdrop");
      const toggleBtn = document.getElementById("btn-toggle-menu");
      if (drawer) {
        drawer.classList.add("hidden");
        drawer.classList.remove("flex");
      }
      if (backdrop) {
        backdrop.classList.add("hidden");
      }
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    }

    function toggleWeeklyMenu() {
      const drawer = document.getElementById("weekly-menu-drawer");
      if (drawer && drawer.classList.contains("hidden")) {
        openWeeklyMenu();
      } else {
        closeWeeklyMenu();
      }
    }

    function updateSessionBadge(prefixText) {
      const badge = document.getElementById("session-persist-badge");
      const pill = document.getElementById("last-session-pill");
      const timeStr = appState.lastSavedLabel || "Ready";
      if (badge) {
        badge.textContent = prefixText ? `${prefixText} (${timeStr})` : `Auto-Saved: ${timeStr}`;
      }
      if (pill) {
        pill.textContent = appState.lastSavedLabel
          ? `Session Restored · Last Saved: ${appState.lastSavedLabel}`
          : "Session Auto-Save Active";
      }
    }

    function loadState() {
      let restored = false;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          restored = mergeIntoAppState(parsed);
        }
      } catch (e) {}

      if (!restored || !hasMeaningfulProgress(appState)) {
        try {
          if (window.name && window.name.startsWith("SG_STATE:")) {
            const parsed = JSON.parse(window.name.slice("SG_STATE:".length));
            if (Number(parsed.updatedAtEpoch || 0) >= Number(appState.updatedAtEpoch || 0)) {
              restored = mergeIntoAppState(parsed);
            }
          }
        } catch (e) {}
      }

      if (restored && hasMeaningfulProgress(appState)) {
        updateSessionBadge("Session Restored");
      }
    }

    function writeBrowserStorage() {
      const serialized = JSON.stringify(appState);
      try {
        localStorage.setItem(STORAGE_KEY, serialized);
      } catch (e) {}
      try {
        window.name = "SG_STATE:" + serialized;
      } catch (e) {}
      saveToIndexedDB(appState);
    }

    function saveState() {
      const now = new Date();
      appState.updatedAtEpoch = now.getTime();
      appState.lastSavedLabel = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      appState.lastActiveDate = now.toISOString().slice(0, 10);
      writeBrowserStorage();
      pushToServer();
      updateSessionBadge("Saved");
      updateGlobalStats();
    }

    function showToast(msg) {
      const box = document.getElementById("toast-box");
      if (!box) return;
      box.textContent = msg;
      box.classList.remove("hidden");
      if (window._toastTimer) clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => {
        box.classList.add("hidden");
      }, 3000);
    }

    // =========================================================================
    // 5. GLOBAL METRICS & PROGRESS CALCULATION
    // =========================================================================
    function updateGlobalStats() {
      let totalTasks = 0;
      let doneTasks = 0;
      let totalVideos = 0;
      let doneVideos = 0;

      WEEKS_DATA.forEach(w => {
        w.dailyTasks.forEach(t => {
          totalTasks++;
          if (appState.completedTasks[t.id]) doneTasks++;
        });
        const customList = appState.customTasks[w.week] || [];
        customList.forEach(ct => {
          totalTasks++;
          if (appState.completedTasks[ct.id]) doneTasks++;
        });
        w.concepts.forEach(c => {
          totalVideos++;
          if (appState.watchedVideos[c.id]) doneVideos++;
        });
      });

      const quizWeeks = Object.keys(appState.quizScores);
      let quizSum = 0;
      let passedQuizzes = 0;
      quizWeeks.forEach(k => {
        const sc = appState.quizScores[k] || 0;
        quizSum += sc;
        if (sc >= 80) passedQuizzes++;
      });
      const avgQuiz = quizWeeks.length > 0 ? Math.round(quizSum / quizWeeks.length) : 0;

      const doneMilestones = Object.keys(appState.completedMilestones).filter(k => appState.completedMilestones[k]).length;
      const doneKatas = Object.keys(appState.solvedKatas).filter(k => appState.solvedKatas[k]).length;

      const guviCoins = (appState.guviProfile && Number(appState.guviProfile.geekCoins)) ? Number(appState.guviProfile.geekCoins) : 0;
      const guviSolved = (appState.guviProfile && Number(appState.guviProfile.codekataSolved)) ? Number(appState.guviProfile.codekataSolved) : 0;
      const xp = guviCoins + (guviSolved * 10) + (doneTasks * 15) + (doneVideos * 25) + (passedQuizzes * 100) + (doneMilestones * 75) + (doneKatas * 50);

      const totalItems = totalTasks + totalVideos + WEEKS_DATA.length + PORTFOLIO_MILESTONES.length;
      const completedItems = doneTasks + doneVideos + passedQuizzes + doneMilestones;
      const overallPct = totalItems > 0 ? Math.min(100, Math.round((completedItems / totalItems) * 100)) : 0;

      document.getElementById("stat-xp").textContent = xp.toLocaleString();
      document.getElementById("stat-tasks").textContent = `${doneTasks}/${totalTasks}`;
      document.getElementById("stat-quiz").textContent = `${avgQuiz}%`;
      document.getElementById("overall-pct-label").textContent = `${overallPct}%`;
      document.getElementById("overall-progress-bar").style.width = `${overallPct}%`;
      document.getElementById("videos-watched-count").textContent = `${doneVideos}/${totalVideos} Modules Watched`;
      document.getElementById("weeks-cleared-count").textContent = `${passedQuizzes}/12 Quizzes Passed`;

      if (window._gapChartInstance) {
        updateGapChartData();
      }
    }

    // =========================================================================
    // 6. RENDER CURRICULUM TAB & HIDDEN MENU DRAWER (SYLLABUS + WEEKLY TASKS)
    // =========================================================================
    function renderWeekSidebar() {
      const container = document.getElementById("week-sidebar-list");
      const phaseFilterEl = document.getElementById("phase-filter");
      if (phaseFilterEl && appState.phaseFilter) {
        phaseFilterEl.value = appState.phaseFilter;
      }
      const phaseFilter = phaseFilterEl ? phaseFilterEl.value : "all";
      container.innerHTML = "";

      WEEKS_DATA.forEach(w => {
        if (phaseFilter !== "all" && String(w.phase) !== phaseFilter) return;

        const customList = appState.customTasks[w.week] || [];
        const allTasks = [...w.dailyTasks, ...customList];
        const doneCount = allTasks.filter(t => appState.completedTasks[t.id]).length;
        const pct = allTasks.length > 0 ? Math.round((doneCount / allTasks.length) * 100) : 0;
        const quizScore = appState.quizScores[w.week];
        const isSelected = appState.selectedWeek === w.week;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `w-full text-left p-2.5 rounded-xl border transition flex flex-col gap-1.5 ${
          isSelected
            ? "bg-slate-100 border-slate-900 shadow-2xs"
            : "bg-white border-slate-200/80 hover:bg-slate-50"
        }`;

        const badgeColor = w.priority === "CRITICAL"
          ? "bg-red-50 text-red-700 border border-red-200"
          : w.priority === "FAST-TRACK"
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-slate-100 text-slate-700";

        btn.innerHTML = `
          <div class="flex items-center justify-between gap-1">
            <span class="text-xs font-semibold ${isSelected ? "text-slate-950" : "text-slate-700"}">Week ${w.week} · Phase ${w.phase}</span>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}">${w.priority}</span>
          </div>
          <div class="text-xs font-semibold text-slate-900 line-clamp-1">${w.title}</div>
          <div class="flex items-center justify-between text-[11px] text-slate-500">
            <span>Tasks: ${doneCount}/${allTasks.length}</span>
            <span>${quizScore !== undefined ? `Quiz: ${quizScore}%` : "Quiz: Pending"}</span>
          </div>
          <div class="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-slate-900" style="width: ${pct}%"></div>
          </div>
        `;
        btn.addEventListener("click", () => {
          appState.selectedWeek = w.week;
          saveState();
          renderWeekSidebar();
          renderSelectedWeek();
        });
        container.appendChild(btn);
      });
    }

    function renderSelectedWeek() {
      const w = WEEKS_DATA.find(item => item.week === appState.selectedWeek) || WEEKS_DATA[0];
      const headerEl = document.getElementById("week-detail-header");
      const conceptsEl = document.getElementById("week-concepts-list");
      const tasksEl = document.getElementById("week-daily-tasks-list");
      const menuWeekHeading = document.getElementById("menu-active-week-heading");

      const customList = appState.customTasks[w.week] || [];
      const combinedTasks = [...w.dailyTasks, ...customList];
      const doneWeekTasks = combinedTasks.filter(t => appState.completedTasks[t.id]).length;

      if (menuWeekHeading) {
        menuWeekHeading.textContent = `Week ${w.week} Tasks (${doneWeekTasks}/${combinedTasks.length} Completed)`;
      }

      const toggleBtn = document.getElementById("btn-toggle-menu");
      if (toggleBtn) {
        toggleBtn.setAttribute("title", `Week ${w.week} Tasks (${doneWeekTasks}/${combinedTasks.length} Completed)`);
      }

      const quizScore = appState.quizScores[w.week];
      const quizBadge = quizScore !== undefined
        ? `<span class="text-xs font-semibold px-3 py-1 rounded-full ${quizScore >= 80 ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-amber-50 text-amber-800 border border-amber-200"}">Graded Quiz: ${quizScore}%</span>`
        : `<span class="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700">Graded Quiz: Not Taken</span>`;

      headerEl.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950 text-white">Week ${w.week} · Phase ${w.phase}</span>
            <span class="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-800">${w.badge}</span>
            <span class="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700">Weekly Tasks: ${doneWeekTasks}/${combinedTasks.length}</span>
          </div>
          ${quizBadge}
        </div>
        <h2 class="text-lg sm:text-xl font-semibold text-slate-950">${w.title}</h2>
        <p class="text-xs sm:text-sm text-slate-600 mt-1">${w.summary}</p>
      `;

      // Render Concepts & YouTube/Doc Links
      conceptsEl.innerHTML = "";
      w.concepts.forEach(c => {
        const isWatched = !!appState.watchedVideos[c.id];
        const card = document.createElement("div");
        card.className = `p-4 rounded-2xl border transition ${isWatched ? "bg-emerald-50/30 border-emerald-300" : "bg-slate-50/70 border-slate-200/80"}`;
        card.innerHTML = `
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-800">SWAYAM Concept Unit</span>
                <h4 class="text-sm font-semibold text-slate-950">${c.title}</h4>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">${c.notes}</p>
            </div>
            <button type="button" data-concept-id="${c.id}" class="concept-watch-btn shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border transition ${
              isWatched
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
            }">
              ${isWatched ? "Completed (+25 XP)" : "Mark Module Completed"}
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-slate-200/70">
            <a href="${c.ytUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-slate-400 hover:shadow-2xs transition text-xs">
              <div class="truncate">
                <span class="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">YouTube Lecture 1</span>
                <span class="font-medium text-slate-900 truncate block">${c.ytTitle}</span>
              </div>
              <span class="text-slate-400 shrink-0">&nearr;</span>
            </a>
            <a href="${c.yt2Url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-slate-400 hover:shadow-2xs transition text-xs">
              <div class="truncate">
                <span class="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">YouTube Lecture 2</span>
                <span class="font-medium text-slate-900 truncate block">${c.yt2Title}</span>
              </div>
              <span class="text-slate-400 shrink-0">&nearr;</span>
            </a>
            <a href="${c.docUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-slate-400 hover:shadow-2xs transition text-xs">
              <div class="truncate">
                <span class="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">Official Documentation</span>
                <span class="font-medium text-slate-900 truncate block">${c.docTitle}</span>
              </div>
              <span class="text-slate-400 shrink-0">&nearr;</span>
            </a>
          </div>
        `;
        conceptsEl.appendChild(card);
      });

      // Module Completion Notification Handler
      conceptsEl.querySelectorAll(".concept-watch-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const cid = btn.getAttribute("data-concept-id");
          const conceptObj = w.concepts.find(item => item.id === cid);
          appState.watchedVideos[cid] = !appState.watchedVideos[cid];
          const isNowDone = !!appState.watchedVideos[cid];
          const remainingModules = w.concepts.filter(item => !appState.watchedVideos[item.id]);
          const { skippedDays } = evaluateWeekConsistency(w, null);

          if (isNowDone) {
            if (remainingModules.length > 0) {
              pushConsistencyNotification({
                tag: "Module Completed · +25 XP",
                title: "Great Progress! Stay Consistent",
                message: `You completed "${conceptObj ? conceptObj.title : "SWAYAM Module"}". Complete the next module ("${remainingModules[0].title}")${skippedDays.length > 0 ? ` and catch up on ${skippedDays.join(", ")}` : ""} to stay consistent!`,
                type: "success",
                actionLabel: "Open Weekly Tasks",
                onAction: () => openWeeklyMenu()
              });
            } else {
              pushConsistencyNotification({
                tag: `Week ${w.week} Modules Cleared`,
                title: `All Week ${w.week} Modules Completed!`,
                message: `You finished every lecture module in Week ${w.week}. Stay consistent by completing your daily tasks (${doneWeekTasks}/${combinedTasks.length}) and passing the Week ${w.week} Graded Assessment!`,
                type: "success",
                actionLabel: "Take Week Quiz",
                onAction: () => switchTab("assessments")
              });
            }
          } else {
            pushConsistencyNotification({
              tag: "Module Unmarked",
              title: "Complete Your Module to Stay Consistent",
              message: `"${conceptObj ? conceptObj.title : "Module"}" is still pending in Week ${w.week}. Finish watching the lecture and reviewing the notes today!`,
              type: "warning"
            });
          }

          saveState();
          renderSelectedWeek();
        });
      });

      // Render Daily Tasks inside the Hidden-by-Default Menu Drawer (with Skipped-Day Notification Trigger)
      tasksEl.innerHTML = "";
      combinedTasks.forEach(t => {
        const checked = !!appState.completedTasks[t.id];
        const row = document.createElement("label");
        row.className = `flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
          checked ? "bg-slate-100/80 border-slate-300 text-slate-400 line-through" : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 text-slate-800"
        }`;
        row.innerHTML = `
          <input type="checkbox" data-task-id="${t.id}" ${checked ? "checked" : ""} class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900">
          <div class="flex-1 text-xs sm:text-sm">
            <span class="font-mono font-semibold text-xs px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-800 mr-1.5">${t.day}</span>
            <span class="font-medium">${t.text}</span>
          </div>
          <span class="text-[11px] font-mono font-semibold text-slate-500 shrink-0">+15 XP</span>
        `;
        const checkbox = row.querySelector("input");
        checkbox.addEventListener("change", () => {
          appState.completedTasks[t.id] = checkbox.checked;
          const updatedDoneCount = combinedTasks.filter(item => appState.completedTasks[item.id]).length;
          const { skippedDays, pendingModules } = evaluateWeekConsistency(w, t.day);

          if (checkbox.checked) {
            if (skippedDays.length > 0) {
              pushConsistencyNotification({
                tag: "Skipped Day Alert",
                title: `Skipped Day Detected (${skippedDays.join(", ")}) · Stay Consistent!`,
                message: `You completed ${t.day}'s task, but ${skippedDays.join(", ")} in Week ${w.week} is still incomplete${pendingModules.length > 0 ? ` along with ${pendingModules.length} lecture module(s)` : ""}. Complete the skipped day and module to keep your streak consistent!`,
                type: "warning"
              });
            } else {
              pushConsistencyNotification({
                tag: `${t.day} Completed · +15 XP`,
                title: "Daily Consistency Streak Active",
                message: `${t.day} task completed (${updatedDoneCount}/${combinedTasks.length} in Week ${w.week}). ${pendingModules.length > 0 ? `Remember to complete "${pendingModules[0].title}" to stay 100% consistent!` : "All lecture modules for this week are complete — keep going!"}`,
                type: "success"
              });
            }
          } else {
            pushConsistencyNotification({
              tag: `${t.day} Pending`,
              title: `Don't Skip ${t.day} · Stay Consistent`,
              message: `${t.day}'s task in Week ${w.week} was unmarked. Complete your daily task and module before moving ahead!`,
              type: "warning"
            });
          }

          saveState();
          renderWeekSidebar();
          renderSelectedWeek();
        });
        tasksEl.appendChild(row);
      });
    }

    // =========================================================================
    // 7. RENDER SWAYAM WEEKLY GRADED ASSESSMENTS (WITH PERSISTENT ANSWERS)
    // =========================================================================
    function initAssessmentSelect() {
      const sel = document.getElementById("assessment-week-select");
      sel.innerHTML = "";
      WEEKS_DATA.forEach(w => {
        const opt = document.createElement("option");
        opt.value = String(w.week);
        opt.textContent = `Week ${w.week}: ${w.title}`;
        sel.appendChild(opt);
      });
      sel.value = String(appState.selectedWeek);
      sel.addEventListener("change", () => {
        appState.selectedWeek = parseInt(sel.value, 10) || 1;
        saveState();
        renderWeekSidebar();
        renderSelectedWeek();
        renderAssessmentQuiz();
      });
    }

    function renderAssessmentQuiz() {
      const sel = document.getElementById("assessment-week-select");
      if (sel) sel.value = String(appState.selectedWeek);
      const w = WEEKS_DATA.find(item => item.week === appState.selectedWeek) || WEEKS_DATA[0];
      const container = document.getElementById("assessment-container");
      const banner = document.getElementById("assessment-result-banner");
      container.innerHTML = "";

      const savedWeekAnswers = (appState.quizAnswers && appState.quizAnswers[w.week]) ? appState.quizAnswers[w.week] : {};
      const prevScore = appState.quizScores[w.week];
      banner.textContent = prevScore !== undefined
        ? `Recorded Score for Week ${w.week}: ${prevScore}% (${prevScore >= 80 ? "PASSED - Badge Earned!" : "Retake to reach 80%"})`
        : `Complete all ${w.quiz.length} questions below for Week ${w.week}: ${w.title}`;

      w.quiz.forEach((qObj, qIdx) => {
        const savedChoice = savedWeekAnswers[qIdx];
        const card = document.createElement("div");
        card.className = "p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3";
        const optionsHtml = qObj.options.map((optText, oIdx) => `
          <label class="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs sm:text-sm">
            <input type="radio" name="quiz_q_${qIdx}" value="${oIdx}" ${savedChoice === oIdx ? "checked" : ""} class="mt-0.5 text-slate-900 focus:ring-slate-900">
            <span>${optText}</span>
          </label>
        `).join("");

        let explainClass = "hidden p-3 rounded-lg text-xs";
        let explainHtml = "";
        if (prevScore !== undefined && savedChoice !== undefined) {
          if (savedChoice === qObj.answer) {
            explainClass = "p-3 rounded-lg text-xs bg-emerald-50 text-emerald-900 border border-emerald-200";
            explainHtml = `<strong>Correct:</strong> ${qObj.explain}`;
          } else {
            explainClass = "p-3 rounded-lg text-xs bg-red-50 text-red-900 border border-red-200";
            explainHtml = `<strong>Incorrect.</strong> Correct Answer: <em>${qObj.options[qObj.answer]}</em> — ${qObj.explain}`;
          }
        }

        card.innerHTML = `
          <div class="text-xs sm:text-sm font-semibold text-slate-950">Q${qIdx + 1}. ${qObj.q}</div>
          <div class="space-y-2">${optionsHtml}</div>
          <div id="quiz-explain-${qIdx}" class="${explainClass}">${explainHtml}</div>
        `;

        card.querySelectorAll(`input[name="quiz_q_${qIdx}"]`).forEach(radio => {
          radio.addEventListener("change", () => {
            if (!appState.quizAnswers[w.week]) appState.quizAnswers[w.week] = {};
            appState.quizAnswers[w.week][qIdx] = parseInt(radio.value, 10);
            saveState();
          });
        });

        container.appendChild(card);
      });
    }

    function submitCurrentQuiz() {
      const w = WEEKS_DATA.find(item => item.week === appState.selectedWeek) || WEEKS_DATA[0];
      let correct = 0;
      let answered = 0;
      if (!appState.quizAnswers[w.week]) appState.quizAnswers[w.week] = {};

      w.quiz.forEach((qObj, qIdx) => {
        const chosen = document.querySelector(`input[name="quiz_q_${qIdx}"]:checked`);
        const explainEl = document.getElementById(`quiz-explain-${qIdx}`);
        if (chosen) {
          answered++;
          const val = parseInt(chosen.value, 10);
          appState.quizAnswers[w.week][qIdx] = val;
          if (val === qObj.answer) {
            correct++;
            explainEl.className = "p-3 rounded-lg text-xs bg-emerald-50 text-emerald-900 border border-emerald-200";
            explainEl.innerHTML = `<strong>Correct:</strong> ${qObj.explain}`;
          } else {
            explainEl.className = "p-3 rounded-lg text-xs bg-red-50 text-red-900 border border-red-200";
            explainEl.innerHTML = `<strong>Incorrect.</strong> Correct Answer: <em>${qObj.options[qObj.answer]}</em> — ${qObj.explain}`;
          }
          explainEl.classList.remove("hidden");
        }
      });

      if (answered < w.quiz.length) {
        showToast("Please select an option for every question before submitting!");
        return;
      }

      const pct = Math.round((correct / w.quiz.length) * 100);
      appState.quizScores[w.week] = pct;
      pushConsistencyNotification({
        tag: `Week ${w.week} Assessment`,
        title: pct >= 80 ? `Week ${w.week} Quiz Passed (${pct}%)!` : `Week ${w.week} Quiz Scored ${pct}%`,
        message: pct >= 80
          ? `You earned +100 GeekCoins on Week ${w.week}. Keep your consistency streak going into Week ${Math.min(12, w.week + 1)}!`
          : `Review the explanations and complete any pending Week ${w.week} lecture modules to reach 80%+.`,
        type: pct >= 80 ? "success" : "warning"
      });
      saveState();
      renderWeekSidebar();
      renderSelectedWeek();

      const banner = document.getElementById("assessment-result-banner");
      banner.textContent = `Week ${w.week} Graded Score: ${pct}% (${correct}/${w.quiz.length} Correct) — ${pct >= 80 ? "PASSED! +100 GeekCoins" : "Review explanations & retry for 80%+"}`;
    }

    // =========================================================================
    // 8. RENDER GUVI CODEKATA & SQLKATA SANDBOX (WITH LIVE CODE PERSISTENCE)
    // =========================================================================
    function initCodeKata() {
      const sel = document.getElementById("kata-select");
      sel.innerHTML = "";
      KATA_CHALLENGES.forEach((k, idx) => {
        const opt = document.createElement("option");
        opt.value = String(idx);
        opt.textContent = k.title;
        sel.appendChild(opt);
      });
      const initialIdx = Number.isInteger(appState.selectedKataIdx) ? appState.selectedKataIdx : 0;
      sel.value = String(initialIdx);
      sel.addEventListener("change", () => {
        const chosenIdx = parseInt(sel.value, 10) || 0;
        appState.selectedKataIdx = chosenIdx;
        saveState();
        loadKataChallenge(chosenIdx);
      });

      const editor = document.getElementById("kata-editor");
      editor.addEventListener("input", () => {
        const idx = parseInt(sel.value, 10) || 0;
        const k = KATA_CHALLENGES[idx] || KATA_CHALLENGES[0];
        appState.kataSubmissions[k.id] = editor.value;
        saveState();
      });

      loadKataChallenge(initialIdx);
    }

    function loadKataChallenge(idx) {
      const k = KATA_CHALLENGES[idx] || KATA_CHALLENGES[0];
      const solved = !!appState.solvedKatas[k.id];
      const savedCode = appState.kataSubmissions && appState.kataSubmissions[k.id];
      document.getElementById("kata-lang-badge").textContent = `${k.lang} ${solved ? "· SOLVED" : ""}`;
      document.getElementById("kata-problem-box").innerHTML = `
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">${k.title}</div>
        <p class="text-xs sm:text-sm text-slate-800 leading-relaxed">${k.problem}</p>
        <div class="text-[11px] text-slate-500">Required tokens checked: <code>${k.requiredTokens.join(", ")}</code></div>
      `;
      document.getElementById("kata-editor").value = savedCode !== undefined ? savedCode : k.starter;
      const hintBox = document.getElementById("kata-hint-box");
      hintBox.textContent = `Hint: ${k.hint}`;
      hintBox.classList.add("hidden");

      const out = document.getElementById("kata-output-box");
      if (solved) {
        out.className = "bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-xl p-3.5 text-xs font-mono";
        out.textContent = `PASS (Restored from Session): All required tokens (${k.requiredTokens.join(", ")}) verified! +50 GeekCoins awarded.`;
      } else {
        out.className = "bg-slate-100 border border-slate-200 rounded-xl p-3.5 text-xs font-mono text-slate-700";
        out.textContent = "Write your code/query above and click 'Run & Verify CodeKata'.";
      }
    }

    // =========================================================================
    // 9. RENDER RESOURCE VAULT (YOUTUBE + OFFICIAL DOCS)
    // =========================================================================
    const EXTRA_RESOURCES = [
      {
        title: "SWAYAM / NPTEL: Python for Data Science (IIT Madras)",
        category: "Course & Practice",
        pillar: "Foundations & Stats",
        url: "https://onlinecourses.nptel.ac.in/noc26_cs107/preview",
        desc: "Official NPTEL IIT Madras course for final-year students covering Python data structures, Pandas, and linear algebra."
      },
      {
        title: "HCL GUVI CodeKata Interactive Coding Platform",
        category: "Course & Practice",
        pillar: "Python DSA & SQL",
        url: "https://www.guvi.in/code-kata/",
        desc: "1,500+ structured placement coding problems in Python, arrays, strings, hashing, and SQL."
      },
      {
        title: "scikit-learn Official Supervised Learning User Guide",
        category: "Official Docs",
        pillar: "Classical Tabular ML",
        url: "https://scikit-learn.org/stable/supervised_learning.html",
        desc: "Authoritative reference for Ridge, Lasso, Logistic Regression, Decision Trees, Random Forests, and Pipelines."
      },
      {
        title: "XGBoost Official Python Documentation",
        category: "Official Docs",
        pillar: "Classical Tabular ML",
        url: "https://xgboost.readthedocs.io/en/stable/python/index.html",
        desc: "Complete API reference for XGBClassifier, early stopping, hyperparameter tuning, and tree regularization."
      },
      {
        title: "PyTorch AdaptiveAvgPool2d Official Documentation",
        category: "Official Docs",
        pillar: "Deep Learning & CNN",
        url: "https://docs.pytorch.org/docs/stable/generated/torch.nn.AdaptiveAvgPool2d.html",
        desc: "Exact PyTorch layer used to refactor your 52.5M-parameter Plant Disease CNN down to ~1.2M parameters."
      },
      {
        title: "Meta Prophet Official Quick Start Guide",
        category: "Official Docs",
        pillar: "Time-Series Forecasting",
        url: "https://facebook.github.io/prophet/docs/quick_start.html",
        desc: "Official Python documentation for Prophet trend, seasonality, holiday modeling, and cross-validation."
      }
    ];

    function renderResourceLibrary() {
      const query = (document.getElementById("library-search").value || "").toLowerCase().trim();
      const catFilter = document.getElementById("library-category-filter").value;
      const grid = document.getElementById("library-grid");
      grid.innerHTML = "";

      const items = [...EXTRA_RESOURCES];
      WEEKS_DATA.forEach(w => {
        w.concepts.forEach(c => {
          items.push({
            title: c.ytTitle,
            category: "YouTube",
            pillar: `Week ${w.week}: ${w.title}`,
            url: c.ytUrl,
            desc: c.notes
          });
          items.push({
            title: c.yt2Title,
            category: "YouTube",
            pillar: `Week ${w.week}: ${w.title}`,
            url: c.yt2Url,
            desc: c.notes
          });
          items.push({
            title: c.docTitle,
            category: "Official Docs",
            pillar: `Week ${w.week}: ${w.title}`,
            url: c.docUrl,
            desc: `Official reference for ${c.title}`
          });
        });
      });

      const filtered = items.filter(item => {
        if (catFilter !== "all" && item.category !== catFilter) return false;
        if (!query) return true;
        return (
          item.title.toLowerCase().includes(query) ||
          item.pillar.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query)
        );
      });

      filtered.forEach(item => {
        const badgeClass = item.category === "YouTube"
          ? "bg-red-50 text-red-700 border border-red-200"
          : item.category === "Official Docs"
          ? "bg-blue-50 text-blue-700 border border-blue-200"
          : "bg-slate-100 text-slate-800";

        const card = document.createElement("a");
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = "p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-400 hover:bg-white hover:shadow-sm transition flex flex-col justify-between gap-3";
        card.innerHTML = `
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeClass}">${item.category}</span>
              <span class="text-[11px] font-medium text-slate-500 truncate">${item.pillar}</span>
            </div>
            <h4 class="text-xs sm:text-sm font-semibold text-slate-950">${item.title}</h4>
            <p class="text-xs text-slate-600 line-clamp-2">${item.desc}</p>
          </div>
          <div class="text-xs font-semibold text-slate-900">Open Resource &nearr;</div>
        `;
        grid.appendChild(card);
      });
    }

    // =========================================================================
    // 10. RENDER PORTFOLIO BRIDGE & CHART.JS GAP ANALYTICS
    // =========================================================================
    function renderPortfolioBridge() {
      const container = document.getElementById("portfolio-bridge-list");
      container.innerHTML = "";
      PORTFOLIO_MILESTONES.forEach(m => {
        const checked = !!appState.completedMilestones[m.id];
        const label = document.createElement("label");
        label.className = `flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
          checked ? "bg-slate-100/80 border-slate-300 text-slate-400 line-through" : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 text-slate-800"
        }`;
        label.innerHTML = `
          <input type="checkbox" data-milestone-id="${m.id}" ${checked ? "checked" : ""} class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900">
          <div class="flex-1 text-xs">
            <span class="font-semibold px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-800 mr-1.5">${m.category}</span>
            <span class="font-medium">${m.text}</span>
          </div>
          <span class="text-[11px] font-mono font-semibold text-slate-500 shrink-0">+75 XP</span>
        `;
        const cb = label.querySelector("input");
        cb.addEventListener("change", () => {
          appState.completedMilestones[m.id] = cb.checked;
          saveState();
          renderPortfolioBridge();
          showToast(cb.checked ? "Portfolio Milestone Completed! +75 GeekCoins" : "Milestone unchecked.");
        });
        container.appendChild(label);
      });
    }

    function computePillarScores() {
      const doneTasks = Object.keys(appState.completedTasks).filter(k => appState.completedTasks[k]);
      const mlBoost = doneTasks.filter(k => k.startsWith("w4_") || k.startsWith("w5_") || k.startsWith("w6_")).length * 3;
      const sqlBoost = doneTasks.filter(k => k.startsWith("w1_") || k.startsWith("w9_")).length * 2.5;
      const dsaBoost = doneTasks.filter(k => k.startsWith("w2_")).length * 4;
      const dlBoost = doneTasks.filter(k => k.startsWith("w7_")).length * 3.5;

      return [
        Math.min(95, 25 + mlBoost),   // Classical Tabular ML
        Math.min(95, 50 + dsaBoost),  // Python DSA & Pandas
        Math.min(95, 55 + sqlBoost),  // Analytical SQL & Big Data
        Math.min(95, 60 + dlBoost),   // Deep Learning & CNN
        85,                           // Inferential Stats (Already Mastered!)
        88                            // GenAI, LLMs & Pytest (QueryMind)
      ];
    }

    function initGapChart() {
      const ctx = document.getElementById("gapChartCanvas");
      if (!ctx || typeof Chart === "undefined") return;
      window._gapChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Classical Tabular ML",
            "Python DSA & Pandas",
            "Analytical SQL",
            "Deep Learning CNN",
            "Inferential Stats (Mastered)",
            "GenAI & Pytest"
          ],
          datasets: [
            {
              label: "Your Live Readiness (%)",
              data: computePillarScores(),
              backgroundColor: "#1D1D1F",
              borderRadius: 6
            },
            {
              label: "Placement Hiring Target (%)",
              data: [90, 85, 90, 85, 85, 90],
              backgroundColor: "#D2D2D7",
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }

    function updateGapChartData() {
      if (!window._gapChartInstance) return;
      window._gapChartInstance.data.datasets[0].data = computePillarScores();
      window._gapChartInstance.update();
    }

    // =========================================================================
    // 11. EVENT WIRING, GUVI MONITOR & INITIALIZATION
    // =========================================================================
    function switchTab(tabName, skipSave) {
      const validTabs = ["curriculum", "assessments", "codekata", "library", "portfolio", "guvi"];
      const targetTab = validTabs.includes(tabName) ? tabName : "curriculum";
      appState.activeTab = targetTab;
      if (!skipSave) {
        saveState();
      }

      // Automatically hide the Weekly Tasks Menu when switching tabs
      closeWeeklyMenu();

      document.querySelectorAll(".tab-view").forEach(sec => sec.classList.add("hidden"));
      const target = document.getElementById(`view-${targetTab}`);
      if (target) target.classList.remove("hidden");

      // Apple.com White Active Tab Selection Pill
      document.querySelectorAll(".nav-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === targetTab) {
          btn.className = "nav-tab-btn px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap bg-white text-slate-950 shadow-sm ring-1 ring-black/5";
        } else {
          btn.className = "nav-tab-btn px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap text-slate-600 hover:text-slate-950";
        }
      });

      if (targetTab === "assessments") {
        renderAssessmentQuiz();
      } else if (targetTab === "portfolio") {
        updateGapChartData();
      }
    }

    function renderGuviMonitor() {
      if (!appState.guviProfile) return;
      const gp = appState.guviProfile;
      document.getElementById("guvi-email-input").value = gp.email || "shanjaikumar2812@gmail.com";
      document.getElementById("guvi-username-input").value = gp.profileUrl || "https://www.guvi.in/shanjaikumar2812";
      document.getElementById("guvi-codekata-solved").value = gp.codekataSolved ?? 45;
      document.getElementById("guvi-geekcoins-input").value = gp.geekCoins ?? 1250;
      document.getElementById("guvi-streak-input").value = gp.streakDays ?? 7;
      document.getElementById("guvi-header-status").textContent = `GUVI: ${gp.email || "Linked"} (${gp.codekataSolved ?? 45} Kata)`;
      const directLink = document.getElementById("guvi-direct-profile-link");
      if (gp.profileUrl && gp.profileUrl.startsWith("http")) {
        directLink.href = gp.profileUrl;
      }

      const listEl = document.getElementById("guvi-courses-list");
      listEl.innerHTML = "";
      (gp.modules || []).forEach(mod => {
        const row = document.createElement("div");
        row.className = `p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
          mod.done ? "bg-slate-100/80 border-slate-300" : "bg-white border-slate-200"
        }`;
        row.innerHTML = `
          <label class="flex items-center gap-2.5 cursor-pointer flex-1 text-xs sm:text-sm font-medium text-slate-800">
            <input type="checkbox" data-guvi-mod="${mod.id}" ${mod.done ? "checked" : ""} class="h-4 w-4 rounded border-slate-300 text-slate-900">
            <span class="${mod.done ? "line-through text-slate-400" : ""}">${mod.title}</span>
          </label>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full ${mod.done ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-100 text-slate-700"}">
              ${mod.done ? "100% Completed" : `${mod.pct || 50}% In Progress`}
            </span>
          </div>
        `;
        const cb = row.querySelector("input");
        cb.addEventListener("change", () => {
          mod.done = cb.checked;
          mod.pct = cb.checked ? 100 : 50;
          saveState();
          renderGuviMonitor();
          pushConsistencyNotification({
            tag: "GUVI Module Sync",
            title: cb.checked ? "GUVI Module Completed!" : "GUVI Module In Progress",
            message: cb.checked
              ? `Marked "${mod.title}" 100% complete. Keep your daily GUVI & SWAYAM streak consistent!`
              : `"${mod.title}" marked in progress. Complete the module to maintain consistency!`,
            type: cb.checked ? "success" : "warning"
          });
        });
        listEl.appendChild(row);
      });
    }

    function applyProMaxDesignTokens() {
      const currentTheme = appState.uiTheme || "light";
      const currentDensity = appState.uiDensity || "standard";
      document.documentElement.setAttribute("data-theme", currentTheme);
      document.documentElement.setAttribute("data-density", currentDensity);
      const themeLbl = document.getElementById("theme-label");
      const densLbl = document.getElementById("density-label");
      if (themeLbl) themeLbl.textContent = currentTheme === "dark" ? "Light Mode" : "Dark Mode";
      if (densLbl) densLbl.textContent = `Density: ${currentDensity.charAt(0).toUpperCase() + currentDensity.slice(1)}`;
    }

    function refreshAllViews() {
      applyProMaxDesignTokens();
      renderNotificationCenter();
      renderGuviMonitor();
      renderWeekSidebar();
      renderSelectedWeek();
      const assessSel = document.getElementById("assessment-week-select");
      if (assessSel) assessSel.value = String(appState.selectedWeek);
      renderAssessmentQuiz();
      const kataSel = document.getElementById("kata-select");
      if (kataSel) kataSel.value = String(appState.selectedKataIdx || 0);
      loadKataChallenge(appState.selectedKataIdx || 0);
      renderResourceLibrary();
      renderPortfolioBridge();
      switchTab(appState.activeTab || "curriculum", true);
      updateGlobalStats();
    }

    window.addEventListener("DOMContentLoaded", () => {
      loadState();

      // Slide-Over Menu Drawer Wiring (Hidden When Not In Use)
      document.getElementById("btn-toggle-menu").addEventListener("click", toggleWeeklyMenu);
      document.getElementById("btn-open-menu-inline").addEventListener("click", openWeeklyMenu);
      document.getElementById("btn-close-menu").addEventListener("click", closeWeeklyMenu);
      document.getElementById("weekly-menu-backdrop").addEventListener("click", closeWeeklyMenu);

      // Notification Center Panel Wiring
      const notifPanel = document.getElementById("notif-center-panel");
      document.getElementById("btn-notif-center").addEventListener("click", () => {
        if (notifPanel.classList.contains("hidden")) {
          notifPanel.classList.remove("hidden");
          notifPanel.classList.add("flex");
        } else {
          notifPanel.classList.add("hidden");
          notifPanel.classList.remove("flex");
        }
      });
      document.getElementById("btn-close-notif-center").addEventListener("click", () => {
        notifPanel.classList.add("hidden");
        notifPanel.classList.remove("flex");
      });
      document.getElementById("btn-check-consistency").addEventListener("click", () => {
        runConsistencyScan(true);
        saveState();
      });
      document.getElementById("btn-clear-notifs").addEventListener("click", () => {
        appState.notifications = [];
        saveState();
        renderNotificationCenter();
      });
      document.getElementById("btn-enable-os-push").addEventListener("click", async () => {
        const statusLbl = document.getElementById("os-push-status-label");
        try {
          if (!("Notification" in window)) {
            if (statusLbl) statusLbl.textContent = "In-app push active (Browser API unsupported here)";
            showToast("In-app push notifications are active!");
            return;
          }
          const perm = await Notification.requestPermission();
          if (perm === "granted") {
            if (statusLbl) statusLbl.textContent = "Browser + In-App Push Notifications Enabled";
            pushConsistencyNotification({
              tag: "Push Active",
              title: "Consistency Push Notifications Enabled",
              message: "You will now receive instant alerts whenever you complete a module or skip a study day.",
              type: "success"
            });
          } else {
            if (statusLbl) statusLbl.textContent = "In-app push active (Browser permission declined)";
          }
        } catch (e) {
          if (statusLbl) statusLbl.textContent = "In-app push notifications active";
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeWeeklyMenu();
          notifPanel.classList.add("hidden");
          notifPanel.classList.remove("flex");
        }
      });

      // Tab buttons
      document.querySelectorAll(".nav-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          switchTab(btn.getAttribute("data-tab"));
        });
      });

      // Phase filter
      document.getElementById("phase-filter").addEventListener("change", (e) => {
        appState.phaseFilter = e.target.value;
        saveState();
        renderWeekSidebar();
      });

      // Check all week tasks button
      document.getElementById("btn-mark-week-tasks").addEventListener("click", () => {
        const w = WEEKS_DATA.find(item => item.week === appState.selectedWeek) || WEEKS_DATA[0];
        const customList = appState.customTasks[w.week] || [];
        const allTasks = [...w.dailyTasks, ...customList];
        const allChecked = allTasks.every(t => appState.completedTasks[t.id]);
        allTasks.forEach(t => {
          appState.completedTasks[t.id] = !allChecked;
        });
        saveState();
        renderWeekSidebar();
        renderSelectedWeek();
        pushConsistencyNotification({
          tag: !allChecked ? `Week ${w.week} Tasks Complete` : `Week ${w.week} Tasks Reset`,
          title: !allChecked ? `All Week ${w.week} Daily Tasks Completed!` : `Week ${w.week} Tasks Unchecked`,
          message: !allChecked
            ? `Great consistency! You completed all ${allTasks.length} daily tasks for Week ${w.week}. Make sure both lecture modules and the weekly quiz are finished!`
            : `Week ${w.week} tasks were unchecked. Complete your daily tasks one by one to maintain consistency!`,
          type: !allChecked ? "success" : "warning"
        });
      });

      // Jump to week quiz button
      document.getElementById("btn-jump-quiz").addEventListener("click", () => {
        closeWeeklyMenu();
        switchTab("assessments");
      });

      // Add custom daily task
      document.getElementById("btn-add-custom-task").addEventListener("click", () => {
        const inp = document.getElementById("custom-task-input");
        const val = (inp.value || "").trim();
        if (!val) {
          showToast("Enter a task description first!");
          return;
        }
        const wNum = appState.selectedWeek;
        if (!appState.customTasks[wNum]) appState.customTasks[wNum] = [];
        appState.customTasks[wNum].push({
          id: `custom_${wNum}_${Date.now()}`,
          day: "Custom",
          text: val
        });
        inp.value = "";
        saveState();
        renderWeekSidebar();
        renderSelectedWeek();
        showToast("Custom study task added to Week " + wNum);
      });

      // Quiz buttons
      document.getElementById("btn-submit-quiz").addEventListener("click", submitCurrentQuiz);
      document.getElementById("btn-reset-quiz").addEventListener("click", () => {
        const w = WEEKS_DATA.find(item => item.week === appState.selectedWeek) || WEEKS_DATA[0];
        if (appState.quizAnswers) delete appState.quizAnswers[w.week];
        if (appState.quizScores) delete appState.quizScores[w.week];
        saveState();
        renderWeekSidebar();
        renderSelectedWeek();
        renderAssessmentQuiz();
        showToast(`Reset answers for Week ${w.week}.`);
      });

      // CodeKata buttons
      document.getElementById("btn-kata-reset-code").addEventListener("click", () => {
        const idx = parseInt(document.getElementById("kata-select").value, 10) || 0;
        const k = KATA_CHALLENGES[idx] || KATA_CHALLENGES[0];
        delete appState.kataSubmissions[k.id];
        document.getElementById("kata-editor").value = k.starter;
        saveState();
        showToast("Reset editor to starter template.");
      });
      document.getElementById("btn-kata-hint").addEventListener("click", () => {
        document.getElementById("kata-hint-box").classList.toggle("hidden");
      });
      document.getElementById("btn-kata-solution").addEventListener("click", () => {
        const idx = parseInt(document.getElementById("kata-select").value, 10) || 0;
        const k = KATA_CHALLENGES[idx] || KATA_CHALLENGES[0];
        document.getElementById("kata-editor").value = k.solution;
        appState.kataSubmissions[k.id] = k.solution;
        saveState();
        showToast("Loaded reference solution into editor.");
      });
      document.getElementById("btn-run-kata").addEventListener("click", () => {
        const idx = parseInt(document.getElementById("kata-select").value, 10) || 0;
        const k = KATA_CHALLENGES[idx] || KATA_CHALLENGES[0];
        const rawCode = document.getElementById("kata-editor").value || "";
        appState.kataSubmissions[k.id] = rawCode;
        const code = rawCode.toLowerCase();
        const missing = k.requiredTokens.filter(tok => !code.includes(tok.toLowerCase()));
        const out = document.getElementById("kata-output-box");
        if (missing.length === 0) {
          appState.solvedKatas[k.id] = true;
          saveState();
          document.getElementById("kata-lang-badge").textContent = `${k.lang} · SOLVED`;
          out.className = "bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-xl p-3.5 text-xs font-mono";
          out.textContent = `PASS: All test assertions and architectural tokens (${k.requiredTokens.join(", ")}) verified! +50 GeekCoins awarded.`;
          pushConsistencyNotification({
            tag: "CodeKata Solved · +50 XP",
            title: k.title,
            message: "All required tokens verified! Stay consistent and complete your weekly SWAYAM modules and daily tasks.",
            type: "success"
          });
        } else {
          saveState();
          out.className = "bg-amber-950 text-amber-300 border border-amber-700 rounded-xl p-3.5 text-xs font-mono";
          out.textContent = `Incomplete: Your solution is missing key construct(s): ${missing.join(", ")}. Click 'Show Hint' if stuck.`;
        }
      });

      // Library search & filter
      document.getElementById("library-search").addEventListener("input", renderResourceLibrary);
      document.getElementById("library-category-filter").addEventListener("change", renderResourceLibrary);

      // Export & Backup Modal
      document.getElementById("btn-export-log").addEventListener("click", () => {
        const modal = document.getElementById("export-modal");
        const ta = document.getElementById("export-textarea");
        const xp = document.getElementById("stat-xp").textContent;
        const tasks = document.getElementById("stat-tasks").textContent;
        const quiz = document.getElementById("stat-quiz").textContent;
        const lines = [
          "# Shanjai Kumar G M — SWAYAM x GUVI Data Science Placement Log",
          `GeekCoins XP: ${xp} | Daily Tasks Completed: ${tasks} | Avg Weekly Quiz Score: ${quiz}`,
          `Last Saved Session: ${appState.lastSavedLabel || "Active"}`,
          "",
          "## Weekly Quiz & Task Breakdown:"
        ];
        WEEKS_DATA.forEach(w => {
          const customList = appState.customTasks[w.week] || [];
          const allT = [...w.dailyTasks, ...customList];
          const doneT = allT.filter(t => appState.completedTasks[t.id]).length;
          const qSc = appState.quizScores[w.week] !== undefined ? `${appState.quizScores[w.week]}%` : "Pending";
          lines.push(`- Week ${w.week} (${w.title}): ${doneT}/${allT.length} tasks done | Graded Quiz: ${qSc}`);
        });
        ta.value = lines.join("\n");
        document.getElementById("copy-status-msg").textContent = "";
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      });

      document.getElementById("btn-close-modal").addEventListener("click", () => {
        const modal = document.getElementById("export-modal");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      });

      document.getElementById("btn-copy-export").addEventListener("click", () => {
        const ta = document.getElementById("export-textarea");
        ta.select();
        try {
          document.execCommand("copy");
          document.getElementById("copy-status-msg").textContent = "Copied study summary to clipboard.";
        } catch (e) {
          document.getElementById("copy-status-msg").textContent = "Select text and press Ctrl+C.";
        }
      });

      // Download JSON session backup
      document.getElementById("btn-download-json").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(appState, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `swayam-guvi-session-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        document.getElementById("copy-status-msg").textContent = "Downloaded session backup (.json).";
      });

      // Restore JSON session backup
      document.getElementById("input-restore-json").addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const parsed = JSON.parse(String(ev.target.result || "{}"));
            mergeIntoAppState(parsed);
            saveState();
            refreshAllViews();
            document.getElementById("copy-status-msg").textContent = "Session restored from JSON backup.";
            showToast("Session restored from backup file!");
          } catch (err) {
            document.getElementById("copy-status-msg").textContent = "Invalid JSON backup file.";
          }
        };
        reader.readAsText(file);
      });

      document.getElementById("btn-reset-all-progress").addEventListener("click", () => {
        appState = getDefaultState();
        saveState();
        refreshAllViews();
        const modal = document.getElementById("export-modal");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        showToast("All progress reset to 0.");
      });

      document.getElementById("btn-open-guvi-sync").addEventListener("click", () => {
        switchTab("guvi");
      });

      document.getElementById("btn-save-guvi-profile").addEventListener("click", () => {
        appState.guviProfile.email = document.getElementById("guvi-email-input").value.trim();
        appState.guviProfile.profileUrl = document.getElementById("guvi-username-input").value.trim();
        appState.guviProfile.codekataSolved = parseInt(document.getElementById("guvi-codekata-solved").value, 10) || 0;
        appState.guviProfile.geekCoins = parseInt(document.getElementById("guvi-geekcoins-input").value, 10) || 0;
        appState.guviProfile.streakDays = parseInt(document.getElementById("guvi-streak-input").value, 10) || 0;
        document.getElementById("guvi-sync-badge").textContent = "Last Synced: " + new Date().toLocaleTimeString();
        saveState();
        renderGuviMonitor();
        showToast("GUVI Profile & CodeKata stats synced!");
      });

      ["guvi-codekata-solved", "guvi-geekcoins-input", "guvi-streak-input"].forEach(id => {
        document.getElementById(id).addEventListener("change", () => {
          appState.guviProfile.codekataSolved = parseInt(document.getElementById("guvi-codekata-solved").value, 10) || 0;
          appState.guviProfile.geekCoins = parseInt(document.getElementById("guvi-geekcoins-input").value, 10) || 0;
          appState.guviProfile.streakDays = parseInt(document.getElementById("guvi-streak-input").value, 10) || 0;
          saveState();
          renderGuviMonitor();
        });
      });

      document.getElementById("btn-add-guvi-module").addEventListener("click", () => {
        const inp = document.getElementById("guvi-new-module-input");
        const val = (inp.value || "").trim();
        if (!val) {
          showToast("Enter a GUVI module or CodeKata milestone first!");
          return;
        }
        appState.guviProfile.modules.push({
          id: "gm_" + Date.now(),
          title: val,
          pct: 100,
          done: true
        });
        inp.value = "";
        saveState();
        renderGuviMonitor();
        showToast("Logged GUVI activity to your profile!");
      });

      document.getElementById("btn-theme-toggle").addEventListener("click", () => {
        appState.uiTheme = appState.uiTheme === "dark" ? "light" : "dark";
        applyProMaxDesignTokens();
        saveState();
        showToast(`Appearance: ${appState.uiTheme.toUpperCase()} mode activated`);
      });

      document.getElementById("btn-density-toggle").addEventListener("click", () => {
        const order = ["standard", "compact", "spacious"];
        const curr = appState.uiDensity || "standard";
        appState.uiDensity = order[(order.indexOf(curr) + 1) % order.length];
        applyProMaxDesignTokens();
        saveState();
        showToast(`Density: ${appState.uiDensity.toUpperCase()}`);
      });

      // Lifecycle hooks to guarantee state is flushed before tab close or reload
      window.addEventListener("beforeunload", () => {
        writeBrowserStorage();
      });
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          writeBrowserStorage();
        }
      });
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY && e.newValue) {
          try {
            mergeIntoAppState(JSON.parse(e.newValue));
            refreshAllViews();
          } catch (err) {}
        }
      });

      // Initial renders & async recovery
      initAssessmentSelect();
      initCodeKata();
      initGapChart();
      refreshAllViews();
      loadFromIndexedDB();
      syncFromServer();

      // Run automatic consistency & skipped-day check shortly after page load
      setTimeout(() => {
        runConsistencyScan(false);
      }, 650);
    });
