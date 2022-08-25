# S.O.L.I.D. Principles

1. S - Solid Responsibility Principle (SRP)
2. O - Open / Close Principle
3. L - Liskov's Substitution Principle
4. I - Interface Segregation
5. D - Depndency Inversion

S.O.L.I.D. Principles are guidelines and not rules.

---

# Problems with code

- Readability: Readability means, the code is readable. It doesn't mean less code.
- Testable: Whether the unit is testable easily and separately.
- Extensible: Extensible or not.
- Maintainable: If multiple devs are working on the same function, will there be conflicts?

# Single Responsibility Principle

- Every function/class/module (unit of code) should have a single, well-defined responsibility.
- Any piece of code should have only 1 reason to change.
- **How to fix:** Split multiple responsibility units into multiple units.

---

# Open / Close Principle

The code should be closed for modification but open for extension.

### Why is modification bad?

Modification requires multiple things to be done.
Whenever some code is written, what does the process look like?

- Developer: Write and test code from their end
- QA Team: Test, integration testing
- Deployed
  - Staging Servers: A lot of testing happens once again (End-to-End)
  - Deployed to Production:
    - A/B Testing

Thus modifying code is a costly endeavour.

---

# Liskov's Substitution Principle

- Any functionality in the parent class must also work for child classes.
- If any piece of code works in a parent `class P` then it should still work, without modification, with all child `class C extends P` classes.
- Derived:
- **Fix:** Create an interface

---

# Interface Segregation Principle

- Keep your interfaces minimal.
- No code should be forced to implement a method that it does not need.
- **Fix:** Split the multi-responsibility interface to multiple interfaces.

**Bottomline:** All the S.O.L.I.D. Principles are Linked.

---

# Dependency Inversion Principle

- High-level modules should NOT depend on low-level modules, instead they should depend on abstractions (interfaces).
- **Fix:** Dependency Injection

### Dependency Injection

- Instead of creating the dependencies ourselves, we should inject them (passed as method arguments from user).
