# Clean Coding Prompt — Write Code That Speaks for Itself

> **Goal:** Write code so clear and expressive that it reads like plain English — no comments needed to explain *what* it does.

> **Scope:** These principles are language-agnostic, but examples use JavaScript for readability. Apply the spirit of each rule to any language you work in.

---

## The Prompt

**"Rewrite the following code using clean coding principles. The refactored code must be self-explanatory — a developer should be able to read it like a sentence without needing any comments or documentation to understand its intent. Do not add explanatory comments that describe *what* the code does. Let the code explain itself through meaningful naming, decomposition, and structure. Comments explaining *why* a non-obvious decision was made (business rules, workarounds, regulatory requirements) are acceptable and encouraged."**

---

## Rules to Follow

### 1. Name variables after their meaning, not their value

Instead of storing a raw expression, name *what it represents*. Avoid abbreviations unless they are universally understood (e.g., `id`, `url`, `max`).

```js
// ❌ Hard to read at a glance
if (t > 9 && t < 17 && d !== 0 && d !== 6) { ... }
```

// ✅ Reads like English
const isWithinWorkingHours = currentHour > 9 && currentHour < 17;
const isWeekday = currentDay !== SUNDAY && currentDay !== SATURDAY;

if (isWithinWorkingHours && isWeekday) { ... }

**Naming conventions at a glance:**

| Type | Convention | Examples |
|------|-----------|----------|
| Booleans | `is`, `has`, `should`, `can` prefix | `isActive`, `hasPermission`, `shouldRetry` |
| Functions | verb + noun | `fetchUserProfile`, `calculateTax` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| Collections | Plural nouns | `users`, `activeOrders`, `pendingTasks` |
| Iterators | Meaningful names (not `i`, `j`) | `for (const order of orders)` |

---

### 2. Break complex conditions into named booleans

Each condition should answer one clear yes/no question. **Group related conditions at the same level of abstraction.**

```js
// ❌ Wall of logic
if (user.age >= 18 && user.isVerified && !user.isBanned && user.subscription !== 'free') { ... }

// ✅ Each boolean tells a story
const isAdult = user.age >= 18;
const isVerified = user.isVerified;
const isAllowed = !user.isBanned;
const hasPremiumAccess = user.subscription !== 'free';

if (isAdult && isVerified && isAllowed && hasPremiumAccess) { ... }
```

> **⚠️ Judgment call:** Don't extract a boolean if the original is already a single, clearly-named property check. `if (user.isVerified)` doesn't need to become `const isVerified = user.isVerified`. Extract when you're *adding clarity*, not ceremony.

---

### 3. Name functions after what they do (verb + noun)

A function name should complete the sentence: *"This function will..."*

```js
// ❌ Vague
function process(data) { ... }
function handle(input) { ... }
function doStuff(items) { ... }

// ✅ Intention is immediately clear
function filterExpiredMemberships(memberships) { ... }
function calculateMonthlyRevenue(transactions) { ... }
function sendPasswordResetEmail(user) { ... }
```

**Common verb choices and when to use them:**

| Verb | Use when... | Example |
|------|------------|---------|
| `get` / `fetch` | Retrieving data | `getUserById`, `fetchLatestOrders` |
| `calculate` / `compute` | Deriving a value | `calculateShippingCost` |
| `is` / `has` / `can` | Returning a boolean | `isEligibleForRefund` |
| `filter` / `find` / `sort` | Operating on collections | `filterActiveUsers` |
| `send` / `emit` / `notify` | Triggering side effects | `sendWelcomeEmail` |
| `create` / `build` | Constructing something | `createInvoice` |
| `validate` / `check` | Verifying correctness | `validatePaymentDetails` |
| `format` / `parse` | Transforming shape/type | `formatCurrency`, `parseCSVRow` |

---

### 4. Replace magic numbers *and magic strings* with named constants

Unexplained literals are meaningless. Give them a name.

```js
// ❌ What does 86400000 mean? What does "PRO" mean?
setTimeout(refresh, 86400000);
if (user.role === "PRO") { ... }

// ✅ Now it's obvious
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
setTimeout(refresh, ONE_DAY_IN_MS);

const ROLE_PROFESSIONAL = "PRO";
if (user.role === ROLE_PROFESSIONAL) { ... }
```

> **⚠️ Exception:** `0`, `1`, `""`, `true`, `false`, and values obvious from immediate context don't always need extraction. Use judgment — `array.slice(0, 1)` is fine; `array.slice(0, 7)` is not.

---

### 5. Decompose nested logic into smaller functions

If a block is hard to read at once, extract it into a named function. **Each function should operate at a single level of abstraction.**

