/* SWAYAM x GUVI Curriculum, YouTube Links, Official Docs, CodeKata & Quizzes */
// =========================================================================
    // 1. VERIFIED CURRICULUM DATA (12 WEEKS, YOUTUBE LINKS, DOCS, TASKS, QUIZZES)
    // =========================================================================
    const WEEKS_DATA = [
      {
        week: 1,
        phase: 1,
        title: "Advanced Analytical SQL & Window Functions",
        badge: "Gap #4: SQL OA Gate",
        priority: "HIGH",
        summary: "Master analytical SQL queries tested in Stage 1 Online Assessments and Stage 2 live coding: ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG, CTEs, self-joins, and rolling aggregations.",
        concepts: [
          {
            id: "w1_c1",
            title: "SQL Window Functions: PARTITION BY, ROW_NUMBER, RANK & DENSE_RANK",
            notes: "Unlike GROUP BY which collapses rows, OVER(PARTITION BY ... ORDER BY ...) preserves row-level granularity. For ties [100, 100, 90]: ROW_NUMBER gives 1,2,3; RANK gives 1,1,3; DENSE_RANK gives 1,1,2.",
            ytTitle: "Maven Analytics — SQL Window Functions Clearly Explained",
            ytUrl: "https://www.youtube.com/watch?v=rIcB4zMYMas",
            yt2Title: "techTFQ — How to Write SQL Queries Using RANK, DENSE_RANK, LEAD/LAG",
            yt2Url: "https://www.youtube.com/watch?v=Ww71knvhQ-s",
            docTitle: "LeetCode Top SQL 50 Study Plan",
            docUrl: "https://leetcode.com/studyplan/top-sql-50/"
          },
          {
            id: "w1_c2",
            title: "Rolling Windows, Self-Joins & Real Company Interview Queries",
            notes: "Use LAG(revenue, 1) OVER(ORDER BY month) for Month-over-Month growth, and ROWS BETWEEN 6 PRECEDING AND CURRENT ROW for 7-day rolling averages.",
            ytTitle: "Colt Steele — SQL Window Functions in 10 Minutes",
            ytUrl: "https://www.youtube.com/watch?v=y1KCM8vbYe4",
            yt2Title: "StrataScratch — Practice Writing SQL Queries on Real Interviews",
            yt2Url: "https://www.youtube.com/watch?v=l6XhSFAyvO0",
            docTitle: "StrataScratch Coding Interview Platform",
            docUrl: "https://platform.stratascratch.com/coding"
          }
        ],
        dailyTasks: [
          { id: "w1_d1", day: "Mon", text: "Watch Maven Analytics & techTFQ Window Functions lectures; write notes on RANK vs DENSE_RANK." },
          { id: "w1_d2", day: "Tue", text: "Solve 5 Select & Basic Joins problems on LeetCode SQL 50 + GUVI SQLKata." },
          { id: "w1_d3", day: "Wed", text: "Solve 5 Aggregate & GROUP BY / HAVING problems on LeetCode SQL 50." },
          { id: "w1_d4", day: "Thu", text: "Master LEAD(), LAG(), and self-joins; write a Month-over-Month growth query on your 100K Quick-Commerce dataset." },
          { id: "w1_d5", day: "Fri", text: "Write 5 CTE and correlated subquery solutions (Top 3 products per platform across Blinkit, Swiggy, JioMart)." },
          { id: "w1_d6", day: "Sat", text: "Commit 15 analytical SQL queries into your Quick-Commerce GitHub repo." },
          { id: "w1_d7", day: "Sun", text: "Complete Week 1 SWAYAM Graded Assessment with >= 80% score." }
        ],
        quiz: [
          {
            q: "Given salaries [90000, 90000, 80000] in Department A, what does DENSE_RANK() OVER (ORDER BY salary DESC) return?",
            options: ["1, 2, 3", "1, 1, 3", "1, 1, 2", "1, 2, 2"],
            answer: 2,
            explain: "DENSE_RANK() assigns identical ranks to ties and does not skip the next rank number (1, 1, 2)."
          },
          {
            q: "In SQL logical query processing order, which clause executes immediately BEFORE GROUP BY?",
            options: ["HAVING", "WHERE", "SELECT", "ORDER BY"],
            answer: 1,
            explain: "Execution order is FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY."
          },
          {
            q: "Which window function allows you to compare a row's current day revenue with the previous day's revenue without a self-join?",
            options: ["NTILE(1)", "LAG(revenue, 1)", "FIRST_VALUE(revenue)", "ROW_NUMBER()"],
            answer: 1,
            explain: "LAG(column, offset) accesses data from a previous row in the same result set without needing a self-join."
          }
        ]
      },
      {
        week: 2,
        phase: 1,
        title: "Python DSA Speed & Vectorized Pandas Wrangling",
        badge: "Gap #3: Python OA Gate",
        priority: "HIGH",
        summary: "Clear Stage 1 Online Assessments by mastering O(N) Hash Maps, Two Pointers, Sliding Window, and vectorized Pandas groupby/merge/pivot_table operations.",
        concepts: [
          {
            id: "w2_c1",
            title: "Python Hash Maps, Two Pointers & Sliding Window Patterns",
            notes: "Replacing nested O(N^2) loops with a Python dict/Counter or Two-Pointer window drops runtime to O(N), which is required to pass hidden test cases on HackerRank and GUVI CodeKata.",
            ytTitle: "NeetCode — Two Sum & HashMap Pattern in Python",
            ytUrl: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
            yt2Title: "AlgoMasterIO — Sliding Window & Two Pointers in 7 Minutes",
            yt2Url: "https://www.youtube.com/watch?v=y2d0VHdvfdc",
            docTitle: "HCL GUVI CodeKata Practice Platform",
            docUrl: "https://www.guvi.in/code-kata/"
          },
          {
            id: "w2_c2",
            title: "Vectorized Pandas: GroupBy, Merge & Pivot Tables",
            notes: "Never iterate over DataFrame rows with iterrows() when vectorization is possible. Use df.groupby().agg(), pd.merge(), and df.pivot_table().",
            ytTitle: "Alex The Analyst — GroupBy and Aggregate Functions in Pandas",
            ytUrl: "https://www.youtube.com/watch?v=VRmXto2YA2I",
            yt2Title: "codebasics — Python Pandas Pivot Table Tutorial",
            yt2Url: "https://www.youtube.com/watch?v=xPPs59pn6qU",
            docTitle: "Pandas Official User Guide: GroupBy Split-Apply-Combine",
            docUrl: "https://pandas.pydata.org/docs/user_guide/groupby.html"
          }
        ],
        dailyTasks: [
          { id: "w2_d1", day: "Mon", text: "Solve 3 Hash Map / Counter problems in Python on GUVI CodeKata or LeetCode." },
          { id: "w2_d2", day: "Tue", text: "Solve 3 Two-Pointer & String manipulation problems in Python." },
          { id: "w2_d3", day: "Wed", text: "Solve 3 Sliding Window subarray problems and analyze time/space complexity." },
          { id: "w2_d4", day: "Thu", text: "Practice Pandas groupby().agg(), transform(), and handling missing values without loops." },
          { id: "w2_d5", day: "Fri", text: "Practice Pandas merge (inner, left, outer) and pivot_table on your 100K e-commerce CSV." },
          { id: "w2_d6", day: "Sat", text: "Take a timed 60-minute mock OA (2 Python DSA + 2 SQL window problems)." },
          { id: "w2_d7", day: "Sun", text: "Complete Week 2 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "What is the average time complexity of looking up a key in a Python dict (hash table)?",
            options: ["O(log N)", "O(N)", "O(1)", "O(N log N)"],
            answer: 2,
            explain: "Python dictionaries are implemented as hash tables, providing O(1) average-case lookup, insertion, and deletion."
          },
          {
            q: "In Pandas, which method computes an aggregate per group and broadcasts the result back to the original DataFrame's index length?",
            options: ["df.groupby('col').agg('mean')", "df.groupby('col').transform('mean')", "df.pivot_table()", "df.drop_duplicates()"],
            answer: 1,
            explain: "transform() returns a Series/DataFrame aligned with the original index, ideal for group-level feature engineering."
          },
          {
            q: "Which technique reduces finding the maximum sum of any contiguous subarray of size K from O(N*K) to O(N)?",
            options: ["Binary Search", "Sliding Window", "Bubble Sort", "Depth-First Search"],
            answer: 1,
            explain: "A fixed-size Sliding Window adds the entering element and subtracts the leaving element in O(1) per step."
          }
        ]
      },
      {
        week: 3,
        phase: 1,
        title: "Inferential Statistics, ANOVA & Resume Integration (Fast-Track)",
        badge: "Already Mastered — Claim Resume Credit!",
        priority: "FAST-TRACK",
        summary: "You already know Bayes' theorem, CLT, Z/t-tests, Chi-Square, ANOVA, p-values, Type I/II errors, and ADF! Use this week to embed those proofs into your resume and projects.",
        concepts: [
          {
            id: "w3_c1",
            title: "Connecting ANOVA, Chi-Square & ADF Tests to Your Resume Projects",
            notes: "Claim credit on your resume by running a one-way ANOVA on delivery times across Blinkit, Swiggy Instamart, and JioMart, and documenting the ADF stationarity p-value threshold (p < 0.05) inside QueryMind.",
            ytTitle: "SWAYAM / NPTEL — Data Analytics with Python (IIT Roorkee Preview)",
            ytUrl: "https://onlinecourses.nptel.ac.in/noc26_cs86/preview",
            yt2Title: "SWAYAM / NPTEL — Data Science for Engineers (IIT Madras)",
            yt2Url: "https://nptel.ac.in/courses/106106179",
            docTitle: "NPTEL Data Science Domain Portal",
            docUrl: "https://nptel.ac.in/domains/discipline/106?course=106_1"
          }
        ],
        dailyTasks: [
          { id: "w3_d1", day: "Mon", text: "Add the new 'Statistical Modeling & Experimentation' line to your Resum.docx skills section." },
          { id: "w3_d2", day: "Tue", text: "Run scipy.stats.f_oneway (ANOVA) & chi2_contingency on your 100K Quick-Commerce dataset." },
          { id: "w3_d3", day: "Wed", text: "Update your QueryMind bullet to explicitly cite Augmented Dickey-Fuller (ADF) stationarity testing (p < 0.05)." },
          { id: "w3_d4", day: "Thu", text: "Practice explaining Type I (False Positive) vs Type II (False Negative) errors using medical & manufacturing examples." },
          { id: "w3_d5", day: "Fri", text: "Solve 20 rapid-fire conditional probability & Bayes' theorem placement MCQs." },
          { id: "w3_d6", day: "Sat", text: "Commit your statistical hypothesis testing notebook to GitHub." },
          { id: "w3_d7", day: "Sun", text: "Verify mastery on the Week 3 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "In the Augmented Dickey-Fuller (ADF) test used in QueryMind, what does a p-value < 0.05 indicate?",
            options: ["The series has a unit root and is non-stationary", "We reject the null hypothesis of a unit root; the series is stationary", "The series requires seasonal differencing D=2", "ARIMA cannot be applied"],
            answer: 1,
            explain: "The null hypothesis (H0) of the ADF test is that a unit root is present (non-stationary). p < 0.05 rejects H0, confirming stationarity."
          },
          {
            q: "Which statistical test compares the mean delivery time across 3 or more independent quick-commerce platforms (Blinkit, Swiggy, JioMart)?",
            options: ["One-Sample Z-test", "Paired Student's t-test", "One-Way ANOVA (F-test)", "Pearson Correlation"],
            answer: 2,
            explain: "One-Way Analysis of Variance (ANOVA) tests whether the means of 3 or more independent groups differ significantly."
          },
          {
            q: "In a plant disease screening model, failing to detect an actual diseased crop leaf is which type of error?",
            options: ["Type I Error (False Positive)", "Type II Error (False Negative)", "Multicollinearity Error", "Heteroscedasticity"],
            answer: 1,
            explain: "A False Negative (missing a true positive condition) is a Type II error (beta), which reduces Recall."
          }
        ]
      },
      {
        week: 4,
        phase: 2,
        title: "Linear/Logistic Regression, OLS Assumptions & L1/L2 Regularization",
        badge: "Gap #1A: Core ML Math",
        priority: "CRITICAL",
        summary: "Upgrade beyond 'basic linear regression' by mastering OLS assumptions, VIF multicollinearity, Ridge (L2) vs. Lasso (L1) geometry, and Logistic Regression log-odds.",
        concepts: [
          {
            id: "w4_c1",
            title: "Ridge (L2) vs. Lasso (L1) Regularization & Bias-Variance Tradeoff",
            notes: "L1 (Lasso) adds lambda * sum(|w_j|); its diamond constraint corners lie on coordinate axes, driving weak feature weights to exact zero (feature selection). L2 (Ridge) adds lambda * sum(w_j^2), shrinking correlated weights proportionally.",
            ytTitle: "StatQuest — Regularization Part 1: Ridge (L2) Regression",
            ytUrl: "https://www.youtube.com/watch?v=Q81RR3yKn30",
            yt2Title: "StatQuest — Regularization Part 2: Lasso (L1) Regression",
            yt2Url: "https://www.youtube.com/watch?v=NGf0voTMlcs",
            docTitle: "scikit-learn Official Docs: Linear Models (Ridge, Lasso, Logistic)",
            docUrl: "https://scikit-learn.org/stable/supervised_learning.html"
          },
          {
            id: "w4_c2",
            title: "Visualizing Ridge vs. Lasso & Scikit-Learn Implementation",
            notes: "Always standardize features (StandardScaler) before applying L1/L2 regularization so penalty terms treat all features equally regardless of unit scale.",
            ytTitle: "StatQuest — Ridge vs Lasso Regression, Visualized!",
            ytUrl: "https://www.youtube.com/watch?v=Xm2C_gTAl8c",
            yt2Title: "Scikit-Learn Full Crash Course — Python Machine Learning",
            yt2Url: "https://www.youtube.com/watch?v=SIEaLBXr0rk",
            docTitle: "scikit-learn User Guide",
            docUrl: "https://scikit-learn.org/stable/user_guide.html"
          }
        ],
        dailyTasks: [
          { id: "w4_d1", day: "Mon", text: "Watch StatQuest Ridge (L2) and Lasso (L1) videos; derive the gradient update rule on paper." },
          { id: "w4_d2", day: "Tue", text: "Master the 4 OLS assumptions (LINE) and how Variance Inflation Factor (VIF > 5) detects multicollinearity." },
          { id: "w4_d3", day: "Wed", text: "Derive Binary Cross-Entropy loss and Sigmoid log-odds for Logistic Regression." },
          { id: "w4_d4", day: "Thu", text: "Implement Linear & Logistic Regression with Gradient Descent from scratch using only NumPy." },
          { id: "w4_d5", day: "Fri", text: "Compare Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-Batch GD." },
          { id: "w4_d6", day: "Sat", text: "Update your Resum.docx Machine Learning skills line to remove 'basic ml algorithm'." },
          { id: "w4_d7", day: "Sun", text: "Complete Week 4 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "Why does Lasso (L1) regularization produce sparse models (setting some feature weights to exact zero) while Ridge (L2) does not?",
            options: ["L1 uses a squared penalty", "L1's absolute-value penalty has a constant subgradient (+/- lambda) and diamond-shaped constraint corners on the axes", "L1 ignores the learning rate", "L2 does not penalize large weights"],
            answer: 1,
            explain: "The L1 norm forms a diamond-shaped constraint region whose sharp corners sit directly on the coordinate axes where weights equal zero."
          },
          {
            q: "Why MUST you apply StandardScaler before training Ridge or Lasso regression?",
            options: ["Tree models require scaling", "Regularization penalizes coefficient magnitude, which depends on feature measurement units unless standardized", "To increase multicollinearity", "To convert classification into regression"],
            answer: 1,
            explain: "If one feature is in rupees and another is in kilometers, unscaled L1/L2 penalties unfairly penalize the feature with smaller numerical units."
          },
          {
            q: "Which metric quantifies multicollinearity among predictor variables in Linear Regression?",
            options: ["Gini Impurity", "Variance Inflation Factor (VIF)", "Silhouette Score", "BLEU Score"],
            answer: 1,
            explain: "VIF = 1 / (1 - R_j^2) measures how much the variance of an estimated regression coefficient is inflated due to collinearity."
          }
        ]
      },
      {
        week: 5,
        phase: 2,
        title: "Decision Trees, Random Forests & XGBoost (Closing Gap #1)",
        badge: "Priority #1 Portfolio Bridge",
        priority: "CRITICAL",
        summary: "Master the #1 topic in Data Science placement interviews: Tree splitting criteria (Gini vs. Entropy), Bagging (Random Forest), and Boosting (XGBoost/LightGBM).",
        concepts: [
          {
            id: "w5_c1",
            title: "Decision Trees & Random Forests (Bagging & Out-of-Bag Error)",
            notes: "Decision Trees split nodes to maximize Information Gain (or minimize Gini Impurity = 1 - sum(p_i^2)). Random Forests train deep trees in parallel on bootstrap samples + random feature subsets to reduce Variance.",
            ytTitle: "StatQuest — Decision and Classification Trees, Clearly Explained!",
            ytUrl: "https://www.youtube.com/watch?v=_L39rN6gz7Y",
            yt2Title: "StatQuest — Random Forests Part 1: Building, Using and Evaluating",
            yt2Url: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ",
            docTitle: "XGBoost Official Python Package Documentation",
            docUrl: "https://xgboost.readthedocs.io/en/stable/python/index.html"
          },
          {
            id: "w5_c2",
            title: "XGBoost Mathematical Intuition: Taylor Expansion, Gain & Regularization",
            notes: "XGBoost builds shallow trees sequentially to reduce Bias. It uses first-order gradients (g_i) and second-order Hessians (h_i) with L1/L2 tree complexity penalties (gamma, lambda).",
            ytTitle: "StatQuest — XGBoost Part 1: Regression Clearly Explained",
            ytUrl: "https://www.youtube.com/watch?v=OtD8wVaFm6E",
            yt2Title: "IBM Technology — What is Random Forest?",
            yt2Url: "https://www.youtube.com/watch?v=gkXX4h3qYm4",
            docTitle: "XGBoost Hyperparameters Official Guide",
            docUrl: "https://xgboost.readthedocs.io/en/stable/parameter.html"
          }
        ],
        dailyTasks: [
          { id: "w5_d1", day: "Mon", text: "Watch StatQuest Decision Trees & Random Forests; calculate Gini Impurity and Entropy by hand for a toy split." },
          { id: "w5_d2", day: "Tue", text: "Watch StatQuest XGBoost; learn how Similarity Score and Gain use gradients (g) and Hessians (h)." },
          { id: "w5_d3", day: "Wed", text: "Load your 100,000-order Quick-Commerce dataset in Python and engineer features for Delivery SLA Breach." },
          { id: "w5_d4", day: "Thu", text: "Train a RandomForestClassifier and XGBClassifier on the 100K dataset with StratifiedKFold." },
          { id: "w5_d5", day: "Fri", text: "Tune max_depth, learning_rate, subsample, and colsample_bytree; log ROC-AUC and PR-AUC." },
          { id: "w5_d6", day: "Sat", text: "Push the Quick-Commerce XGBoost SLA Breach notebook to GitHub and add the bullet to Resum.docx." },
          { id: "w5_d7", day: "Sun", text: "Complete Week 5 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "What is the fundamental difference between Bagging (Random Forest) and Boosting (XGBoost)?",
            options: ["Bagging reduces Bias sequentially; Boosting reduces Variance in parallel", "Bagging trains independent deep trees in parallel to reduce Variance; Boosting trains sequential shallow trees on residuals to reduce Bias", "Random Forest requires feature scaling while XGBoost does not", "XGBoost cannot handle tabular data"],
            answer: 1,
            explain: "Bagging averages independent high-variance trees in parallel (reducing variance), while Boosting adds shallow trees sequentially to correct prior errors (reducing bias)."
          },
          {
            q: "Do Random Forests or XGBoost require StandardScaler or MinMaxScaler on numerical features?",
            options: ["Yes, otherwise gradients explode", "No, tree splits are based on monotonic feature ordering thresholds and are invariant to monotonic scaling", "Only when using Gini Impurity", "Yes, for all categorical features"],
            answer: 1,
            explain: "Tree-based algorithms partition data using order-based thresholds (e.g., age > 30), which remain identical under linear scaling."
          },
          {
            q: "In XGBoost, what does the second-order Taylor expansion introduce alongside the first derivative (gradient g_i)?",
            options: ["The Fourier transform", "The second derivative (Hessian h_i) of the loss function", "K-Means centroids", "Dropout masks"],
            answer: 1,
            explain: "XGBoost uses both first-order gradients (g_i) and second-order Hessians (h_i) to compute optimal leaf weights and split gain analytically."
          }
        ]
      },
      {
        week: 6,
        phase: 2,
        title: "Imbalanced Metrics (ROC-AUC vs. PR-AUC), K-Means, PCA & SHAP",
        badge: "Gap #1C: Model Evaluation & Explainability",
        priority: "HIGH",
        summary: "Master Precision-Recall trade-offs on skewed data, unsupervised clustering (K-Means, PCA), leak-free scikit-learn Pipelines, and SHAP model explainability.",
        concepts: [
          {
            id: "w6_c1",
            title: "Confusion Matrix, ROC-AUC vs. Precision-Recall AUC & Imbalanced Data",
            notes: "When positive class is rare (e.g., 1% hardware failures at HPE), True Negatives (TN) flood the False Positive Rate denominator, making ROC-AUC look deceptively high. Always use PR-AUC and F1/F-beta for rare events.",
            ytTitle: "StatQuest — ROC and AUC, Clearly Explained!",
            ytUrl: "https://www.youtube.com/watch?v=4jRBRDbJemM",
            yt2Title: "StatQuest — The Confusion Matrix Clearly Explained",
            yt2Url: "https://www.youtube.com/watch?v=Kdsp6soqA7o",
            docTitle: "SHAP Official Documentation (TreeExplainer)",
            docUrl: "https://shap.readthedocs.io/en/latest/generated/shap.TreeExplainer.html"
          },
          {
            id: "w6_c2",
            title: "K-Means Clustering, Principal Component Analysis (PCA) & SHAP Values",
            notes: "PCA finds orthogonal eigenvectors of the covariance matrix that maximize explained variance. SHAP uses game-theoretic Shapley values to explain local and global feature attributions.",
            ytTitle: "StatQuest — Principal Component Analysis (PCA), Step-by-Step",
            ytUrl: "https://www.youtube.com/watch?v=FgakZw6K1QQ",
            yt2Title: "StatQuest — K-Means Clustering Clearly Explained & SHAP Python Tutorial",
            yt2Url: "https://www.youtube.com/watch?v=4b5d3muPQmA",
            docTitle: "SHAP ReadTheDocs Portal",
            docUrl: "https://shap.readthedocs.io/"
          }
        ],
        dailyTasks: [
          { id: "w6_d1", day: "Mon", text: "Watch StatQuest ROC-AUC & Confusion Matrix; write down why PR-AUC beats ROC-AUC on 99:1 imbalanced data." },
          { id: "w6_d2", day: "Tue", text: "Watch StatQuest K-Means & PCA; understand Elbow method, Silhouette Score, and explained variance ratio." },
          { id: "w6_d3", day: "Wed", text: "Learn how Data Leakage happens when scaling/imputing BEFORE train_test_split; build a scikit-learn Pipeline." },
          { id: "w6_d4", day: "Thu", text: "Generate SHAP TreeExplainer summary and waterfall plots for your Week 5 Quick-Commerce XGBoost model." },
          { id: "w6_d5", day: "Fri", text: "Apply K-Means customer/order segmentation on your 100K Quick-Commerce dataset." },
          { id: "w6_d6", day: "Sat", text: "Save SHAP plots into your GitHub repo README." },
          { id: "w6_d7", day: "Sun", text: "Complete Week 6 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "Why can ROC-AUC be misleadingly optimistic on a dataset with 99% negative examples and 1% positive examples?",
            options: ["ROC-AUC ignores True Positives", "Massive True Negatives (TN) keep False Positive Rate = FP/(FP+TN) tiny even when False Positives outnumber True Positives", "ROC-AUC only works for linear models", "ROC-AUC requires balanced batch sizes"],
            answer: 1,
            explain: "Because TN is huge in imbalanced datasets, FPR remains small even with many false alarms; Precision-Recall AUC excludes TN and exposes low precision."
          },
          {
            q: "How do you prevent data leakage during K-Fold Cross-Validation when applying StandardScaler and SMOTE?",
            options: ["Fit StandardScaler on the entire dataset before splitting", "Put StandardScaler and SMOTE inside an imblearn/scikit-learn Pipeline so they fit ONLY on each training fold", "Scale the test set separately using its own mean", "Drop all numerical columns"],
            answer: 1,
            explain: "Fitting preprocessors on the full dataset leaks validation fold statistics into training; Pipelines fit strictly on the training fold inside each split."
          },
          {
            q: "What do the principal components in PCA mathematically represent?",
            options: ["Cluster centroids from K-Means", "Orthogonal eigenvectors of the data's covariance matrix ordered by their eigenvalues (explained variance)", "Decision tree leaf nodes", "Lasso regression residuals"],
            answer: 1,
            explain: "PCA computes orthogonal eigenvectors of the covariance matrix; the largest eigenvalue corresponds to the direction of maximum variance (PC1)."
          }
        ]
      },
      {
        week: 7,
        phase: 3,
        title: "Deep Learning Refactoring: Fixing Your 52.5M-Parameter Plant Disease CNN",
        badge: "Gap #5: CNN Architecture Defense",
        priority: "HIGH",
        summary: "Turn your Plant Disease CNN from an interview vulnerability (52.5M parameters in 4 blocks) into a masterclass by refactoring with Global Average Pooling and OOD thresholding.",
        concepts: [
          {
            id: "w7_c1",
            title: "Why Your 4-Block CNN Has 52.5M Parameters & The AdaptiveAvgPool2d Fix",
            notes: "After 4 max-pool layers on a 224x224 image, a 512x14x14 feature map flattens to 100,352 units. Connecting 100,352 -> 512 in nn.Linear creates 51.38M parameters! Replacing Flatten with nn.AdaptiveAvgPool2d((1,1)) collapses 14x14 to 1x1, cutting parameters to ~1.2M.",
            ytTitle: "PyTorch AdaptiveAvgPool2d & Average Pooling Incorporation",
            ytUrl: "https://www.youtube.com/watch?v=oQJfV8lgcjQ",
            yt2Title: "StatQuest — Confusion Matrix & Multi-Class Macro-F1 Evaluation",
            yt2Url: "https://www.youtube.com/watch?v=Kdsp6soqA7o",
            docTitle: "PyTorch Official Docs: torch.nn.AdaptiveAvgPool2d",
            docUrl: "https://docs.pytorch.org/docs/stable/generated/torch.nn.AdaptiveAvgPool2d.html"
          }
        ],
        dailyTasks: [
          { id: "w7_d1", day: "Mon", text: "Calculate the exact layer-by-layer parameter count of your 4-block Plant Disease CNN using sum(p.numel() for p in model.parameters())." },
          { id: "w7_d2", day: "Tue", text: "Replace nn.Flatten() with nn.AdaptiveAvgPool2d((1, 1)) in your PyTorch model and verify parameters drop by >95%." },
          { id: "w7_d3", day: "Wed", text: "Compute and record Validation Accuracy and Macro-F1 across all 39 PlantVillage classes." },
          { id: "w7_d4", day: "Thu", text: "Add a Softmax confidence threshold (< 0.70 -> 'Unsupported Crop / Out-of-Distribution Leaf') in your Flask route." },
          { id: "w7_d5", day: "Fri", text: "Review BatchNorm & Dropout behavior during model.train() vs model.eval() with torch.no_grad()." },
          { id: "w7_d6", day: "Sat", text: "Update your Plant Disease CNN bullet on Resum.docx and push the refactored code to GitHub." },
          { id: "w7_d7", day: "Sun", text: "Complete Week 7 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "In your 4-block CNN on 224x224 images, where did over 95% of the 52.5 million parameters originate?",
            options: ["The first 3x3 convolutional layer", "The MaxPool2d layers", "The first dense nn.Linear(100352, 512) layer immediately after flattening the 512x14x14 feature map", "The 39-class Softmax output activation"],
            answer: 2,
            explain: "Pooling layers have 0 parameters and conv layers share small 3x3 kernels; flattening 512x14x14 = 100,352 into 512 dense neurons creates 51.38M weights."
          },
          {
            q: "How does nn.AdaptiveAvgPool2d((1, 1)) solve the dense-layer parameter explosion?",
            options: ["It drops 38 of the 39 classes", "It averages each 14x14 spatial feature map into a single 1x1 scalar, reducing the vector from 100,352 to 512 features", "It converts RGB images to grayscale", "It removes all convolutional layers"],
            answer: 1,
            explain: "Global Average Pooling reduces each channel's spatial HxW grid to 1x1, shrinking the linear layer input from 512*14*14 to just 512."
          },
          {
            q: "Why did your 39-class PlantVillage CNN output a high probability for an unseen paddy leaf?",
            options: ["PlantVillage only contains paddy images", "Standard Softmax is a closed-set function forced to sum to 1.0 across the 39 known classes even on Out-of-Distribution inputs", "Flask corrupted the image bytes", "PyTorch automatically retrains on every upload"],
            answer: 1,
            explain: "Closed-set Softmax partitions 100% of probability mass across known training classes; uncalibrated ReLU activations on similar lesion textures trigger high confidence."
          }
        ]
      },
      {
        week: 8,
        phase: 3,
        title: "Time-Series Forecasting Defense: Prophet vs. ARIMA in QueryMind",
        badge: "Project #1 Deep-Dive",
        priority: "MEDIUM-HIGH",
        summary: "Master the statistical defense of QueryMind's forecasting engine: Prophet decomposition, ARIMA (p,d,q) order selection via ADF/ACF/PACF, and Walk-Forward Validation.",
        concepts: [
          {
            id: "w8_c1",
            title: "ARIMA (p,d,q) vs. Meta Prophet: Decomposition & Fallback Triggers",
            notes: "Prophet models y(t) = g(t) [trend] + s(t) [Fourier seasonality] + h(t) [holidays] + e_t. When series length is short (< 2 seasonal cycles) or non-seasonal, fallback to ARIMA(p,d,q) using ADF for d, PACF for AR(p), and ACF for MA(q).",
            ytTitle: "Krish Naik — Forecasting Future Sales Using ARIMA and SARIMAX",
            ytUrl: "https://www.youtube.com/watch?v=2XGSIlgUBDI",
            yt2Title: "Lianne & Justin — How to Build ARIMA Models in Python for Time Series",
            yt2Url: "https://www.youtube.com/watch?v=-aCF0_wfVwY",
            docTitle: "Meta Prophet Official Quick Start Documentation",
            docUrl: "https://facebook.github.io/prophet/docs/quick_start.html"
          }
        ],
        dailyTasks: [
          { id: "w8_d1", day: "Mon", text: "Watch Krish Naik's ARIMA/SARIMAX tutorial and review Meta Prophet's official diagnostics guide." },
          { id: "w8_d2", day: "Tue", text: "Review how ACF identifies Moving Average order (q) and PACF identifies Autoregressive order (p)." },
          { id: "w8_d3", day: "Wed", text: "Verify why random train_test_split causes temporal data leakage and implement Walk-Forward Validation." },
          { id: "w8_d4", day: "Thu", text: "Write a backtesting script in QueryMind comparing Prophet vs ARIMA using RMSE and MAPE." },
          { id: "w8_d5", day: "Fri", text: "Document the exact fallback condition (row count / convergence check) in QueryMind's README." },
          { id: "w8_d6", day: "Sat", text: "Practice explaining HPE GreenLake server telemetry forecasting using your Prophet/ARIMA architecture." },
          { id: "w8_d7", day: "Sun", text: "Complete Week 8 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "Why must you NEVER use a random k-fold or random train_test_split when evaluating time-series models like Prophet or ARIMA?",
            options: ["It takes too much CPU memory", "It leaks future observations into the training set to predict the past, causing severe look-ahead bias", "Prophet only accepts sorted strings", "RMSE cannot be calculated on random splits"],
            answer: 1,
            explain: "Time-series evaluation requires temporal ordering (Walk-Forward / Rolling-Origin validation) so future data never leaks into past training windows."
          },
          {
            q: "In ARIMA(p, d, q), which plot is primarily used to determine the Autoregressive order (p)?",
            options: ["ROC Curve", "Partial Autocorrelation Function (PACF) plot", "SHAP Waterfall plot", "Histogram of target values"],
            answer: 1,
            explain: "PACF measures correlation between y_t and y_{t-k} after removing intermediate lags, cutting off sharply after lag p for an AR(p) process."
          },
          {
            q: "What are the three main additive/multiplicative components in Meta Prophet's forecasting equation y(t) = g(t) + s(t) + h(t) + e_t?",
            options: ["Gradient, Stride, Hidden layer", "Piecewise Trend g(t), Fourier Seasonality s(t), and Holiday Effects h(t)", "Gini, Support, Homoscedasticity", "Grouping, Sorting, Having"],
            answer: 1,
            explain: "Prophet decomposes time series into piecewise linear/logistic trend g(t), periodic Fourier seasonality s(t), and user-supplied holiday effects h(t)."
          }
        ]
      },
      {
        week: 9,
        phase: 3,
        title: "LLM Text-to-SQL Guardrails & Big Data Architecture Credibility",
        badge: "Gap #6 & Big Data Defense",
        priority: "MEDIUM-HIGH",
        summary: "Bulletproof your QueryMind LLM architecture (Llama 3.3 70B & Gemini) with a 50-query accuracy benchmark, and prepare honest answers for Snowflake/Hive/Star Schema.",
        concepts: [
          {
            id: "w9_c1",
            title: "Power BI Star Schema & VertiPaq Compression vs. Flat Tables",
            notes: "Splitting a 100K-row flat CSV into Fact_Orders and Dim_Platform/Dim_Date enables VertiPaq dictionary compression, unambiguous 1:* filter propagation, and DAX Time Intelligence.",
            ytTitle: "Guy in a Cube — Why Power BI Loves a Star Schema",
            ytUrl: "https://www.youtube.com/watch?v=vZndrBBPiQc",
            yt2Title: "Chandoo — Learn Data Modeling & Star Schema for Power BI in 20 Minutes",
            yt2Url: "https://www.youtube.com/watch?v=4ePNrdxWtY0",
            docTitle: "SHAP Explainable AI Overviews",
            docUrl: "https://shap.readthedocs.io/en/latest/overviews.html"
          }
        ],
        dailyTasks: [
          { id: "w9_d1", day: "Mon", text: "Review QueryMind's SQL sanitizer: ensure read-only SQLite URI (?mode=ro) and DDL/DML blocklist are documented." },
          { id: "w9_d2", day: "Tue", text: "Run QueryMind across 50 test questions and record 1st-attempt Execution Accuracy vs Post-Retry Accuracy." },
          { id: "w9_d3", day: "Wed", text: "Add the 50-query benchmark table to your QueryMind GitHub README and Resum.docx." },
          { id: "w9_d4", day: "Thu", text: "Watch Guy in a Cube Star Schema video; write 3 core DAX measures (CALCULATE, DIVIDE, DATEADD) from memory." },
          { id: "w9_d5", day: "Fri", text: "Tier your Resum.docx Databases line (Proficient: SQL, SQLite, Star Schema | Familiar: MongoDB, Snowflake, Hive)." },
          { id: "w9_d6", day: "Sat", text: "Review Snowflake's separation of cloud storage and virtual compute warehouses." },
          { id: "w9_d7", day: "Sun", text: "Complete Week 9 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "When evaluating an LLM Text-to-SQL system like QueryMind, why is Execution Accuracy preferred over Exact SQL String Match?",
            options: ["String matching is too slow", "Two syntactically different SQL queries (e.g., using a CTE vs. a subquery) can produce the exact same valid result table", "LLMs cannot generate SELECT statements", "SQLite does not support strings"],
            answer: 1,
            explain: "Multiple valid SQL formulations return identical DataFrames; Execution Accuracy compares the actual query output rather than penalizing valid syntax variations."
          },
          {
            q: "What is the safest database-level defense against destructive SQL queries in an LLM-to-SQL SQLite application?",
            options: ["Asking the LLM politely in the system prompt", "Opening the SQLite connection in read-only URI mode (file:db.sqlite?mode=ro) combined with statement sanitization", "Setting temperature to 1.0", "Using CSV files without a database"],
            answer: 1,
            explain: "Prompt instructions can be bypassed via prompt injection; enforcing read-only database permissions at the driver level guarantees tables cannot be modified."
          },
          {
            q: "Why does Power BI's VertiPaq engine perform better on a Star Schema than a wide flat table?",
            options: ["Star Schemas eliminate all numbers", "Dimension tables deduplicate repeated strings using integer surrogate keys, improving columnar compression and unambiguous 1:* DAX filter propagation", "Power BI cannot load CSV files with 11 columns", "Star Schemas disable DAX measures"],
            answer: 1,
            explain: "Normalizing repeated text attributes into dimension tables with surrogate keys compresses memory and ensures clean one-to-many filter context."
          }
        ]
      },
      {
        week: 10,
        phase: 4,
        title: "MLOps, FastAPI vs. Flask Deployment & Pytest Engineering",
        badge: "Production Readiness",
        priority: "MEDIUM",
        summary: "Articulate why your 28-test pytest suite and FastAPI/Flask skills make you a production-ready Data Scientist rather than a notebook-only fresher.",
        concepts: [
          {
            id: "w10_c1",
            title: "FastAPI (Async ASGI & Pydantic) vs. Flask (Sync WSGI)",
            notes: "Flask uses synchronous WSGI workers that block during slow LLM network calls. FastAPI uses asynchronous ASGI (Uvicorn) and Pydantic BaseModel type validation, ideal for concurrent ML/LLM microservices.",
            ytTitle: "Pixegami — Python FastAPI Tutorial: Build a REST API in 15 Minutes",
            ytUrl: "https://www.youtube.com/watch?v=iWS9ogMPOI0",
            yt2Title: "Pixegami — Pydantic Tutorial: Solving Python's Biggest Problem",
            yt2Url: "https://www.youtube.com/watch?v=XIdQ6gO3Anc",
            docTitle: "FastAPI Official Tutorial & User Guide",
            docUrl: "https://fastapi.tiangolo.com/tutorial/"
          }
        ],
        dailyTasks: [
          { id: "w10_d1", day: "Mon", text: "Watch Pixegami's FastAPI and Pydantic tutorials; compare Flask WSGI vs FastAPI ASGI." },
          { id: "w10_d2", day: "Tue", text: "Review your 28 pytest tests in QueryMind; practice explaining how unittest.mock isolates LLM API calls." },
          { id: "w10_d3", day: "Wed", text: "Create a FastAPI inference endpoint with Pydantic input validation for your Quick-Commerce XGBoost model." },
          { id: "w10_d4", day: "Thu", text: "Add architecture diagrams and badges to your top 3 GitHub repository READMEs." },
          { id: "w10_d5", day: "Fri", text: "Verify all 3 GitHub repositories have clean requirements.txt and zero hardcoded API keys." },
          { id: "w10_d6", day: "Sat", text: "Pin QueryMind, Plant-Disease-CNN, and Quick-Commerce-ML-BI on your GitHub profile." },
          { id: "w10_d7", day: "Sun", text: "Complete Week 10 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "Why is FastAPI often preferred over Flask for serving LLM-backed APIs like QueryMind under concurrent traffic?",
            options: ["FastAPI does not use Python", "FastAPI runs on asynchronous ASGI (async/await) so worker threads don't block while waiting on external Groq/Gemini API I/O, and validates schemas via Pydantic", "Flask cannot return JSON", "FastAPI automatically trains neural networks"],
            answer: 1,
            explain: "Asynchronous I/O lets FastAPI handle many concurrent requests waiting on external LLM API responses without blocking worker processes."
          },
          {
            q: "When writing unit tests with pytest for an LLM pipeline, how do you test the self-healing retry loop deterministically without spending API credits?",
            options: ["Skip testing the retry loop", "Use unittest.mock / monkeypatch to simulate a sequence of a failing SQL response followed by a corrected SQL response", "Run the test only once a year", "Delete the database before testing"],
            answer: 1,
            explain: "Mocking the LLM client lets you inject deterministic failure-then-success sequences to verify retry state transitions and error formatting reliably."
          },
          {
            q: "In PyTorch inference inside a Flask/FastAPI endpoint, why must you call model.eval() and wrap prediction in with torch.no_grad():?",
            options: ["To double the parameter count", "model.eval() switches BatchNorm/Dropout to inference mode, and torch.no_grad() disables autograd graph construction to save memory and speed up inference", "To delete the model weights after one prediction", "To convert the model to SQLite"],
            answer: 1,
            explain: "model.eval() fixes running BatchNorm stats and disables Dropout, while torch.no_grad() prevents storing intermediate activations for backpropagation."
          }
        ]
      },
      {
        week: 11,
        phase: 4,
        title: "ML System Design & Enterprise Case Studies (HPE & Quick-Commerce)",
        badge: "Stage 3 Round Prep",
        priority: "HIGH",
        summary: "Practice structuring open-ended ML System Design questions: HPE Server Telemetry Anomaly Detection, Quick-Commerce ETA Prediction, and Concept Drift Monitoring.",
        concepts: [
          {
            id: "w11_c1",
            title: "End-to-End ML System Design: From Business KPI to Drift Monitoring",
            notes: "Follow a 5-step framework in interviews: (1) Clarify Business KPI vs. ML Proxy Metric; (2) Data Ingestion & Feature Engineering; (3) Baseline vs. Advanced Model Selection; (4) Offline Evaluation vs. Online A/B Test; (5) Deployment & Drift Monitoring (PSI).",
            ytTitle: "A Data Odyssey — SHAP with Python (Code and Explanations)",
            ytUrl: "https://www.youtube.com/watch?v=L8_sVRhBDLU",
            yt2Title: "SWAYAM / NPTEL — Python for Data Science (IIT Madras)",
            yt2Url: "https://onlinecourses.nptel.ac.in/noc26_cs107/preview",
            docTitle: "HCL GUVI Data Science & Project Program",
            docUrl: "https://www.guvi.in/courses/data-science/data-science-and-project/"
          }
        ],
        dailyTasks: [
          { id: "w11_d1", day: "Mon", text: "Write a 1-page ML System Design brief for HPE GreenLake Server Telemetry Anomaly & Failure Prediction." },
          { id: "w11_d2", day: "Tue", text: "Write a 1-page ML System Design brief for Real-Time Delivery ETA Prediction on Blinkit/Swiggy Instamart." },
          { id: "w11_d3", day: "Wed", text: "Learn Population Stability Index (PSI) and Kolmogorov-Smirnov test for detecting data/concept drift." },
          { id: "w11_d4", day: "Thu", text: "Prepare 6 behavioural STAR stories (SIIT internship, paddy class debugging, QueryMind self-healing architecture)." },
          { id: "w11_d5", day: "Fri", text: "Rehearse your 90-second 'Tell Me About Yourself' pitch out loud and record yourself." },
          { id: "w11_d6", day: "Sat", text: "Conduct a 45-minute peer or self-recorded mock Project Defense session." },
          { id: "w11_d7", day: "Sun", text: "Complete Week 11 SWAYAM Graded Assessment." }
        ],
        quiz: [
          {
            q: "When designing a hardware predictive maintenance model for Hewlett Packard Enterprise (HPE) where server failures occur in 0.5% of telemetry windows, which evaluation metric should guide threshold tuning?",
            options: ["Raw Classification Accuracy", "Precision-Recall AUC (PR-AUC) and F2-Score (weighting Recall higher to catch costly hardware failures)", "R-squared", "Mean Squared Error"],
            answer: 1,
            explain: "With 99.5% normal telemetry, accuracy is useless; PR-AUC and F-beta (beta > 1) prioritize catching true failures while controlling false alarm fatigue."
          },
          {
            q: "In production ML monitoring, what does Data Drift (Covariate Shift) mean?",
            options: ["The Python version changed", "The distribution of input features P(X) in production has shifted away from the training feature distribution", "The SQLite file was renamed", "The model has zero parameters"],
            answer: 1,
            explain: "Covariate shift occurs when P(X) changes over time (e.g., new crop varieties or monsoon weather patterns), monitored via PSI or KS-tests."
          },
          {
            q: "What are the four components of the STAR framework for answering behavioural and internship questions?",
            options: ["Select, Train, Accuracy, Recall", "Situation, Task, Action, Result", "Schema, Table, Aggregate, Row", "Standardize, Tune, Analyze, Report"],
            answer: 1,
            explain: "STAR stands for Situation, Task, Action, and quantifiable Result."
          }
        ]
      },
      {
        week: 12,
        phase: 4,
        title: "Full-Length Timed Mock Interviews & Placement Application Sprint",
        badge: "Final Placement Sprint",
        priority: "HIGH",
        summary: "Execute 4 full-length 60-minute mock interviews (SQL + Python DSA + Classical ML + Project Defense) and apply systematically with your two tailored resume versions.",
        concepts: [
          {
            id: "w12_c1",
            title: "Final Placement Readiness: Top 6 Coding Patterns & Project Defense",
            notes: "In live interviews, always clarify constraints before coding, state the brute-force complexity first, optimize to O(N), and tie every project answer back to business reliability and metrics.",
            ytTitle: "NeetCode — Top 6 Coding Interview Concepts (DSA)",
            ytUrl: "https://www.youtube.com/watch?v=ft0owvS5tQA",
            yt2Title: "StatQuest — PCA Main Ideas in Only 5 Minutes (Rapid Review)",
            yt2Url: "https://www.youtube.com/watch?v=HMOI_lkzW08",
            docTitle: "StrataScratch Top 30 SQL Query Interview Questions",
            docUrl: "https://www.stratascratch.com/blog/top-30-sql-query-interview-questions"
          }
        ],
        dailyTasks: [
          { id: "w12_d1", day: "Mon", text: "Mock Interview #1 (60 mins): 2 SQL window problems + 2 Python array/hash-map problems under strict timer." },
          { id: "w12_d2", day: "Tue", text: "Mock Interview #2 (60 mins): Classical ML grilling (Linear/Logistic, L1/L2, Random Forest, XGBoost, PCA, PR-AUC)." },
          { id: "w12_d3", day: "Wed", text: "Mock Interview #3 (60 mins): Line-by-line Project Defense of QueryMind, Plant Disease CNN, and Power BI Star Schema." },
          { id: "w12_d4", day: "Thu", text: "Mock Interview #4 (45 mins): ML System Design + HR/Managerial STAR stories + 90-second opening pitch." },
          { id: "w12_d5", day: "Fri", text: "Submit Shanjai_Resume_HPE.pdf to Hewlett Packard Enterprise careers portal + request 5 LinkedIn referrals." },
          { id: "w12_d6", day: "Sat", text: "Submit Shanjai_Resume_General.pdf across campus placement drives and analytics/product portals." },
          { id: "w12_d7", day: "Sun", text: "Complete Final Week 12 SWAYAM Graded Assessment and export your Placement Readiness Certificate log!" }
        ],
        quiz: [
          {
            q: "When uploading your resume to a general campus placement drive (e.g., Deloitte, Tiger Analytics, TCS, Zoho), which version must you use?",
            options: ["The version that says 'seeking a Data Science Intern position at Hewlett Packard Enterprise'", "Your General Master Resume targeting 'Data Scientist / Data Science Intern' roles without hardcoding another company's name", "A resume without graduation dates", "A resume with only 1 project"],
            answer: 1,
            explain: "Hardcoding another company's name in your summary causes immediate rejection in campus drives; keep separate HPE and General resume files."
          },
          {
            q: "If an interviewer asks why you used both Groq (Llama 3.3 70B) and Google Gemini in QueryMind, what is the strongest engineering answer?",
            options: ["To make the code longer", "To benchmark multi-provider LLM SQL generation accuracy, latency, and deterministic fallback resilience across distinct model families", "Because SQLite requires two LLMs", "Because Prophet only works with Gemini"],
            answer: 1,
            explain: "Comparing model families demonstrates production engineering rigor around vendor resilience, accuracy benchmarking, and latency trade-offs."
          },
          {
            q: "What is your daily non-negotiable routine during placement season?",
            options: ["Only reading theory without coding", "2 SQL problems + 1 Python DSA problem every morning, 1 core ML derivation every afternoon, and 1 project/mock drill every evening", "Memorizing code without understanding", "Skipping SQL practice"],
            answer: 1,
            explain: "Consistent daily practice across SQL, Python DSA, Classical ML math, and project defense keeps all 4 placement funnel stages sharp."
          }
        ]
      }
    ];

    // =========================================================================
    // 2. GUVI CODEKATA & SQLKATA INTERACTIVE CHALLENGES
    // =========================================================================
    const KATA_CHALLENGES = [
      {
        id: "kata_sql_window",
        title: "SQLKata #1: Top 2 Products per Quick-Commerce Platform (DENSE_RANK)",
        lang: "SQL (SQLite / PostgreSQL)",
        problem: "Given table Fact_Orders(order_id, platform, product_name, order_value), write a CTE query using DENSE_RANK() to return the top 2 highest-revenue products for each platform (Blinkit, Swiggy Instamart, JioMart).",
        starter: "WITH ProductRevenue AS (\n  SELECT \n    platform,\n    product_name,\n    SUM(order_value) AS total_rev,\n    -- Write your DENSE_RANK() window function below:\n    \n  FROM Fact_Orders\n  GROUP BY platform, product_name\n)\nSELECT platform, product_name, total_rev, rnk\nFROM ProductRevenue\nWHERE rnk <= 2;",
        hint: "Use DENSE_RANK() OVER (PARTITION BY platform ORDER BY SUM(order_value) DESC) AS rnk inside the CTE.",
        solution: "WITH ProductRevenue AS (\n  SELECT \n    platform,\n    product_name,\n    SUM(order_value) AS total_rev,\n    DENSE_RANK() OVER (PARTITION BY platform ORDER BY SUM(order_value) DESC) AS rnk\n  FROM Fact_Orders\n  GROUP BY platform, product_name\n)\nSELECT platform, product_name, total_rev, rnk\nFROM ProductRevenue\nWHERE rnk <= 2;",
        requiredTokens: ["dense_rank", "over", "partition by", "order by", "desc"]
      },
      {
        id: "kata_py_hashmap",
        title: "CodeKata #2: O(N) SLA Breach Platform Aggregator in Python",
        lang: "Python 3 (DSA & Pandas)",
        problem: "Given a list of order dicts `orders = [{'platform': 'Blinkit', 'delayed': 1}, ...]`, write an O(N) function or vectorized Pandas groupby that computes the SLA breach rate (mean of `delayed`) per platform.",
        starter: "import pandas as pd\n\ndef compute_sla_breach_rate(df: pd.DataFrame) -> pd.Series:\n    # Group by 'platform' and return the mean of 'delayed' sorted descending\n    ",
        hint: "Use df.groupby('platform')['delayed'].mean().sort_values(ascending=False)",
        solution: "import pandas as pd\n\ndef compute_sla_breach_rate(df: pd.DataFrame) -> pd.Series:\n    return df.groupby('platform')['delayed'].mean().sort_values(ascending=False)",
        requiredTokens: ["groupby", "platform", "delayed", "mean"]
      },
      {
        id: "kata_cnn_refactor",
        title: "CodeKata #3: Refactoring Your 52.5M-Parameter Plant Disease CNN",
        lang: "PyTorch (Deep Learning)",
        problem: "Replace the massive Flatten(512*14*14) -> Linear(100352, 512) bottleneck in your 4-block CNN with Global Average Pooling (`nn.AdaptiveAvgPool2d((1, 1))`) so the linear layer takes only 512 inputs and outputs 39 classes.",
        starter: "import torch.nn as nn\n\nclass OptimizedPlantCNN(nn.Module):\n    def __init__(self, num_classes=39):\n        super().__init__()\n        # Assume self.conv_blocks outputs shape (batch, 512, 14, 14)\n        # Add AdaptiveAvgPool2d((1, 1)), Flatten, Dropout, and Linear(512, num_classes):\n        self.classifier = nn.Sequential(\n            \n        )",
        hint: "Use nn.AdaptiveAvgPool2d((1, 1)), nn.Flatten(), nn.Dropout(0.3), and nn.Linear(512, num_classes).",
        solution: "import torch.nn as nn\n\nclass OptimizedPlantCNN(nn.Module):\n    def __init__(self, num_classes=39):\n        super().__init__()\n        self.classifier = nn.Sequential(\n            nn.AdaptiveAvgPool2d((1, 1)),\n            nn.Flatten(),\n            nn.Dropout(0.3),\n            nn.Linear(512, num_classes)\n        )",
        requiredTokens: ["adaptiveavgpool2d", "flatten", "linear", "512"]
      },
      {
        id: "kata_xgb_pipeline",
        title: "CodeKata #4: Leak-Free Scikit-Learn + XGBoost Pipeline",
        lang: "Python (scikit-learn & XGBoost)",
        problem: "Construct a leak-free scikit-learn Pipeline combining StandardScaler and XGBClassifier, and evaluate it using StratifiedKFold cross_val_score with scoring='average_precision' (PR-AUC).",
        starter: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.model_selection import StratifiedKFold, cross_val_score\nfrom xgboost import XGBClassifier\n\n# Build pipeline and run cross_val_score with scoring='average_precision':\n",
        hint: "Instantiate Pipeline([('scaler', StandardScaler()), ('xgb', XGBClassifier())]) and call cross_val_score(pipe, X, y, cv=StratifiedKFold(5), scoring='average_precision').",
        solution: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.model_selection import StratifiedKFold, cross_val_score\nfrom xgboost import XGBClassifier\n\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('xgb', XGBClassifier(n_estimators=200, max_depth=5, learning_rate=0.05))\n])\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(pipe, X, y, cv=cv, scoring='average_precision')",
        requiredTokens: ["pipeline", "standardscaler", "xgbclassifier", "stratifiedkfold", "average_precision"]
      }
    ];

    // =========================================================================
    // 3. PORTFOLIO BRIDGE & RESUME FIX CHECKLIST
    // =========================================================================
    const PORTFOLIO_MILESTONES = [
      { id: "pm_1", category: "Resume Fix", text: "Fix Education date placeholder: Replace 'Expected graduation: [month, year]' with 'Expected Graduation: May 2027'." },
      { id: "pm_2", category: "Resume Fix", text: "Rewrite Machine Learning skills line: Replace 'basic ml algorithm...' with 'Supervised & Unsupervised ML (Linear/Logistic Regression, Random Forest, XGBoost, SVM, K-Means, PCA), scikit-learn'." },
      { id: "pm_3", category: "Resume Fix", text: "Add Statistics line to Resume: 'Statistical Modeling: Hypothesis Testing (Z/t-tests, Chi-Square, ANOVA), Bayes' Theorem, CLT, A/B Testing, ADF Stationarity Test'." },
      { id: "pm_4", category: "Resume Fix", text: "Tier Databases & Big Data line: Separate 'Proficient: SQL, SQLite, Star Schema' from 'Familiar: PostgreSQL, MongoDB, Snowflake, Hive' (remove unbacked YARN/Cassandra)." },
      { id: "pm_5", category: "Resume Fix", text: "Maintain 2 Resume PDFs: Shanjai_Resume_HPE.pdf (for HPE) and Shanjai_Resume_General.pdf (for campus drives)." },
      { id: "pm_6", category: "Portfolio Bridge #1", text: "Quick-Commerce ML Upgrade: Train RandomForest & XGBoost SLA Breach Classifier on your 100K dataset + SHAP plots." },
      { id: "pm_7", category: "Portfolio Bridge #2", text: "Plant Disease CNN Upgrade: Replace Flatten bottleneck with nn.AdaptiveAvgPool2d((1,1)) (52.5M -> 1.2M params) + Softmax OOD threshold." },
      { id: "pm_8", category: "Portfolio Bridge #3", text: "QueryMind Benchmark Upgrade: Log 1st-attempt vs. post-retry SQL Execution Accuracy across 50 test queries in README." }
    ];
