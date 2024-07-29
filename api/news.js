const { Configuration, OpenAIApi } = require('openai');

module.exports = async (req, res) => {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  console.log('Using OpenAI API Key:', openaiApiKey); // Log the API key (remove in production)

  const configuration = new Configuration({
    apiKey: openaiApiKey,
  });

  const openai = new OpenAIApi(configuration);

  const { region } = req.body;

  console.log('Generating news for region:', region); // Log the region

  const prompt = `
  Generate a detailed and insightful summary of the latest business news from ${region}. Focus on key events, major market movements, significant company announcements, and any economic trends.
  `;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const content = response.data.choices[0].text.trim();

    console.log('Generated content:', content); // Log the generated content

    res.status(200).json({ content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
};
