# SWAYAM × GUVI: Data Science Placement Mastery Hub (VS Code Workspace)

**Prepared for:** Shanjai Kumar G M (Final-Year B.Sc. Data Science & Analytics, Sacred Heart College)

## Folder Structure for VS Code
```text
swayam-guvi-vscode-project/
├── .vscode/
│   ├── extensions.json   # Recommends VS Code Live Server & Python extensions
│   ├── launch.json       # One-click F5 launcher in VS Code
│   ├── settings.json     # Live Server port & editor settings
│   └── tasks.json        # Integrated terminal build task
├── css/
│   └── styles.css        # Custom typography & scrollbar styles
├── js/
│   ├── data.js           # All 12 Weeks, YouTube links, Docs, Quizzes & CodeKata challenges
│   └── app.js            # Interactive UI controller, Chart.js radar & localStorage persistence
├── index.html            # Main entry point
├── server.py             # Built-in Python development server (auto-opens browser on port 5500)
└── README.md             # Setup & customization guide
```

## How to Open and Run in VS Code (3 Easy Ways)

### Step 1: Open Folder in VS Code
1. Download and extract `swayam-guvi-vscode-project.zip`.
2. Open **Visual Studio Code**, click **File → Open Folder...** (or run `code swayam-guvi-vscode-project` in your terminal) and select the extracted folder.

### Step 2: Launch the Site
- **Option A — Using VS Code Live Server Extension (Recommended):**
  Right-click `index.html` in the VS Code Explorer sidebar and click **"Open with Live Server"**.
- **Option B — Using Python in VS Code Terminal (Zero Extensions Needed):**
  Open the VS Code terminal (`Ctrl + ~`) and run:
  ```bash
  python server.py
  ```
  It will automatically start a local server at `http://127.0.0.1:5500/index.html` and open your browser!
- **Option C — Press `F5` in VS Code:**
  Press `F5` (Run and Debug) to launch `.vscode/launch.json`.

## How to Customize Weeks, Videos, or Tasks in VS Code
Open `js/data.js` in VS Code:
- Edit `WEEKS_DATA` to add new YouTube links, official documentation links, daily tasks, or quiz questions.
- Edit `KATA_CHALLENGES` to add new SQL or Python practice problems.
- Edit `PORTFOLIO_MILESTONES` to track additional resume and GitHub upgrades.
