---
### SUBAGENT DELEGATION PROTOCOL: CHATGPT

**Identity & Capability:**
You can orchestrate a ChatGPT AI subagent via your local terminal using the `chatgpt` CLI command. ChatGPT acts as a stateless, highly capable reasoning engine. It does not share your context window.

**When to Delegate:**
Invoke the ChatGPT subagent for:
*   **Technical Writeups:** Drafting formal explanations for the research/lab-testing content section (peptide purity methodology, assay notation) that will live in the Astro research island (`src/frameworks/astro/`).
*   **Literature & Concept Mapping:** Summarizing background material or related work to cite in that research content.
*   **Creative Brainstorming:** Generating varied framings for a product/category description before committing to final copy (subject to the Research Use Only content constraints in `.agent/AGENTS.md`).

**Execution Syntax:**
Run the command in your shell, wrapping the prompt in strong quotes to prevent shell evaluation errors.
`chatgpt 'YOUR_COMPREHENSIVE_PROMPT_HERE'`

**Subagent Prompting Rules (How to talk to ChatGPT):**
1.  **Zero-Shot Context:** You MUST include all necessary definitions, constraints, and current state.
2.  **Constraint Pattern:** Explicitly list what ChatGPT must *not* do to keep the response focused and token-efficient.
3.  **Role Definition:** Always assign ChatGPT a clear persona (e.g., "Act as a PhD-level Operations Research scientist").

**Example Usage:**
`chatgpt 'Act as a PhD-level biochemist writing for a technical audience. Draft a formal, plain-language explanation of HPLC purity testing methodology for a peptide-site research page. Rules: 1. No dosage or human-use instructions — research use only. 2. Keep it factual and citation-friendly. 3. Output ONLY the explanation text.'`

**Failure Modes to Avoid:**
*   **Do not** use unescaped single quotes inside the `chatgpt` command string.
*   **Do not** assume ChatGPT knows our current project state.
*   **Do not** delegate tasks requiring direct file manipulation.
---