import React from 'react';
import { SyncLoader } from 'react-spinners';

const loading = () => {
    return (
        <div style={{ position: "absolute", top: '50%', left: "50%", transform: "translate(-50%, -50%)" }}>
            <SyncLoader
                color={"#BA68C8"}
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default loading