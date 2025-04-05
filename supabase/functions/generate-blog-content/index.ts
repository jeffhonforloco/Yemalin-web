
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const SEOWRITING_API_KEY = Deno.env.get("SEOWRITING_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, keywords, type, tone } = await req.json();

    if (!SEOWRITING_API_KEY) {
      throw new Error("SEOWRITING_API_KEY is not configured");
    }

    // Make a request to seowriting.ai API
    const response = await fetch('https://api.seowriting.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SEOWRITING_API_KEY}`
      },
      body: JSON.stringify({
        topic,
        keywords: keywords.split(',').map((k: string) => k.trim()),
        contentType: type || 'blog',
        tone: tone || 'professional',
        length: 'medium',
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate content');
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
