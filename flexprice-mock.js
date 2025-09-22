const config = require('./config');

async function chargeForDocs(customerId, numDocs) {
  const amount = numDocs * config.pricePerDoc;
  return { success: true, charged: amount, currency: 'USD', item: 'docs', count: numDocs };
}

async function chargeForReport(customerId, numReports) {
  const amount = numReports * config.pricePerReport;
  return { success: true, charged: amount, currency: 'USD', item: 'reports', count: numReports };
}

module.exports = { chargeForDocs, chargeForReport };
