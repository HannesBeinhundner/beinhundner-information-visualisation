import React from "react";
import styles from "./MainArea.module.scss";

interface MainAreaProps {
    topLeftComponent: React.ReactNode;
    topRightComponent: React.ReactNode;
    centerComponent?: React.ReactNode;
    bottomLeftComponent?: React.ReactNode;
    bottomRightComponent?: React.ReactNode;
}

export default function MainArea({
    topLeftComponent,
    topRightComponent,
    centerComponent,
    bottomLeftComponent,
    bottomRightComponent,
}: MainAreaProps) {
    return (
        <div className={styles.container}>
            <div className={styles.topLeft}>{topLeftComponent}</div>
            <div className={styles.topRight}>{topRightComponent}</div>
            <div className={styles.center}>{centerComponent}</div>
            <div className={styles.bottomLeft}>{bottomLeftComponent}</div>
            <div className={styles.bottomRight}>{bottomRightComponent}</div>
        </div>
    );
}