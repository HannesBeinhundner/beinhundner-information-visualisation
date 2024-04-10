"use client"

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from "./CasesAustriaCard.module.scss";

interface DataItem {
  year: string;
  cases: number;
}

export default function Cases() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch('/data/ReportedCasesAustria.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const parsedData: DataItem[] = result.data.map((row: any) => ({
              year: row.year,
              cases: parseInt(row.cases, 10)
            }));
            setData(parsedData);
          }
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerArea}>
        <h2>Cybercrime Cases in Austria</h2>
      </div>
      <div className={styles.contentArea}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cases" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}