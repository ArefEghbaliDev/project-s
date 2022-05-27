import { DependencyList, useEffect, useRef } from "react";

const useUpdateEffect = (callback: () => void, dependencies: DependencyList) => {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

export default useUpdateEffect;
