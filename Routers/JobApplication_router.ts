import { Request, Response, Router } from "express";
import JobApplication from "../models/JobApplication";
const router = Router();

// Endpoint for accepting job applications
router.get("/admin1/", async (req: Request, res: Response) => {
    try {
        // Access the information submitted by the applicant
        const { page, per_page, total, total_pages, data } = req.body;

        // Create a new JobApplication document based on the submitted data
        const jobApplication = new JobApplication({
            page,
            per_page,
            total,
            total_pages,
            data,
        });

        // Save the JobApplication document to the database
        const savedJobApplication = await jobApplication.save();

        // Send the desired JSON response back to the applicant
        const responseData = {
            page,
            per_page,
            total,
            total_pages,
            data,
            support: {
                url: "https://reqres.in/#support-heading",
                text: "To keep ReqRes free, contributions towards server costs are appreciated!",
            },
        };
        res.status(201).json(responseData);
    } catch (error) {
        console.error(error); // Log the error to the console for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;

