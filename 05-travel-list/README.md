# State vs Props

State: Internal, owned by component. kind of like component's memory. holding its data over time, across multiple re-renders.

Props: External, owned by parent component, kind of like function parameters, a channel from parent to child(read-only). When props are updated, it is its parent's state, which means parent re-renders, its child re-renders too(of course, with useMemo, one can prevent this default behavior).
