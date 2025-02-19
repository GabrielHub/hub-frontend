import { model } from './firebase';

const prompt =
  "Extract data from a boxscore image and return as JSON. Include fields: 'id' (random UUID), 'team' (1 or 2), 'name' (player's name), 'pos' (player's position 1-5 in order from top to bottom), 'oppPos' (same as 'pos'), 'isAI' (0), 'grd' (player's grade).";

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }
  };
}

export const getBoxscoreData = async (imageFile) => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);

    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
  } catch (error) {
    return error;
  }
};

export default getBoxscoreData;
