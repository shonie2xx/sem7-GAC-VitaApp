import React, { useContext, useState } from "react";

const MoodPointsContext = React.createContext()
const MoodUpdateContext = React.createContext()

export function useMoodPoints() {
    return useContext(MoodPointsContext)
}

export function useMoodPointsUpdate() {
    return useContext(MoodUpdateContext)
}

// export const MoodPointsContext = createContext();
// export const MoodUpdateContext = createContext();

export function MoodProvider({ children }) {
    const [points, SetPoints] = useState(10);

    function PointsSet(points) {
        SetPoints(points);
        console.log(points)
    };

    // const [points, setPoints] = useState(10);

    return (
        <MoodPointsContext.Provider value={points} >
            <MoodUpdateContext.Provider value={PointsSet}>
                {children}
            </MoodUpdateContext.Provider>
        </MoodPointsContext.Provider>
    )
}

