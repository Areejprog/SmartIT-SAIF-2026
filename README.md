Introduction

IT departments manage a large number of devices across different departments, such as Human Resources, Communications, and other organizational units. Over time, devices may experience repeated failures or require multiple service interventions, but this information can be difficult to track as a complete history.

Smart IT was developed to create a centralized record for each device, combining its age, type, department, assigned employee, status, and related service tickets. This provides a clearer view of device history and helps identify patterns in IT issues across devices and departments.

Methodology

Smart IT was developed as a web-based system using:

Frontend: HTML, CSS, JavaScript
Backend: FastAPI REST API
Database: MySQL
Data Management: SQLAlchemy ORM
Reporting: Chart.js

The system records IT assets and their related service tickets in a centralized database.

For each device, the system stores information such as:

Device type
Department
Assigned employee
Serial number
Purchase date
Device age
Current status
Related service requests

The collected data can then be organized and analyzed to examine device history, recurring issues, service activity, and patterns across departments and device types.

Results

The prototype provides a centralized view of IT assets and their service activity.

The system enables IT teams to:

Track the age and status of each device.
Identify which department the device belongs to.
Identify whether the device is a laptop, desktop, printer, or another type.
Associate devices with assigned employees.
Link service tickets to specific devices.
Review the service history associated with a device.
Compare service issues across departments.
Identify devices with repeated service requests.
Monitor asset and ticket statistics through dashboards and reports.
Perform basic risk analysis using asset and ticket conditions.
Innovation

The main innovation of Smart IT is transforming the device from a simple asset record into a historical operational record.

The system connects:

Device → Department → Employee → Device Age → Service History → Recurring Issues → Analysis

This allows IT teams to ask questions such as:

Which devices experience repeated problems?
Are older devices generating more service requests?
Which departments submit the most IT service requests?
Are problems concentrated in laptops, desktops, printers, or other device types?
Which devices may require closer attention based on their history?

Instead of viewing each service request as an isolated incident, Smart IT connects service activity to the device and its organizational context.

Conclusion

Smart IT demonstrates a centralized approach to IT asset and service management that goes beyond recording devices and support requests.

By connecting device age, type, department, employee, status, and service history, the system creates a structured source of operational data that can help IT teams understand recurring problems, monitor device history, and support more informed maintenance and replacement decisions.

Future Work & References
Future Work
Develop a dedicated maintenance history for each device.
Record the number and dates of maintenance interventions.
Analyze recurring failures for individual devices.
Compare failure and service patterns across departments.
Analyze the relationship between device age and service frequency.
Develop predictive maintenance capabilities using accumulated historical data.
Generate automated maintenance and replacement recommendations.
Expand reporting and analytical capabilities.
Develop a mobile version of the system.
Integrate Smart IT with organizational IT systems.
References
FastAPI Documentation — FastAPI Web Framework.
SQLAlchemy Documentation — Python SQL Toolkit and Object Relational Mapper.
MySQL Documentation — MySQL Database Management System.
Chart.js Documentation — JavaScript Data Visualization Library.
IBM Plex Sans Arabic — Typeface used for clear multilingual presentation.
