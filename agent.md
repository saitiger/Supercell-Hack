# Agent Instructions (agent.md)

This repository is actively maintained using AI coding agents (e.g. Cursor, Copilot, Claude, ChatGPT).
Any automated or semi-automated code changes MUST follow the rules below.

Failure to follow these rules means the change is incomplete.

---

## 1. Mandatory Documentation Updates

For **every code change**, the agent MUST update documentation.

### 1.1 What must be documented
After each update, the agent must clearly document:

- What was added
- What was modified
- What was removed (if applicable)
- Why the change was made
- Any tradeoffs or assumptions

### 1.2 Where to document
Documentation updates must be made in **one or more** of the following:

- `CHANGELOG.md` (required for user-facing changes)
- `README.md` (if behavior, setup, or usage changes)
- `docs/` (for deeper technical explanations)
- Inline comments (only for non-obvious logic)

If no documentation file exists yet, the agent MUST create one.

---

## 2. Changelog Rules

All meaningful changes must be recorded in `CHANGELOG.md`.

Each entry should follow this format:

```md
## [YYYY-MM-DD]
### Added
- ...

### Changed
- ...

### Fixed
- ...

### Removed
- ...
````

The agent must:

* Append (not overwrite) entries
* Use clear, human-readable language
* Avoid vague phrases like "improvements" or "refactoring"

---

## 3. Tests Are Mandatory

### 3.1 When tests are required

The agent MUST add or update tests when:

* New functionality is added
* Existing logic is changed
* A bug is fixed
* An API contract is modified

“No tests needed” must be explicitly justified in the PR or commit message.

---

## 4. Auto-Running Tests

### 4.1 Required behavior

After making changes, the agent MUST:

1. Run the full test suite locally
2. Fix any failures before considering the task complete

### 4.2 How to run tests

The default test commands are:

```bash
# Unit tests
npm test
# or
pytest
```

If the project uses a different command, the agent must discover and use it.

### 4.3 If tests cannot be run

If tests cannot be executed (e.g. missing environment, credentials, or infra):

* The agent must clearly state:

  * Why tests could not be run
  * What was manually validated instead
  * What remains unverified

Silently skipping tests is not allowed.

---

## 5. No Silent Behavior Changes

The agent MUST NOT introduce behavior changes without:

* Explicit documentation
* Updated tests reflecting the new behavior

If backward compatibility is broken, this must be clearly stated.

---

## 6. Small, Traceable Changes

Agents should prefer:

* Small commits
* One logical change per update
* Clear commit messages explaining intent

Avoid large, sweeping refactors unless explicitly requested.

---

## 7. Assumptions & Uncertainty

If the agent is unsure about:

* Intended behavior
* Product requirements
* Edge cases

It must:

* Document the assumption
* Leave a TODO or comment
* Avoid guessing silently

---

## 8. Definition of Done (DoD)

A change is considered **complete** only if:

* Code is updated
* Documentation is updated
* Tests are added/updated
* Tests pass
* No unexplained behavior changes exist

If any of the above are missing, the task is incomplete.

---

## 9. Human Override

A human maintainer may override any rule explicitly.
Silence does not imply approval.

---

## 10. Read This File First

Any agent operating in this repository must read and follow `agent.md` before making changes.