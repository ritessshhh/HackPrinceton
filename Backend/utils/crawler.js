const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const safari = require("selenium-webdriver/safari");
const options = new safari.Options();

const fs = require("fs");
const path = require("path");
const randomstring = require("randomstring");

const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const cloudName = "";
const apiKey = "";
const apiSecret = "";
const uploadPreset = "";

// Cloudinary configuration
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

console.log(cloudinary.config());

async function downloadAndUploadSongByURL(url, fileName) {
  let driver;

  // options.addArguments(
  //   "user-data-dir=C:\\Users\\ts06067\\AppData\\Local\\Google\\Chrome\\User Data"
  // );
  // options.addArguments("profile-directory=Default");

  try {
    driver = await new Builder()
      .forBrowser("safari")
      .setSafariOptions(options)
      .build();

    await driver.get(`${url}`);

    //wait for the page to load
    await driver.sleep(5000);

    let title = await driver.getTitle();
    console.log(title);

    await driver.manage().setTimeouts({ implicit: 10000 });

    //find a img with alt "Song Image"
    let songImage = await driver.findElement(
      By.xpath("//img[@alt='Song Image']")
    );

    //get the src attribute of the img
    let songImageURL = await songImage.getAttribute("src");

    //upload the image to cloudinary
    const imageResult = await cloudinary.uploader.upload(songImageURL, {
      resource_type: "image",
      upload_preset: uploadPreset,
    });

    //find a button with aria-label "More Actions"
    let moreActionsButton = await driver.findElement(
      By.xpath("//button[@aria-label='More Actions']")
    );

    console.log("finding more actions button");

    //click the button
    await driver.executeScript("arguments[0].click()", moreActionsButton);

    console.log("clicked more actions button");

    //wait for the dropdown menu to appear
    await driver.sleep(500);

    //find the button in which its child p element has the text "Download"
    let downloadButton = await driver.findElement(
      By.xpath("//button[.//p[contains(., 'Download')]]")
    );

    //hover over the button
    await driver.actions().move({ origin: downloadButton }).perform();

    //wait for the dropdown menu to appear
    await driver.sleep(1000);

    //get the div that is a sibling of the button
    let dropdownMenu = await downloadButton.findElement(
      By.xpath("./following-sibling::div")
    );

    //get all buttons inside the dropdown menu
    let buttons = await dropdownMenu.findElements(By.tagName("button"));

    //wait for the dropdown menu to appear
    await driver.sleep(1000);

    //click the second button
    await buttons[1].click();

    //wait for the download to finish
    await driver.sleep(3000);

    //get file path
    let mp3Path = `C:\\Users\\ts06067\\OneDrive - Stony Brook University\\audio\\${fileName}.mp3`;

    //upload the file to cloudinary
    const result = await cloudinary.uploader.upload(mp3Path, {
      resource_type: "auto",
      upload_preset: uploadPreset,
    });

    //return both the url of the image and the url of the audio
    return { imageURL: imageResult.url, audioURL: result.url };
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

async function createNewSongWithPrompt(lyrics, style, title) {
  let driver;

  options.addArguments(
    "user-data-dir=C:\\Users\\ts06067\\AppData\\Local\\Google\\Chrome\\User Data"
  );
  options.addArguments("profile-directory=Default");

  try {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.get("https://app.suno.ai/create/");

    //wait for the page to load
    await driver.sleep(2000);

    await driver.manage().setTimeouts({ implicit: 10000 });

    //find a span with class "chakra-switch__track css-12oveww"
    let styleSwitch = await driver.findElement(
      By.className("chakra-switch__track css-12oveww")
    );

    //click the switch
    await styleSwitch.click();

    //wait for the switch to change
    await driver.sleep(500);

    //find the textarea in which its placeholder contains "Enter your lyrics"
    let lyricsInput = await driver.findElement(
      By.xpath("//textarea[contains(@placeholder, 'Enter your lyrics')]")
    );

    //enter the lyrics
    await lyricsInput.sendKeys(lyrics);

    //find the textarea in which its placeholder contains "Enter style of music"
    let styleInput = await driver.findElement(
      By.xpath("//textarea[contains(@placeholder, 'Enter style of music')]")
    );

    //enter the style
    await styleInput.sendKeys(style);

    //find the input in which its placeholder contains "Enter a title"
    let titleInput = await driver.findElement(
      By.xpath("//input[contains(@placeholder, 'Enter a title')]")
    );

    //enter the title
    //create randome alphanumeric string
    const randomString = randomstring.generate(10);
    await titleInput.sendKeys(randomString);

    //find a button with class "chakra-button css-b0ppuc"
    let createButton = await driver.findElement(
      By.className("chakra-button css-b0ppuc")
    );

    console.log("finding create button");
    // scroll to the button and click it
    await driver.executeScript("arguments[0].scrollIntoView()", createButton);
    console.log("scrolled to create button");

    //wait until the button is clickable
    await driver.wait(until.elementIsVisible(createButton));
    console.log("button is visible");
    await createButton.click();
    console.log("clicked create button");

    //wait for 1 second
    await driver.sleep(1000);

    console.log("waiting for not loading spinner");

    //wait until loading spinner is gone
    let stale = true;

    while (stale) {
      try {
        await driver.wait(
          until.elementIsNotVisible(
            driver.findElement(By.className("chakra-spinner"))
          )
        );
      } catch (e) {
        stale = false;
        await driver.sleep(1000);
      }
    }

    console.log("not loading spinner is visible");

    //find a div with class "chakra-stack css-1pv08kv"
    let createContainer = await driver.findElement(
      By.className("chakra-stack css-1pv08kv")
    );

    //get all anchors inside the div
    let anchors = await createContainer.findElements(By.tagName("a"));

    //get the href attribute of each anchor
    let hrefs = await Promise.all(
      anchors.map(async (anchor) => {
        return await anchor.getAttribute("href");
      })
    );

    //return last 2 hrefs
    return { list: hrefs.slice(-2), publishedTitle: randomString };
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

module.exports = {
  createNewSongWithPrompt,
  downloadAndUploadSongByURL,
};
