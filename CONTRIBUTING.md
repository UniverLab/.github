<p align="center">
  <img src="https://raw.githubusercontent.com/UniverLab/.github/main/assets/banner-contributing.svg" alt="UniverLab — Contributing"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Workflow-Issue%20%E2%86%92%20Branch%20%E2%86%92%20PR-3B82F6?style=for-the-badge" alt="Workflow"/>
  <img src="https://img.shields.io/badge/Commits-Conventional-6A5ACD?style=for-the-badge" alt="Conventional Commits"/>
  <img src="https://img.shields.io/badge/Tests-Required-2E8B57?style=for-the-badge" alt="Tests Required"/>
  <img src="https://img.shields.io/badge/Docs-Update%20with%20Behavior-EA580C?style=for-the-badge" alt="Docs Required"/>
</p>

Thank you for contributing. We welcome code, docs, bug reports, ideas, and mentoring.

---

## 🌱 Principles

- One tool, one purpose
- Clarity over cleverness
- Reproducibility over shortcuts
- Community over ego
- Ethics as part of engineering quality

---

## 🚀 Quick Start

| Step | Command / action |
|---|---|
| Clone | `git clone https://github.com/UniverLab/<project>.git` |
| Branch | `git checkout -b feat/short-description` |
| Context | Read `README.md` and any `.agents/*` specs |
| Build/Test | Run local build, lint, and tests before PR |

---

## 🔄 Contribution Workflow

1. Find or open an issue with problem context.
2. Confirm your approach in a short issue comment.
3. Implement changes in a focused branch.
4. Run checks locally.
5. Open a PR with clear description and linked issue.
6. Address review comments promptly.
7. Merge after approvals and green CI.

---

## 🧰 Code Standards

| Language | Required checks | Notes |
|---|---|---|
| Rust | `cargo fmt`, `cargo clippy`, `cargo test` | Avoid `unsafe` unless justified and documented |
| Python | `black`, `pytest` | Prefer type hints and clear docstrings |
| JS/TS | `eslint`, `prettier`, tests | Prefer explicit naming and maintainable modules |
| Shell | `shellcheck` | Use `set -eu` and quote variables |

General expectations:
- Keep code readable and intentional
- Remove dead code
- Document non-obvious decisions

---

## ✍️ Commit Messages

We use **Conventional Commits**:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

Rules:
- Subject in imperative mood (`add`, `fix`, `remove`)
- Keep subject concise (about 50 chars)
- Explain **what** and **why** in the body
- Reference issues in footer (`Fixes #123`)

Org preference:
- Do **not** add `Co-authored-by` trailers in commit messages for this organization.

---

## 🔍 Pull Requests

Before opening a PR:

- [ ] Local tests pass
- [ ] Lint/format checks pass
- [ ] Behavior changes are documented
- [ ] Commit history is clear
- [ ] Related issue is linked

PR template:

```markdown
## Description
What changed and why?

## Related Issue
Fixes #123

## Type of change
- [ ] Bug fix
- [ ] Feature
- [ ] Breaking change
- [ ] Documentation

## Validation
- [ ] Tests updated/added
- [ ] Local checks pass
- [ ] Cross-platform impact considered
```

---

## 🧪 Testing Expectations

| Scenario | Expectation |
|---|---|
| New feature | Add tests for expected behavior |
| Bug fix | Add/adjust test that fails before fix |
| Refactor | Preserve behavior and keep tests green |
| Performance change | Include benchmark context when relevant |

Target coverage: 80% when practical.

---

## 📚 Documentation Expectations

- Update README when commands/behavior change
- Keep examples copy-paste ready
- Add or adjust docstrings for public interfaces
- Keep specs in `.agents/` aligned with behavior

---

## 🐛 Bug Reports

Include:
- Expected behavior
- Actual behavior
- Reproduction steps
- Environment (OS, version, command)
- Logs/stack traces

---

## 💡 Feature Proposals

Good feature proposals include:
- Problem statement
- Why current behavior is insufficient
- Proposed approach
- Alternatives considered
- Tradeoffs

---

## ✅ Merge Criteria

A PR is mergeable when:
- CI is green
- Required tests are present
- At least one maintainer approval (or two collaborator approvals)
- Documentation is current
- No unresolved review blockers

---

## ❓ FAQ

**Do I need signed commits?** Optional.  
**Can I open large PRs?** Yes, but discuss design first.  
**Review timing?** We target 48 hours when possible.

---

## 🔗 Resources

- https://www.conventionalcommits.org/
- https://keepachangelog.com/
- https://semver.org/

---

> Every good contribution improves both the code and the community.
