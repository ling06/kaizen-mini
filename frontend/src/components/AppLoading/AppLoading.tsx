import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useRef } from "react";
import { Transition } from "react-transition-group";
import { Loading } from "../Loading";


export function AppLoading() {
  const active = useTypedSelector((state) => state.loader.active);
  const loaderRef = useRef(null);

  return (
    <>
      <Transition
        unmountOnExit
        nodeRef={loaderRef}
        timeout={300}
        in={active}>
        {(state) => (
          <Loading
            innerRef={loaderRef}
            state={state}
          />
        )}
      </Transition>
    </>
  );
}
