// pages/api/pdf.js
// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');
import type { NextApiRequest, NextApiResponse } from "next";

async function generatePDF(url:string) {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2', // Waits for the network to be idle (no more than 2 network connections for at least 500 ms)
  });
  // Generate PDF
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true, // Ensures the background is rendered
  });
  await browser.close();
  return pdf;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {  
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  // Construct the full URL
  const url = `${protocol}://${host}/report`
  try {
    const pdf = await generatePDF(url);
    // Send the PDF file in response
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
