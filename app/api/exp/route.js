import { Configuration as OpenAIConfiguration, OpenAIApi } from "openai-edge";
import { HfInference } from '@huggingface/inference';
import { OpenAIStream, HuggingFaceStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

export const runtime = "edge";

export async function POST(req) {
  const headerlist = headers();
  const openAiApiKey = headerlist.get("openaiapikey");
  const huggingfaceApiKey = headerlist.get("openaiapikey");; // Get Hugging Face API key from local storage

  // Determine whether to use OpenAI or Hugging Face based on user choice or availability of API keys
  let useOpenAI = true;

  if (!openAiApiKey && huggingfaceApiKey) {
    // If no OpenAI API key but Hugging Face API key is available, use Hugging Face
    useOpenAI = false;
  }

  if (
    process.env.NODE_ENV != "development" &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const ip = req.headers.get("x-forwarded-for");
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(50, "1 d"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `platforms_ratelimit_${ip}`,
    );

    if (!success) {
      return new Response("You have reached your request limit for the day.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  let { prompt: content } = await req.json();
  content = content.replace(/\/$/, "").slice(-5000);

  if (useOpenAI) {
    // Initialize OpenAI API client
    const openaiConfig = new OpenAIConfiguration({
      apiKey: openAiApiKey,
    });
    const openai = new OpenAIApi(openaiConfig);

    // Use OpenAI API logic
    const openaiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI writing assistant that continues existing text based on context from prior text. " +
            "Give more weight/priority to the later characters than the beginning ones. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    });

    const stream = OpenAIStream(openaiResponse);

    return new StreamingTextResponse(stream);
  } else {
    // Initialize Hugging Face Inference instance
    const Hf = new HfInference(huggingfaceApiKey);

    // Use Hugging Face API logic
    const hfResponse = await Hf.textGenerationStream({
      model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
      inputs: experimental_buildOpenAssistantPrompt(messages),
      parameters: {
        max_new_tokens: 200,
        typical_p: 0.2,
        repetition_penalty: 1,
        truncate: 1000,
        return_full_text: false,
      },
    });

    const stream = HuggingFaceStream(hfResponse);

    return new StreamingTextResponse(stream);
  }
}
