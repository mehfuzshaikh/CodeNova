import { Request, Response } from 'express';
import { QUESTION } from '../models/questionModel';
import { USERQUESTIONRELATION } from '../models/userQuestionRelationsModel';

// Get questions with user-specific solved status
export const getUserQuestions = async (req: Request, res: Response):Promise<void> => {
  try {
    const userId = req.user?._id;  // Assuming `req.user` is populated from middleware

    // Fetch all questions
    const questions = await QUESTION.find();

    // Fetch user-specific solved questions
    const solvedRelations = await USERQUESTIONRELATION.find({ user_id: userId,isSolved:"Solved" });

    // Create a set of solved question IDs for quick lookup
    const solvedSet = new Set(
      solvedRelations
        .filter((rel) => rel.isSolved)  // Only include solved questions
        .map((rel) => rel.question_id.toString())  // Extract the question IDs
    );

    // Prepare questions with status
    const questionsWithStatus = questions.map((question) => ({
      _id: question._id,
      title: question.title,
      difficulty: question.difficulty,
      topics: question.topics,
      status: solvedSet.has(question._id.toString()) ? 'Solved' : 'Pending',
    }));    

    res.status(200).json({message:"Questions fethed successfully", questions: questionsWithStatus });
  } catch (error) {
    console.error('Error fetching user questions:', error);
    res.status(500).json({ message: 'Failed to fetch questions', error: (error as Error).message });
  }
};

export const getUserQuestionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;  // Get user ID from middleware
    const questionId = req.params.id;  // Get question ID from URL

    // Find the specific question by ID
    const question = await QUESTION.findOne({_id:questionId});

    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    // Check if the user has solved this question
    const userRelation = await USERQUESTIONRELATION.findOne({ 
      user_id: userId, 
      question_id: questionId,
      // isSolved:"Solved"
    });

    const isSolved = userRelation?.isSolved == "Solved"?"Solved":"Pending"

    // Prepare the response object
    const questionDetails = {
      _id: question._id,
      title: question.title,
      description: question.description,
      difficulty: question.difficulty,
      topics: question.topics,
      constraints: question.constraints,
      examples: question.examples,
      testCases: question.testCases,
      status: isSolved,
      functionSignatures: question.functionSignatures,
      // solutions: userRelation?.solutions || [], //it send solution in ascending order 
      // so we sort it in descending order(submitted at)
      solutions: (userRelation?.solutions || []).sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      ),
    };

    res.status(200).json({ message: 'Question fetched successfully', question: questionDetails });
  } catch (error) {
    console.error('Error fetching question by ID:', error);
    res.status(500).json({ message: 'Failed to fetch the question', error: (error as Error).message });
  }
};

export const getUserSubmissions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const records = await USERQUESTIONRELATION.find({ user_id: userId });

    // Flatten all solutions
    const allSubmissions = records.flatMap(relation => {
      return relation.solutions.map(solution => ({
        questionId: relation.question_id,
        status: solution.status,
        language: solution.language,
        submittedAt: solution.submittedAt,
        time: solution.time,
        memory: solution.memory,
      }));
    });

    res.status(200).json({ submissions: allSubmissions });
  } catch (err) {
    console.error('Failed to fetch user submissions:', err);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};
