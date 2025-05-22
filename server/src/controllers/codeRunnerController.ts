import { Request, Response } from 'express';
import axios from 'axios';

export const runCode = async (req: Request, res: Response) => {
  const { sourceCode, languageId, stdin } = req.body;

  try {
    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin || '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
          'X-RapidAPI-Host': process.env.JUDGE0_API_HOST!,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Code execution failed' });
  }
};
