"use client"

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Papa from 'papaparse';
import styles from "./WorldStatisticsCard.module.scss";

// Define the interface for your data items
interface WorldDataItem {
    Nation: string;
    'victims in mill': number;
}

export default function WorldStatisticsCard() {
    // State to store the world data
    const [worldData, setWorldData] = useState<WorldDataItem[]>([]);

    useEffect(() => {
        // Fetch data from CSV
        fetch('/data/WorldStatistics.csv')
            .then(response => response.text())
            .then(csv => {
                // Parse CSV data
                Papa.parse(csv, {
                    header: true,
                    complete: (result) => {
                        setWorldData(result.data as WorldDataItem[]);
                    }
                });
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headerArea}>
                {/* Add any header content here */}
                <h2>World Cybercrime Statistics</h2>
            </div>

            <div className={styles.contentArea}>
                {/* Render the map here */}
                <ComposableMap>
                    <Geographies geography="/data/ne_50m_admin_0_countries.json">
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography key={geo.rsmKey} geography={geo} />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        </div>
    )
}
