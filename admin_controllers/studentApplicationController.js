import StudentApplicationModel from "../models/student_models/student";


export const createStudentApplication = async (req, res) => {
    const { name, courses, college, formfields } = req.body;

    try {
        const newApplication = new StudentApplicationModel({
            name,
            courses,
            college,
            formfields,
        });

        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
