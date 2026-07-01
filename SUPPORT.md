<p align="center">
  <img src="https://raw.githubusercontent.com/UniverLab/.github/main/assets/banner-support.svg" alt="UniverLab — Support"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Critical%20Incidents-%3C1h-EA580C?style=for-the-badge" alt="Critical SLA"/>
  <img src="https://img.shields.io/badge/Bug%20Reports-%3C48h-2E8B57?style=for-the-badge" alt="Bug SLA"/>
  <img src="https://img.shields.io/badge/Questions-24--72h-3B82F6?style=for-the-badge" alt="Question SLA"/>
  <img src="https://img.shields.io/badge/Approach-Community%20Support-6A5ACD?style=for-the-badge" alt="Community Support"/>
</p>

Need help with a UniverLab project? Start with the right channel below to get faster support.

---

## 📞 Support Channels

| Channel | Best for | Typical response |
|---|---|---|
| GitHub Issues | Bugs, defects, regressions | < 48h |
| GitHub Discussions | Q&A, design conversations | < 72h |
| Security Advisory | Vulnerabilities (private) | < 48h |
| Maintainer email | Coordination or sensitive context | As available |

Primary maintainer contact: `jheison.mb@univerlab.org`

---

## 🚨 Production Incidents

If a production system is impacted:

1. Open an issue labeled `critical`
2. Describe impact, affected users, and urgency
3. Share clear reproduction/workaround details
4. Add logs or telemetry snapshots if available

Target response for critical incidents: **under 1 hour**.

---

## 🐛 Reporting Bugs

Use this template:

```markdown
## Expected behavior
## Actual behavior
## Steps to reproduce
1.
2.
3.
## Environment
- OS:
- Version:
- Command:
## Logs / stack trace
```

High-quality reports reduce resolution time significantly.

---

## 💡 Feature Requests

Use Discussions or Issues (`enhancement`) and include:
- Problem statement
- Why current behavior is insufficient
- Proposed direction
- Alternatives and tradeoffs

We favor focused features that match each tool's scope.

---

## ❓ General Questions

Before opening a new question:
1. Read the repository `README.md`
2. Search existing issues/discussions
3. Check project specs in `.agents/` when available

Then open a discussion with context and what you already tried.

---

## 🛠️ Quick Troubleshooting

### Installation issues
```bash
cargo install --force <project>
cargo clean
```

### Command not found
```bash
echo $PATH
~/.local/bin/<command> --version
```

### Build failures
```bash
rustup update
cargo clean
cargo build
```

If unresolved, include `rustc --version` and full logs in your issue.

---

## 📚 Documentation Map

- `README.md` — quick start and common workflows
- `CONTRIBUTING.md` — development workflow and standards
- `SECURITY.md` — vulnerability reporting and policy
- `.agents/*` — specs and implementation intent (if present)

---

## 🧭 Support Levels

| Level | Meaning |
|---|---|
| Full support | Active stable projects, fast response on defects |
| Best effort | Active development projects, reasonable response |
| Community-driven | Experimental/research tracks, contributor-led support |

---

## ⬆️ Escalation Path

If your issue is blocked:
1. Comment with new evidence and what is blocked
2. Request maintainer attention in-thread
3. Escalate privately only for sensitive or urgent cases

---

> Your question today often becomes tomorrow's documentation.
