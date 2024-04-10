"use client"

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import Papa from 'papaparse';
import styles from "./WorldStatisticsCard.module.scss";

const geoUrl = "/data/ne_50m_admin_0_countries.json";

interface CsvDataItem {
  Nation: string;
  "victims in mill": string;
  coordinates: string;
  color: string;
}

interface WorldDataItem {
  Nation: string;
  'victims in mill': number;
  coordinates: Coordinates;
  color: string;
}

type Coordinates = [number, number];


export default function WorldStatisticsCard() {
    const [worldData, setWorldData] = useState<WorldDataItem[]>([]);

    useEffect(() => {
      fetch('/data/WorldStatistics.csv')
        .then(response => response.text())
        .then(csv => {
          Papa.parse<CsvDataItem>(csv, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
              const parsedData: WorldDataItem[] = result.data.map((item) => ({
                Nation: item.Nation,
                'victims in mill': parseFloat(item["victims in mill"]),
                coordinates: item.coordinates.split(',').map(Number) as Coordinates,
                color: item.color,
              }));
              setWorldData(parsedData);
            }
          });
        });
    }, []);
    

    return (
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <h3>Number of victims of cybercrime in other countries</h3>
        </div>
        <div className={styles.contentArea}>
        <div className={styles.mapContainer}>
            <ComposableMap>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: "#D6D6DA", outline: "none" },
                        hover: { fill: "#D6D6DA", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {worldData.map((country, i) => (
                <Marker key={i} coordinates={country.coordinates}>
                  <circle r={10} fill={country.color} stroke="#FFF" strokeWidth={2} />
                </Marker>
              ))}
            </ComposableMap>
          </div>
          <div className={styles.legend}>
            {worldData.map((country, index) => (
                <div key={index} className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: country.color }}></span>
                    <span>{`${country.Nation}: ${country['victims in mill']}M`}</span>
                </div>
            ))}
        </div>
        </div>
      </div>
    );
}
