// utils/exportUtils.js

export const handleExportCSV = (contacts) => {
  // Define the headers and map over contacts to extract values
  const headers = ['Name', 'Category', 'Mobile', 'Email', 'Status'];

  // Map contacts into rows
  const rows = contacts.map(contact => [
    contact.name || '',
    contact.category || '',
    contact.mobile || '',
    contact.email || '',
    contact.status || ''
  ]);

  // Filter out columns where all rows have empty values
  const nonEmptyColumns = headers.map((header, index) => {
    // Check if there is at least one non-empty value in the column
    const columnHasValue = rows.some(row => row[index] !== '');
    return columnHasValue ? header : null; // Keep header if it has values
  }).filter(header => header !== null); // Remove nulls (empty columns)

  // Filter rows to only include non-empty columns
  const filteredRows = rows.map(row => row.filter((_, index) => nonEmptyColumns.includes(headers[index])));

  // Add a timestamp for the file name
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 

  // Prepare the CSV content with the filtered headers and rows
  const csvContent = [
    nonEmptyColumns.join(','),
    ...filteredRows.map(row => row.join(','))
  ].join('\n');

  // Create a Blob from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a temporary download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  // Set link attributes and trigger the download
  link.setAttribute('href', url);
  link.setAttribute('download', `contacts_${timestamp}.csv`);
  link.click();
};



  // utils/exportUtils.js

export const handleExportJSON = (contacts) => {
    const jsonContent = JSON.stringify(contacts, null, 2); 
  
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 
  
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_${timestamp}.json`);
    link.click();
  };
  