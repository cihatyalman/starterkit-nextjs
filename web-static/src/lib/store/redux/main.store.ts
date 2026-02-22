import { counterSlice } from "@/features/state-management/redux";
import { configureStore } from "@reduxjs/toolkit";

// npm install @reduxjs/toolkit react-redux
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*

NOT: app/layout.tsx içindeki children, ReduxProvider ile sar.
<ReduxProvider>{children}</ReduxProvider>

Kullanım Örneği(.tsx):
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.counter.data);

  dispatch(counterSlice.actions.set(0));
  dispatch(counterSlice.actions.update((prev) => prev + 1));
*/
