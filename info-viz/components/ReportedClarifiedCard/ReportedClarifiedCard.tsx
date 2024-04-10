"use client"

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from "./ReportedClarifiedCard.module.scss";

interface DataItem {
  year: string;
  reports: number;
  clarified: number;
}

export default function Cases() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch('/data/ReportedClarifiedCases.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData: DataItem[] = result.data.map((row: any) => ({
              year: row.year,
              reports: parseInt(row.reports.replace(/,/g, ''), 10),
              clarified: parseInt(row.clarified.replace(/,/g, ''), 10),
            }));
            setData(parsedData);
          }
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerArea}>
        <h3>Reported and solved cases of cybercrime in Austria</h3>
      </div>
      <div className={styles.contentArea}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reports" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="clarified" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
