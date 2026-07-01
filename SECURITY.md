<p align="center">
  <img src="https://raw.githubusercontent.com/UniverLab/.github/main/assets/banner-security.svg" alt="UniverLab — Security Policy"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Disclosure-Private%20First-3B82F6?style=for-the-badge" alt="Private Disclosure"/>
  <img src="https://img.shields.io/badge/SLA-Ack%20in%2048h-2E8B57?style=for-the-badge" alt="48h SLA"/>
  <img src="https://img.shields.io/badge/Critical%20Fix-7%20Days-EA580C?style=for-the-badge" alt="Critical Fix"/>
  <img src="https://img.shields.io/badge/Principle-Reproducible%20Security-6A5ACD?style=for-the-badge" alt="Reproducible Security"/>
</p>

Security is a shared responsibility.  
If you find a vulnerability, please report it privately and avoid public disclosure until a fix is coordinated.

---

## 🚨 Report a Vulnerability

Do **not** open public issues for security vulnerabilities.

Use one of these channels:
- Email: `jheison.mb@univerlab.org`
- GitHub Security Advisory (preferred for repository-specific vulnerabilities)

Recommended report contents:
- Affected project and version
- Reproduction steps
- Impact and threat model
- Proof of concept (if safe)
- Suggested remediation (optional)

---

## ⏱️ Response and Disclosure Timeline

| Severity | Acknowledge | Fix target | Public disclosure target |
|---|---:|---:|---:|
| Critical (CVSS 9-10) | 48h | 7 days | 14 days |
| High (CVSS 7-8) | 48h | 14 days | 30 days |
| Medium/Low | 48h | 30-90 days | With release notes/advisory |

We may adjust timelines when exploit complexity or ecosystem impact requires it.

---

## 🔐 Security Principles

- Minimize dependencies to reduce attack surface
- Prefer memory-safe defaults (Rust where practical)
- Keep systems reproducible and auditable
- Use vetted crypto primitives and libraries
- Avoid secret leakage in code, logs, and artifacts

---

## 👩‍💻 Secure Development Checklist

✅ Do:
- Validate and sanitize input
- Use parameterized queries and safe serializers
- Enforce TLS for remote communication
- Audit dependencies regularly:
  - `cargo audit`
  - `npm audit`
  - `pip-audit`
- Keep CI checks for linting, tests, and known-vuln scanning

❌ Do not:
- Hardcode tokens/passwords
- Trust unvalidated user input
- Log secrets or private keys
- Bypass critical checks in release workflows

---

## 🧩 Context-Specific Controls

| Context | Minimum controls |
|---|---|
| CLI tools | Input/path validation, safe file permissions, predictable behavior |
| Daemons | Authentication, authorization, rate-limiting, security event logging |
| Web/API | HTTPS, CORS hardening, SQLi/XSS/CSRF protections |

---

## 🧪 Audits and Pen Testing

Responsible research is welcome.

Rules:
- Do not access unrelated private data
- Do not disrupt service availability
- Coordinate disclosure before publishing details

For planned audits, contact maintainers first to align scope and timeline.

---

## 📦 Security Releases

- Critical patches are prioritized immediately
- Security fixes are documented in changelogs/advisories
- Breaking changes for security may be introduced when necessary

Supported target: latest maintained stable versions of each project.

---

## 🔗 Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- RustSec / cargo-audit: https://rustsec.org/
- npm audit docs: https://docs.npmjs.com/cli/v8/commands/npm-audit
- NVD/CVSS: https://nvd.nist.gov/

---

> Build fast, disclose responsibly, fix decisively.
