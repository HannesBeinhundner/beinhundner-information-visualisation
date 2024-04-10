"use client";

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import styles from './FormsCasesAustriaCard.module.scss';

interface DataItem {
  category: string;
  '2021': number;
  '2022': number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', color: '#000' }}>
        <p className="label">{`${label}`}</p>
        <p className="label" style={{ color: '#8884d8' }}>{`2021: ${data['2021']}%`}</p>
        <p className="label" style={{ color: '#82ca9d' }}>{`2022: ${data['2022']}%`}</p>
      </div>
    );
  }

  return null;
};

export default function YourProjectCard() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch('/data/FormsOfCasesAustria.csv')
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const parsedData: DataItem[] = result.data.map((row: any) => ({
              category: row.Type,
              '2021': row['2021'],
              '2022': row['2022'],
            }));
            setData(parsedData);
          },
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerArea}>
        <h2>Forms of Cybercrime Cases</h2>
      </div>
      <div className={styles.contentArea}>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart outerRadius={150} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: '10px', fill: '#fff' }} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            <Radar name="2021" dataKey="2021" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="2022" dataKey="2022" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
