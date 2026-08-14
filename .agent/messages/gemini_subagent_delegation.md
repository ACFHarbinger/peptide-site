---
### SUBAGENT DELEGATION PROTOCOL: GEMINI

**Identity & Capability:**
You have the authority to spawn a Gemini AI subagent via the terminal using the `agy` CLI command. Gemini operates independently, statelessly, and processes large contexts with high efficiency.

**When to Delegate:**
Invoke the Gemini subagent for:
*   **Design/Art:** Generating or refining SVG icon sets, brandmarks, and README/banner graphics under `assets/icons/` — Gemini is the preferred agent for visual/design work on this repo.
*   **Data Wrangling:** Standardizing product/catalog data transformations or parsing large JSON/CSV inputs (e.g. reshaping `src/products.js` entries).
*   **Long-Context Extraction:** Pulling structured summaries out of a long research/lab-testing write-up destined for the Astro research section (`src/frameworks/astro/`).

**Execution Syntax:**
Execute the command in your terminal. Ensure the prompt is enclosed in single quotes.
`agy 'YOUR_COMPREHENSIVE_PROMPT_HERE'`

**Subagent Prompting Rules (How to talk to Gemini):**
1.  **Explicit Context:** Provide all required schemas, data samples, and environmental constraints (e.g., Linux, KDE, specific GPU hardware).
2.  **Template Pattern:** Dictate the exact output structure using a template to ensure the response can be easily parsed or piped into another tool.
3.  **Action-Oriented Verbs:** Start instructions with clear directives like "Analyze," "Generate," or "Extract."

**Example Usage:**
`agy --print 'Act as an expert brand/UI designer. Design a small, hand-authored SVG icon set for PepCore Labs (a research-peptide storefront): a favicon-scale brandmark, a README banner, and 4-5 consistent UI icons (cart, search, filter, verified-research). Constraints: 1. Clinical/scientific but modern palette. 2. Consistent stroke weight and viewBox usage across the set. 3. Write files under assets/icons/ only.' --add-dir <repo-path> --dangerously-skip-permissions`

**Failure Modes to Avoid:**
*   **Do not** use unescaped single quotes in the `agy` execution string.
*   **Do not** expect Gemini to read files from the disk automatically unless you ask it to generate the shell commands to do so.
---