import * as cheerio from "cheerio";

export default async function parse() {
    // Set the start date of the assignments to September 17, 2024, as the first release date
    const lectureStart = new Date(2024, 8, 17);  // September is month 8 because months are 0-based in JavaScript Date

    const baseUrl = "https://lec.inf.ethz.ch/infk/eprog/2024/exercises/sheets/";

    const currentDate = new Date(); // Get the current date
    const exercises = [];

    // Calculate how many assignments have been released so far
    const timeDiff = currentDate - lectureStart; // Time difference between the current date and the start date
    const weeksPassed = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000)); // Number of full weeks that have passed

    // Iterate through all released assignments
    for (let i = 0; i <= weeksPassed; i++) {
        const assignmentName = `uebungsblatt${i}`;
        const exercisePDF = `${baseUrl}${assignmentName}.pdf`;

        // Calculate the release date of each assignment
        const assignmentDate = new Date(lectureStart);
        assignmentDate.setDate(lectureStart.getDate() + i * 7); // Released every Tuesday

        // Set the due date to 7 days after the release date
        const dueDate = new Date(assignmentDate);
        dueDate.setDate(assignmentDate.getDate() + 7);

        // Create the assignment object and add it to the array
        exercises.push({
            exerciseName: assignmentName,  
            exercisePDF,                  
            solutionPDF: null,            
            bonusLink: null,              
            dueDate,                       
            openLink: exercisePDF,        
        });
    }

    return {
        exercises,
        website: baseUrl,
        video: "https://video.ethz.ch/lectures/d-infk/2024/autumn/252-0027-00L.html",  // Assuming this is the 2024 video link
    };
}
