const { default: OpenAI } = require("openai");
const language = require("@google-cloud/language");
const { Storage } = require("@google-cloud/storage");
const { text } = require("express");

require("dotenv").config();

const openai = new OpenAI({ apiKey: '' });

async function getMoodCategoryByPost(post) {
  try {
    const sampleMood = "positive";

    //return sampleMood;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a mood analyzer. I will give you a post that I wrote, you choose one mood from 'consolation' and 'delightful'. Just say the name of the category.",
        },
        {
          role: "user",
          content: post,
        },
      ],
    });
    let mood = completion.choices.map((choice) => choice.message.content)[0];

    return mood;
  } catch (error) {
    console.log(error);
  }
}

async function getMoodByDiary(diary) {
  try {
    const sampleMood = "delightful";

    //return sampleMood;
    const projectId = "jovial-backup-416006";

    const storage = new Storage({
      projectId,
    });

    const [buckets] = await storage.getBuckets();
    console.log("Buckets:");

    for (const bucket of buckets) {
      console.log(`- ${bucket.name}`);
    }

    console.log("Listed all storage buckets.");

    const client = new language.LanguageServiceClient({
      projectId: projectId,
    });

    const document = {
      content: diary,
      type: "PLAIN_TEXT",
    };

    const [result] = await client.analyzeSentiment({ document });
    const sentiment = result.documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);

    if (sentiment.score > 0) {
      return "delightful";
    }
    return "sad";
  } catch (error) {
    console.log(error);
  }
}

async function createTitleByLyrics(lyrics) {
  try {
    const sampleTitle = "Bubblegum Skies";

    //return sampleTitle;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a title generator. I will give you a lyrics that I wrote, you write a title for it. Write within 3 words.",
        },
        {
          role: "user",
          content: `${lyrics}`,
        },
      ],
    });
    let title = completion.choices.map((choice) => choice.message.content)[0];

    //trim the title
    title = title.trim();

    return title;
  } catch (error) {
    console.log(error);
  }
}

async function createMusicStyleByLyrics(lyrics) {
  try {
    const sampleStyle = "Pop";

    //return sampleStyle;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a producer. I will give you a lyrics that I wrote, you write a appropriate music style for it.",
        },
        {
          role: "user",
          content: lyrics,
        },
      ],
    });
    const style = completion.choices.map((choice) => choice.message.content)[0];
    return style;
  } catch (error) {
    console.log(error);
  }
}

async function createConsolationByDiary(diary) {
  try {
    const sampleConsolation =
      "I'm sorry to hear that you're feeling down. Remember that you are loved and that you are not alone. You are strong and you will get through this. If you need someone to talk to, I'm here for you. You are not alone.";

    //return sampleConsolation;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a mental health assistant. I will give you a diary that I wrote, you write a consolation for it. Write within 50 words.",
        },
        {
          role: "user",
          content: diary,
        },
      ],
    });
    const consolation = completion.choices.map(
      (choice) => choice.message.content
    )[0];
    return consolation;
  } catch (error) {
    console.log(error);
  }
}

async function createLyricsByDiary(diary) {
  try {
    const sampleLyrics =
      "[Verse]\nWoke up this morning and the sun was shining bright (shining bright)\nStepped outside and everything felt just right (just right)\nThe birds were singing and the flowers in bloom (in bloom)\nIt's gonna be a day with no worries, no gloom (no gloom)\n\n[Chorus]\nBubblegum skies and cotton candy dreams (yeah, yeah)\nWe'll dance through life like it's just what it seems (woo!)\nHands up, catchin' all the good vibes (good vibes)\nWe're living in a world with bubblegum skies (ooh, ooh)";

    //return sampleLyrics;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a songwriter. I will give you a diary that I wrote, you write a lyrics for it. There are only 2 category of song lyrics: Write a song with happiness and compliments when the diary contains positive content and personal accomplishments. For the other, write a song with consolation, encouragement and empathy when the diary contains negative content and personal struggles. Write within 60 words.",
        },
        {
          role: "user",
          content: diary,
        },
      ],
    });
    const lyrics = completion.choices.map(
      (choice) => choice.message.content
    )[0];
    return lyrics;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createLyricsByDiary,
  createConsolationByDiary,
  createMusicStyleByLyrics,
  createTitleByLyrics,
  getMoodByDiary,
  getMoodCategoryByPost,
};
