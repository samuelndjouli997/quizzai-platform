import { NextResponse } from "next/server"
import { QuizCreationSchema } from "@/schema/form/quiz";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";

// POST : /api/questions
export const POST = async (req: Request, res: Response) => {

    try {
        // const session = await getAuthSession();
        // if (!session?.user) {
        //     return NextResponse.json(
        //         {
        //             error: "You must be logged in to create a quiz",
        //         },
        //         {
        //             status: 401,
        //         }
        //     );
        // }
        const body = await req.json();
        const {amount, topic, type} = QuizCreationSchema.parse(body);
        let questions: any;
        if (type === "open_ended") {
            questions = await strict_output(
                "You are a helpful AI that is able to generate a pair of questions and answers, the length of the answer should not exceed 15 words, we want you to store all the p irs of answers and questions in a json array"
                ,
                new Array(amount).fill(
                    `You have to generate to a randow open-ended question about ${topic}`
                    )
                ,
                {
                    question: "question",
                    answer: "answer with max length of 15 words"
                }
            );
        } else if (type === "mcq") {
            questions = await strict_output(
                "You are a helpful AI that is able to generate mcq questions and answers, the length of the answer should not exceed 15 words."
                ,
                new Array(amount).fill(
                    `You have to generate to a randow mcq question about ${topic}`
                    )
                ,
                {
                    question: "question",
                    answer: "answer with max length of 15 words",
                    option1: "1st option with max length of 15 words",
                    option2: "2nd option with max length of 15 words",
                    option3: "3rd option with max length of 15 words",
                }
            );
        }
        return NextResponse.json(
            {
                questions,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        if(error instanceof ZodError) {
            return NextResponse.json({
                error: error.issues,
            }, 
            {
                status: 400,
            }
        )}
    }
   
}