```js
// ❌ Deeply nested, mentally taxing
function getDiscount(user) {
  if (user.isLoggedIn) {
    if (user.loyaltyPoints > 500) {
      if (!user.hasUsedPromo) {
        return 0.20;
      }
    }
  }
  return 0;
}

// ✅ Each function does one thing with a clear name
function isEligibleForDiscount(user) {
  return user.isLoggedIn && hasEnoughPoints(user) && hasNotUsedPromo(user);
}

function hasEnoughPoints(user) {
  return user.loyaltyPoints > DISCOUNT_POINT_THRESHOLD;
}

function hasNotUsedPromo(user) {
  return !user.hasUsedPromo;
}

function getDiscount(user) {
  return isEligibleForDiscount(user) ? LOYALTY_DISCOUNT_RATE : NO_DISCOUNT;
}
```

---

### 6. Use early returns to reduce nesting (Guard Clauses)

Invert conditions and return early to keep the "happy path" un-indented.

```js
// ❌ Arrow-shaped code
function processOrder(order) {
  if (order) {
    if (order.isPaid) {
      if (!order.isShipped) {
        shipOrder(order);
        return { success: true };
      }
    }
  }
  return { success: false };
}

// ✅ Guard clauses flatten the logic
function processOrder(order) {
  if (!order) return { success: false };
  if (!order.isPaid) return { success: false };
  if (order.isShipped) return { success: false };

  shipOrder(order);
  return { success: true };
}
```

---

### 7. Keep functions short and at one level of abstraction

A function should read like a single step in a process, not the entire process. If a function mixes high-level orchestration with low-level details, split it.

```js
// ❌ Mixes orchestration with details
function registerUser(form) {
  const email = form.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid");
  const hash = bcrypt.hashSync(form.password, 12);
  db.users.insert({ email, password: hash, createdAt: new Date() });
  smtp.send({ to: email, subject: "Welcome!", body: "..." });
}

// ✅ High-level reads like a recipe
function registerUser(form) {
  const email = normalizeEmail(form.email);
  validateEmail(email);
  const hashedPassword = hashPassword(form.password);
  saveUser({ email, hashedPassword });
  sendWelcomeEmail(email);
}
```

---

### 8. Prefer positive, affirmative boolean names

Negated booleans force readers into double-negative gymnastics.

```js
// ❌ Double negatives hurt readability
if (!isNotActive) { ... }
if (!disableFeature) { ... }

// ✅ Positive names, negate only at usage
const isActive = true;
const isFeatureEnabled = true;

if (isActive) { ... }
if (isFeatureEnabled) { ... }
```

---

### 9. Respect the "when to comment" distinction

Clean code doesn't mean *zero* comments — it means **no comments that restate *what* the code does**. Comments explaining *why* are valuable.

```js
// ❌ Comment restates the code (useless)
const total = price * quantity; // multiply price by quantity

// ✅ Comment explains a non-obvious WHY (useful)
// Tax is excluded here because it's calculated at checkout per regional rules
const subtotal = price * quantity;

// ✅ Also acceptable: linking to external context
// Workaround for Chrome bug #12345 — remove after v120+
element.style.transform = "translateZ(0)";
```

---

## Before & After — Full Example

### ❌ Before (Complicated)

```js
function proc(arr) {
  let r = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].a >= 18 && arr[i].s === 1 && arr[i].b < 3) {
      r.push({ n: arr[i].fn + " " + arr[i].ln, e: arr[i].em });
    }
  }
  return r;
}
```

### ✅ After (Self-Explanatory)

```js
const MAX_ALLOWED_WARNINGS = 3;

function getEligibleAdultContacts(users) {
  return users
    .filter(isEligibleAdult)
    .map(toContactInfo);
}

function isEligibleAdult(user) {
  return isAdult(user) && isActive(user) && isInGoodStanding(user);
}

function isAdult(user) {
  return user.age >= MINIMUM_ADULT_AGE;
}

function isActive(user) {
  return user.status === USER_STATUS_ACTIVE;
}

function isInGoodStanding(user) {
  return user.warningCount < MAX_ALLOWED_WARNINGS;
}

function toContactInfo(user) {
  const fullName = `${user.firstName} ${user.lastName}`;
  return { name: fullName, email: user.email };
}
```

The refactored version answers clear questions at every level:

- *Which users do we want?* → Eligible adults.
- *What makes someone an eligible adult?* → Adult + active + good standing.
- *What info do we extract?* → A contact card with name and email.

No comments. No explanation. Just readable code.

---

## Quick Checklist Before Submitting Code

- [ ] Can a new developer read each line like a sentence?
- [ ] Are all magic numbers **and magic strings** replaced with named constants?
- [ ] Does every function name start with a verb (or `is`/`has`/`can` for booleans)?
- [ ] Is every complex condition stored in a named boolean?
- [ ] Are there zero comments that say *what* the code does?
- [ ] Are *why* comments preserved where non-obvious decisions exist?
- [ ] Is nesting kept to ≤ 2 levels using guard clauses and extraction?
- [ ] Does each function operate at a single level of abstraction?
- [ ] Are boolean names positive/affirmative (no `isNotX` or `disableY`)?
- [ ] Would you be comfortable reading this code 6 months from now with no context?

---

> **Principle:** If you feel the urge to write a comment explaining *what* a line does — rename the variable or function instead. If you feel the urge to explain *why* — that comment has earned its place.

