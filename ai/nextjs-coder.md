---
name: nextjs-coder
description: Code Generation and Architectural Guidelines for Next.js Features
---

# Next.js Coder

## Development Guidelines

- Complex task/feature → first save a step-by-step plan to `plans/` folder, wait for approval before coding.
- Never scan entire project — only necessary files. Save tokens.

## Feature Structure

```
features/<feature>/
├── index.ts                     # Barrel export (models, repo, components)
├── <feature>.repo.ts            # API calls + parseResponse
├── mock.api.ts                  # Mock API (when backend not ready)
├── models/<feature>.model.ts    # Zod schema + type + parse helpers
├── store/
│   ├── <feature>.store.ts       # Single item Zustand store
│   └── <feature>-list.store.ts  # List store with CRUD + pagination
└── components/*.tsx             # Feature-specific UI
```

### Import Rules

- **Outside feature** → import through barrel `@/features/<feature>`
- **Inside feature** → direct relative imports (`../models/...`)

## Model (Zod Schema)

Extend `RawBaseSchema` (id/createdAt/updatedAt). Use `dataSchemas` validators. Follow Raw → Transform pattern:

```typescript
import { z } from "zod";
import { mapBase, RawBaseSchema } from "@/shared/models/base.model";
import { dataSchemas } from "@/shared/models/_schema";

const RawOrderSchema = RawBaseSchema.extend({
  title: dataSchemas.string,
  amount: dataSchemas.fixedNumber(2),
  status: dataSchemas.stringOptional,
});
export const OrderSchema = RawOrderSchema.transform((raw) => ({
  ...mapBase(raw),
  title: raw.title, amount: raw.amount, status: raw.status,
}));
export type OrderModel = z.infer<typeof OrderSchema>;

/* #region Helpers */
export function parseOrder(data: unknown): OrderModel { return OrderSchema.parse(data); }
export function parseOrderList(data: unknown): OrderModel[] { return z.array(OrderSchema).parse(data); }
/* #endregion */
```

**`dataSchemas`:** `string`, `stringFn(label)`, `stringOptional`, `number`, `fixedNumber(digit)`, `email`, `datetime`, `record`

## Repository (Data Access)

Use `apiService` for API calls, always parse with `parseResponse()`. Use `{ isOkeyNoti: true }` for success toast on write operations.

```typescript
import { apiService } from "@/core/helpers";
import { parseResponse } from "@/shared/models";

const MAIN_PATH = "/orders";
export const LIMIT = 10;

export const getOrders = async (props: { page?: number } = {}) => {
  const r = await apiService.get(MAIN_PATH, { params: { limit: LIMIT, page: props.page } });
  return parseResponse(r);
};
export const createOrder = async (props: { body: Record<string, unknown> }) => {
  const r = await apiService.post(MAIN_PATH, { body: props.body });
  return parseResponse(r, { isOkeyNoti: true });
};
```

**`apiService` methods:** `get`, `post`, `put`, `patch`, `delete` — all take `(path, { body?, params?, headers?, cache?, include? })`. Also `filePost(path, file, { uploadPath? })`.

### Mock API

When backend not ready, create `mock.api.ts`. Use `await delay(ms)` in repo for network simulation:

```typescript
const ordersDb = Array.from({ length: 20 }).map((_, idx) => ({
  id: (idx + 1).toString(), createdAt: new Date(), updatedAt: new Date(),
  title: `Sipariş ${idx + 1}`, amount: (idx + 1) * 25.5,
}));

export const getOrdersFromApi = async (props: { limit: number; after?: string }) => {
  const lastIndex = props.after ? parseInt(props.after) : 0;
  return { data: ordersDb.slice(lastIndex, lastIndex + props.limit) };
};
```

## Zustand Store

**Single item store:**

```typescript
import { create } from "zustand";

const initialState = { data: null as OrderModel | null, isLoading: undefined as boolean | undefined };

export const useOrderStore = create<typeof initialState & { set: (v: OrderModel) => void; reset: () => void }>((set) => ({
  ...initialState,
  set: (value) => set({ data: value }),
  reset: () => set(initialState),
}));
```

**List store** — same pattern as `product-list.store.ts`: `dataList`, `isLoading`, `isFinished` state + `set`, `moreFetch`, `add`, `delete`, `reset` actions. `moreFetch` handles cursor-based pagination with `LIMIT` check and `isFinished` flag. Refer to `features/product/store/product-list.store.ts` for full implementation.

**Usage:** Always use `useShallow` when selecting multiple fields:
```typescript
const { dataList, set } = useStore(useShallow((s) => ({ dataList: s.dataList, set: s.set })));
```

## UI Guidelines

### Component Priority

1. **`@/components/custom/`** (C-prefixed) — first choice for general components
2. **`@/components/ui/`** (shadcn/ui) — when custom doesn't exist
3. **Native HTML + Tailwind** — everything else

### Custom Components

| Category | Components |
|----------|-----------|
| **button** | `CButton`, `CLink`, `CTextButton` |
| **input** | `CInput`, `CSelect`, `CComboBox`, `CCheckBox`, `CRadioGroup`, `CChips`, `CTextarea`, `COtpInput` |
| **date** | `CDateInput`, `CDatePicker`, `CDateRangePicker`, `CMultiDatePicker` |
| **image** | `CImage`, `CImagePreview`, `CImageListPreview`, `CCropImage` |
| **tools** | `CLoading`, `CPopup`, `CCarousel`, `CCountdown`, `CSortableList`, `CStateComponent` |
| **graphic** | `CLineChart`, `CLineChartMulti` |

### UI Freedom

Layout, spacing, animation, responsive behavior, page composition → **free choice**. Only use custom components for button/input/image/date/tools when available. No new UI dependencies without approval.

### Styling & Components

- Tailwind CSS v4 + `cn()` from `@/lib/utils` for conditional classes
- Theme-aware colors: `text-primary`, `bg-muted`, `border-border` etc.
- Default server components. Add `"use client"` only when hooks/events/browser APIs needed — keep client boundaries small.

## Key Utilities

| Utility | Import | Items |
|---------|--------|-------|
| **Helpers** | `@/core/helpers` | `delay(ms)`, `getRandomImageUrl()`, date/text/format/number helpers |
| **Hooks** | `@/core/hook` | `useHasHydrated()`, `useTimer()`, `useFormSubmitState()` |
| **Toast** | `@/core/helperx/toast` | `showToast({ type: "success"\|"error", message })` |
| **Types** | global | `Nullable<T>`, `MyAny`, `MyRecord`, `KeyLabel<T>`, `KeyValue<T>`, `CustomState<T>` |

## Conventions

- Turkish-language UI strings and error messages
- `[C_err]` prefix for `console.error`
- `/* #region */` / `/* #endregion */` for code folding
- `@/*` → `web/src/*`
- Barrel `index.ts` per feature
- Zod: Raw → Transform + `parse` / `parseList` helpers
