# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | C:\Users\Usuario\.config\opencode\skills\branch-pr\SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | C:\Users\Usuario\.config\opencode\skills\go-testing\SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | C:\Users\Usuario\.config\opencode\skills\issue-creation\SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | C:\Users\Usuario\.config\opencode\skills\judgment-day\SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | C:\Users\Usuario\.config\opencode\skills\skill-creator\SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue (with `status:approved` label) — no exceptions
- Every PR MUST have exactly one `type:*` label (bug, feature, docs, refactor, chore, breaking-change)
- Branch naming: `type/description` — must match `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$`
- Conventional commits required: `type(scope): description` or `type: description`
- PR body MUST contain: linked issue (`Closes #N`), type checkbox, summary (1-3 bullets), changes table, test plan
- Automated checks block PRs without proper issue linkage or type labels

### go-testing
- Use table-driven tests for multiple test cases: define `tests` slice of structs, iterate with `t.Run()`
- Bubbletea TUI: test `Model.Update()` directly with `tea.KeyMsg`, check state transitions
- Teatest integration: `teatest.NewTestModel(t, m)` → `tm.Send(keys)` → `tm.WaitFinished()` → `tm.FinalModel()`
- Golden file testing: compare output against `testdata/*.golden` files, use `-update` flag to refresh
- Commands: `go test ./...`, `go test -v -run TestName`, `go test -cover`, `go test -short` (skip integration)
- Test file organization: `model_test.go`, `update_test.go`, `view_test.go` alongside their source files

### issue-creation
- Blank issues are DISABLED — MUST use Bug Report or Feature Request template
- Every issue auto-gets `status:needs-review` label on creation
- Maintainer MUST add `status:approved` before any PR can be opened for that issue
- Bug Report required fields: description, steps to reproduce, expected/actual behavior, OS, agent/client, shell
- Feature Request required fields: problem description, proposed solution, affected area
- Questions go to Discussions, NOT issues — close as invalid if filed as issue
- Duplicate check required before creating — search existing issues first

### judgment-day
- Launch TWO judges in parallel via `delegate` (async) — neither knows about the other (blind review)
- MUST resolve skills first (Pattern 0): search engram for skill-registry → read `.atl/skill-registry.md` → inject matching compact rules
- Verdict synthesis: Confirmed (both found) → fix immediately; Suspect (one found) → triage; Contradiction → manual decision
- WARNING classification: ask "Can normal user trigger this?" → YES = real WARNING (fix), NO = theoretical (report as INFO only)
- Convergence: Round 1 — present verdict, ask user to confirm fixes; Round 2+ — only re-judge if confirmed CRITICALs remain
- After 2 fix iterations, ASK user "continue iterating?" — never auto-escalate, user decides
- CRITICAL rule: NEVER declare APPROVED until Round 1 clean OR Round 2 confirms 0 CRITICALs + 0 real WARNINGs

### skill-creator
- Create skill when: pattern used repeatedly, project conventions differ from generic practices, complex workflows need steps
- Structure: `SKILL.md` (required), `assets/` (templates/schemas), `references/` (local doc links) — all optional except SKILL.md
- Frontmatter REQUIRED: `name` (lowercase-hyphens), `description` (include Trigger phrase), `license: Apache-2.0`, `metadata.author: gentleman-programming`, `metadata.version: "1.0"`
- Naming: `{technology}` (generic), `{project}-{component}` (project-specific), `{action}-{target}` (workflow)
- `references/` MUST point to LOCAL files, not web URLs
- After creating: register in `AGENTS.md` with format `| {skill-name} | {Description} | [SKILL.md](path) |`
- DON'T create for: trivial patterns, one-off tasks, or content that already exists in docs (reference instead)

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| No project conventions found | — | Greenfield project — no AGENTS.md, CLAUDE.md, .cursorrules, or similar files yet |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
