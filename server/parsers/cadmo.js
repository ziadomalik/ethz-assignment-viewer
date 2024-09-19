// Copyright 2023 Ziad Malik

import * as cheerio from "cheerio";
import url from "url";

export default async function parse() {
    const lectureStart = new Date(new Date().getFullYear(), 8, 25);

    const baseUrl = "https://cadmo.ethz.ch/education/lectures/HS24/DA/index.html";
    const res = await fetch(baseUrl)

    if (!res.ok) {
        console.log('Response not OK');
        return;
    }

    const html = await res.text();

    const $ = cheerio.load(html);
    const exercises = [];

    // Iterate through each table row in the tbody
    const fileBaseUrl = "https://cadmo.ethz.ch/education/lectures/HS23/DA/"
    $('table#uebungen > tbody > tr').each((index, element) => {
        const exerciseName = $(element).find('td:first-child a').text().trim();
        const exercisePDF = $(element).find('td:first-child a').attr('href');
        const solutionPDF = $(element).find('td:last-child a').attr('href');
        const dueDate = lectureStart.setDate(lectureStart.getDate() + (index ? 7 : 0));

        // Create an exercise object and push it to the array
        exercises.push({
            exerciseName,
            exercisePDF: url.resolve(fileBaseUrl, exercisePDF),
            solutionPDF: solutionPDF ? url.resolve(fileBaseUrl, solutionPDF) : null,
            bonusLink: null,
            dueDate,
        });
    });

    return {
        exercises,
        website: baseUrl,
        video: "https://video.ethz.ch/lectures/d-infk/2024/autumn/252-0026-00L.html",
    };
};