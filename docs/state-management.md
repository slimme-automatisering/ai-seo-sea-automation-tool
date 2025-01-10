# State Management Documentation

## 1. Local State
- **React State:** Use React's `useState` and `useReducer` hooks for component-specific state.
- **Form State:** Use Formik for managing form state and validation.

## 2. Global State
- **Redux:** Use Redux for global state management.
- **Redux Toolkit:** Use Redux Toolkit to simplify Redux setup and usage.
- **Actions:** Define actions for updating state (e.g., `SET_CAMPAIGNS`, `UPDATE_CONTENT`).
- **Reducers:** Define reducers to handle actions and update state.

### Example:
```javascript
const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: [],
  reducers: {
    setCampaigns: (state, action) => action.payload,
    addCampaign: (state, action) => [...state, action.payload],
  },
});
```

---

## 3. Server State
- **React Query:** Use React Query for managing server-side data (e.g., API responses).
- **GraphQL:** Use Apollo Client for managing GraphQL queries and mutations.

## 4. Persistence 
- **Local Storage:** Use local storage to persist user preferences.
- **Session Storage:** Use session storage to persist temporary data (e.g., form inputs).
- **Redis:** Use Redis for caching frequently accessed data.

## 5. State Flow
- **Frontend → Backend:** User actions trigger API calls, which update server-side state.
- **Backend → Frontend:** API responses update frontend state, which triggers UI updates.

## 6. Debugging
- **Redux DevTools:** Use Redux DevTools for debugging global state.
- **React Query DevTools:** Use React Query DevTools for debugging server state.