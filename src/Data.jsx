import React, { useState } from 'react';

const Data = (props) => {
    const data = props.data;
    const [selectedService, setSelectedService] = useState('');
    let totalCost = 0;
    let totalDelivered = 0;
    const tableRows = [];

    for (const [serviceName, serviceData] of Object.entries(data.data)) {
        for (const entries of Object.values(serviceData)) {
            if (Array.isArray(entries)) {
                entries.forEach(entry => {
                    totalCost += entry.totalcost || 0;
                    totalDelivered += parseInt(entry.delivered || 0);
                    tableRows.push({
                        serviceName,
                        smscost: entry.smscost || "N/A",
                        totalcost: entry.totalcost || 0,
                        delivered: entry.delivered || 0,
                        failed: entry.failed || 0
                    });
                });
            } else {
                for (const subEntry of Object.values(entries)) {
                    totalCost += subEntry.totalcost || 0;
                    totalDelivered += parseInt(subEntry.delivered || 0);
                    tableRows.push({
                        serviceName,
                        smscost: subEntry.smscost || "N/A",
                        totalcost: subEntry.totalcost || 0,
                        delivered: subEntry.delivered || 0,
                        failed: subEntry.failed || 0
                    });
                }
            }
        }
    }

    const filteredRows = selectedService 
        ? tableRows.filter(row => row.serviceName === selectedService)
        : tableRows;

    const uniqueServices = [...new Set(tableRows.map(row => row.serviceName))];

    return (
        <div>
            <h1>Sms Stats</h1>
            <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
            >
                <option value="">Select a service...</option>
                {uniqueServices.map((service, index) => (
                    <option key={index} value={service}>
                        {service}
                    </option>
                ))}
            </select>
            <table>
            <tr>
                        <td colSpan="2"><strong>Total</strong></td>
                        <td><strong>{totalCost.toFixed(2)}</strong></td>
                        <td><strong>{totalDelivered}</strong></td>
                        <td>-</td>
                    </tr>
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>SMS Cost</th>
                        <th>Total Cost</th>
                        <th>Delivered</th>
                        <th>Failed</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.serviceName}</td>
                            <td>{row.smscost}</td>
                            <td>{row.totalcost}</td>
                            <td>{row.delivered}</td>
                            <td>{row.failed}</td>
                        </tr>
                    ))}
                </tbody>
              
                   
               
            </table>
        </div>
    );
};

export default Data;
